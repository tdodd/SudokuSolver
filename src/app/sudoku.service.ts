import { Injectable } from '@angular/core';
import { ValidationService } from './validation.service';

@Injectable()
export class SudokuService {
   rows: string;
   cols: string;
   grid: string[];
   units: string[];
   peers: any;
   map: any;

   constructor(private Validation: ValidationService) {
      this.rows = 'ABCDEFGHI';
      this.cols = '123456789';
   }

   /**
    * Solves a valid sudoku puzzle
    *
    * @param {string} puzzle the puzzle being solved
    * @return {Promise<string>} the solved puzzle
    */
   public solve = (puzzle): Promise<string> => {

      return new Promise((resolve, reject) => {

         // // Validate the puzzle before solving it
         if (!this.Validation.validatePuzzle(puzzle)) {

            reject();

         } else { // Puzzle is valid

            let solution = '';

            // Build grid from rows and cols
            this.grid = this.makeGrid();

            // List of units and peers in the grid
            this.units = this.makeUnits();
            this.peers = this.makePeers();

            // Convert the puzzle into a HashMap of the form { square: val }
            // Reduce possibilities for each square based on current puzzle values
            this.map = this.parseGrid(puzzle);

            // Solve the puzzle
            const solvedMap = this.search(this.map);
            solution = this.parseMap(solvedMap);

            resolve(solution);

         }

      });

   }

   /**
    * Build the sudoku grid
    *
    * @return {string[]} the sudoku grid
    */
   public makeGrid = (): string[] => {

      let grid = [];

      for (let c = 0; c < 9; c++) {
         const gridRow = this.crossProduct(this.rows, this.cols[c]);
         grid = grid.concat(gridRow);
      }

      return grid;

   }

   /**
    * Build a list of horizontal units
    *
    * @return {any[]} the horizontal units in the grid
    */
   public makeHorizontalPeers = (): any[] => {

      const horizontalPeers = [];

      for (let r = 0; r < 9; r++) {
         const index = this.rows[r] + (r + 1);
         horizontalPeers.push(this.crossProduct(this.rows[r], this.cols));
      }

      return horizontalPeers;

   }

   /**
    * Build a list of vertical units
    *
    * @return {any[][]} the vertical units in the grid
    */
   public makeVerticalPeers = (): any[][] => {

      const verticalPeers = [];

      for (let c = 0; c < 9; c++) {
         verticalPeers.push(this.crossProduct(this.rows, this.cols[c]));
      }

      return verticalPeers;

   }

   /**
    * Build a list of square units
    *
    * @return {any[][]} the square units in the grid
    */
   public makeSquarePeers = (): any[][] => {

      const squarePeers = [];

      const rowTriplet = ['ABC', 'DEF', 'GHI'];
      const colTriplet = ['123', '456', '789'];

      for (const r in rowTriplet) {
         for (const c in colTriplet) {

            squarePeers.push(this.crossProduct(rowTriplet[r], colTriplet[c]));

         }
      }

      return squarePeers;

   }

   /**
    * Create a HashMap of all squares and their associated units
    *
    * @return {any} a HashMap containing the units
    */
   public makeUnits = (): any => {

      const units = {};

      // Make all 3 peer types
      const horizontalPeers = this.makeHorizontalPeers();
      const verticalPeers = this.makeVerticalPeers();
      const squarePeers = this.makeSquarePeers();

      // Merge all 3 types into one array
      const unitList = horizontalPeers.concat(verticalPeers, squarePeers);

      // Map each square to its units
      for (const s in this.grid) {

         const val = this.grid[s]; // The current grid square
         units[val] = [];

         for (const u in unitList) {

            const unit = unitList[u]; // A unit to associate with this square

            if (unit.indexOf(val) !== -1) {
               units[val].push(unit);
            }

         }

      }

      return units;

   }

   /**
    * Create a HashMap of all peers for a given square
    *    ex: { A1: { B1: true, A2: true } }
    * @return {any} a HashMap of peers for all squares in the grid
    */
   public makePeers = (): any => {

      let peers = {};

      for (const s in this.grid) { // All squares in the grid

         const square = this.grid[s]; // The current square
         peers[square] = {};

         for (const u in this.units[square]) { // This square's units

            const unit = this.units[square][u]; // The current unit

            for (const unitSquare in unit) { // Squares in this unit

               if (unit[unitSquare] !== square) { // A square can't be its own peer
                  peers[square][unit[unitSquare]] = true;
               }

            }

         }

      }

      return peers;
   }

   /**
    * Calculates the cartesian product of two lists A and B
    *
    * @param {string} listA the first list
    * @param {string} listB the second list
    * @return {string[]} the resulting cross product of the two lists
    */
   public crossProduct = (listA: string, listB: string) => {

      // Check for empty sets
      if (!listA && !listB) { return []; }
      if (!listA) { return listB; }
      if (!listB) { return listA; }

      const crossProduct = [];

      for (const a of listA) {
         for (const b of listB) {
            crossProduct.push(a + b);
         }
      }

      return crossProduct;

   }

   /**
    * Build a HashMap with a given puzzle of the format { square: value }
    *    ex: { A1: 7, B1: 2 }
    *
    * @param {string} puzzle the puzzle being solved
    * @return {any} the HashMap representing the grid
    */
   public parseGrid = (puzzle: string): any => {

      const hashMap = {};

      for (const square of this.grid) {
         hashMap[square] = '123456789';
      }

      // Assign puzzle values
      for (const s in this.grid) {

         if (puzzle[s] !== '.' && !this.assignValue(hashMap, this.grid[s], puzzle[s])) {
            return false;
         }

      }

      return hashMap;

   }

   /**
    * Assign a value to a square, and remove it as a possibility for any of its peers
    *
    * @param {any} map the HashMap representation of the puzzle
    * @param {string} square the grid square who's value is being assigned
    * @param {string} value the value to assign to the square
    * @return {any} the updated map
    */
   public assignValue = (map: any, square: string, value: string): any => {

      let assigned = true;

      // All values except the value to assign
      const otherValues = map[square].replace(value, '');

      // Remove other values from this square and update peers
      for (let otherValue of otherValues) {

         if (!this.removeValue(map, square, otherValue)) {
            assigned = false;
         }

      }

      return assigned ? map : false;

   }

   /**
    * Remove a possible value from a square
    *
    * @param {obj} map the HashMap representation of the puzzle
    * @param {string} square the grid square having the value removed
    * @param {string} value the value to remove from the square
    * @return {any} the updated map
    */
   public removeValue = (map: any, square: string, value: string): any => {

      // This value has already been assigned
      if (map[square].indexOf([value]) === -1) return map;

      // Remove the value from the possible values for this square
      map[square] = map[square].replace(value, '');

      // Removed last value
      if (map[square].length === 0) { return false; }

      // Once a value is permenantly assigned, remove it from its peers
      if (map[square].length === 1) {

         let removed = true;
         const peerList = Object.keys(this.peers[square]);

         for (const peer of peerList) {

            if (!this.removeValue(map, peer, map[square])) {
               removed = false;
            }

         }

         return removed;

      }

      // If a unit is reduced to one place for a value, place it there
      for (const unit of this.units[square]) {

         const places = [];

         // Get places where the value is still a possibility
         for (let unitSquare of unit) {

            if (map[unitSquare].indexOf(value) !== -1) {
               places.push(unitSquare);
            }

         }

         // No place for this value
         if (places.length === 0) { return false; }

         // Only 1 possible place. Assign value
         if (places.length === 1) {

            if (!this.assignValue(map, places[0], value)) {
               return false;
            }

         }

      }

      return map;

   }

   /**
    * Test all possible values with DFS
    *
    * @param {any} map the HashMap representation of the puzzle
    * @return {any} the solved puzzle as a HashMap
    */
   public search = (map: any): any => {

      if (!map) return false; // assignValue failed

      let solved = true;

      // Check if puzzle has been solved
      for (const square of this.grid) {

         if (map[square].length !== 1) {
            solved = false;
            break;
         }

      }

      if (solved) { return map; } // Puzzle solved

      // Proceed with the square that has the least posibilities
      let nextSquare;

      for (const s of this.grid) {

         if (map[s].length > 1) {

            if (!nextSquare) {
               nextSquare = s;
            } else {
               if (map[s].length < nextSquare.length) { nextSquare = s; }
            }

         }

      }

      // Assign values
      if (nextSquare) {

         for (const currentVal of map[nextSquare]) {
            const result = this.search(this.assignValue(clone(map), nextSquare, currentVal));
            if (result) { return result; }
         }

      }

      return false;

      /**
       * Create a clone of an object
       *
       * @param {obj} obj the object to clone
       * @return {obj} a clone of the object
       */
      function clone(obj) {

         var clone = {};

         for (var key in obj) {
            clone[key] = obj[key];
         }

         return clone;

      }

   }

   /**
    * Transform the solution HashMap into a string
    *
    * @param {any} map the solution as a HashMap
    * @return {string} the string representing the solution
    */
   public parseMap = (map: any): string => {

      let solution = '';

      for(const square in map) {
         solution += map[square];
      }

      return solution;

   }

}
