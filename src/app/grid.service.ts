import { Injectable } from '@angular/core';

@Injectable()
export class GridService {

   // Puzzles
   easy = '.96.4..3..5782....1..9..5....9.1...85.......24...9.6....4..3..1....7926..2..5.98.';
   intermediate = '1.8..64....6.9.8.75........2695...8....4.9....8...2791........56.4.7.2....12..9.3';
   hard = '96..4.1.....38....7.8.6...912.8..9.3....5....3.5..2.648...9.4.7....38.....9.2..85';
   extreme = '.....6....59.....82....8....45........3........6..3.54...325..6..................';
   invalid = '3..7....6..195....98....6.8...6...34..8.3..17...2...6.6....28....419..5....8..79';

   /**
    * Get the puzzle to solve
    *
    * @return {string} the puzzle
    */
   getGrid(): string {
      return this.easy;
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

}
