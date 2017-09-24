import { Injectable } from '@angular/core';
import { ValidationService } from './validation.service';

@Injectable()
export class SudokuService {

   constructor(private Validation: ValidationService) { }

   /**
    * Solves a valid sudoku puzzle
    *
    * @param {string} puzzle the puzzle being solved
    * @return {Promise<string>} the solved puzzle
    */
   solve(puzzle): Promise<string> {

      return new Promise((resolve, reject) => {

         // Validate the puzzle before solving it
         if (!this.Validation.validatePuzzle(puzzle)) reject();

         else { // Puzzle is valid

            let solution = '';

            // Build grid from rows and columns
            const rows = 'ABCDEFGHI';
            const cols = '123456789';
            const grid = this.makeGrid(rows, cols);

            // Build the lists of units and peers
            const units = this.makeUnits(rows, cols, grid);
            const peers = this.makePeers(grid, units);

            // Convert the puzzle into a HashMap of the form { square: val }
            const gridMap = this.parseGrid(puzzle, grid);

            //
            for (let c in grid) {
               if (true) return;
            }

            for (let c in gridMap) {
               if (true) return;
            }

            resolve(solution);

         }

      });

   }

   /**
    * Build the sudoku grid
    *
    * @param {string} rows the grid rows
    * @param {string} cols the grid columns
    * @return {string[]} the sudoku grid
    */
   makeGrid(rows: string, cols: string): string[] {

      let grid = [];

      for (let c = 0; c < cols.length; c++) {
         const gridRow = this.crossProduct(rows, cols[c]);
         grid = grid.concat(gridRow);
      }

      return grid;

   }

   /**
    * Build a list of horizontal units
    *
    * @param {string} rows row labels
    * @param {string} cols column numbers
    * @return {string[]} the horizontal units in the grid
    */
   makeHorizontalPeers(rows: string, cols: string) {

      // Check for empty values
      if (typeof(rows) !== 'string' || typeof(cols) !== 'string') return [];

      let horizontalPeers = [];

      for (let r = 0; r < cols.length; r++) {
         const index = rows[r] + (r + 1);
         horizontalPeers.push(this.crossProduct(rows[r], cols));
      }

      return horizontalPeers;

   }

   /**
    * Build a list of vertical units
    *
    * @param {string} rows row labels
    * @param {string} cols column numbers
    * @return {string[]} the vertical units in the grid
    */
   makeVerticalPeers(rows: string, cols: string) {

      // Check for empty values
      if (typeof (rows) !== 'string' || typeof (cols) !== 'string') return [];

      let verticalPeers = [];

      for (let c = 0; c < cols.length; c++) {
         verticalPeers.push(this.crossProduct(rows, cols[c]));
      }

      return verticalPeers;

   }

   /**
    * Build a list of square units
    *
    * @param {string} rows row labels
    * @param {string} cols column numbers
    * @return {array} the square units in the grid
    */
   makeSquarePeers() {

      let squarePeers = [];

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
    * @param {string} rows row labels
    * @param {string} cols column numbers
    * @param {array} grid grid squares
    * @return {obj} a HashMap containing the units
    */
   makeUnits(rows: string, cols: string, grid: string[]) {

      let units = {};

      // Make all 3 peer types
      const horizontalPeers = this.makeHorizontalPeers(rows, cols);
      const verticalPeers = this.makeVerticalPeers(rows, cols);
      const squarePeers = this.makeSquarePeers();

      // Merge all 3 types into one array
      const unitList = horizontalPeers.concat(verticalPeers, squarePeers);

      // Map each grid square to its units
      for (const val of grid) {

         units[val] = [];

         for (const unit of unitList) {

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
    *
    * @param {array} grid an array representing the grid
    * @param {obj} units a HashMap containing all units for a given square in the grid
    * @return {obj} a HashMap of peers for all squares in the grid
    */
   makePeers(grid: string[], units: any) {

      let peers = {};

      for (const square of grid) { // All squares in the grid

         peers[square] = {};

         for (const unit of units[square]) { // This square's units
            for (const currentUnit of unit) { // Squares in this unit

               if (currentUnit !== square) { // A square can't be its own peer
                  peers[square][currentUnit] = true;
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
   crossProduct(listA: string, listB: string) {

      // Check for empty sets
      if (!listA && !listB) return [];
      else if (!listA) return listB;
      else if (!listB) return listA;

      let crossProduct = [];

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
    * @param {string[]} grid the grid to parse
    * @return {obj} the HashMap representing the grid
    */
   parseGrid(puzzle: string, grid: string[]) {

      let hashMap = {};

      for (const val of grid) {

         // Assign value or replace empty squares with 123456789
         hashMap[val] = val === '.' ? '123456789' : val;

      }

      return hashMap;

   }

   /**
    * Assign a value to a square, and remove it as a possibility for any of its peers
    *
    * @param {obj} map the HashMap representation of the puzzle
    * @param {string[]} units the unit list for the grid
    * @param {obj} peers the peer map for the grid
    * @param {string} square the grid square who's value is being assigned
    * @param {string} value the value to assign to the square
    * @return {obj} the updated map
    */
   assignValue(map: any, units: string[], peers: any, square: string, value: string) {

      // All values except the value to assign
      const otherValues = map[square].replace(value, '');

      // Remove other values from this square and update peers
      for (let otherValue of otherValues) {
         this.removeValue(map, units, peers, square, otherValue);
      }

      return map;

   }

   /**
    * Remove a possible value from a square
    *
    * @param {obj} map the HashMap representation of the puzzle
    * @param {obj} peers the peer map for the grid
    * @param {string[]} units the unit map for the grid
    * @param {string} square the grid square having the value removed
    * @param {string} value the value to remove from the square
    * @return {obj} the updated map
    */
   removeValue(map: any, units: string[], peers: any, square: string, value: string) {

      let s = map[square]; // List of possible values for this square

      // This value has already been assigned
      if(s.indexOf([value]) === -1) return map;

      // Remove the value from the possible values for this square
      map[square] = s.replace(value, '');

      // Once a value is permenantly assigned, remove it from its peers
      if(s.length === 1) {

         const remainingValues = s;

         for (let peer of peers[square]) {
            this.removeValue(map, units, peers, peer, remainingValues);
         }

      }

      // If a unit is reduced to one place for a value, place it there
      for (let unit of units[square]) {

         let places = [];

         // Assign places for this unit
         for (let unitSquare of unit) {
            if (map[unitSquare].indexOf(value) !== -1) places.push(unitSquare);
         }

         // Assign value
         if (places.length === 1) this.assignValue(map, units, peers, places[0], value);

      }

      return map;

   }

   /**
    *
    *
    * @param {obj} map the HashMap representation of the puzzle
    * @param {obj} grid the HashMap representing the grid
    * @return {}
    */
   search(map: any, grid: any) {

      if (!map) return false;

      // Puzzle solved
      if (true) return map;

   }

}
