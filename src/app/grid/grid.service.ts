import { Injectable } from '@angular/core';
import { PUZZLES } from '../puzzles';

@Injectable()
export class GridService {

   /**
    * Get the puzzle to solve
    *
    * @return {string} the puzzle
    */
   getGrid(): string {
      return PUZZLES.hardest;
   }

   /**
    * Generates a sudoku puzzle as a string for solving and validating
    *
    * @return {string} the puzzle in string format
    */
   gridAsString(): string {
      return this.getGrid();
   }

   /**
    * Generates a sudoku puzzle in array format for displaying
    *
    * @return {string[]} the puzzle in array format
    */
   gridAsArray(): string[] {
      return this.getGrid().split('');
   }

   /**
    * Insert the puzzle solution into the solution grid
    *
    * @param {string[]} puzzle the puzzle solution in array format
    */
   prepareSolution(puzzle: string[]): void {

      const gridSquares = document.querySelectorAll('.square');

      for (let i = gridSquares.length / 2; i < gridSquares.length; i++) {
         gridSquares[i].innerHTML = puzzle[i - 81];
      }

   }

}
