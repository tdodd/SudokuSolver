import { Component, OnInit, Input } from '@angular/core';

@Component({
   selector: 'app-grid',
   templateUrl: './grid.component.html',
   styleUrls: ['./grid.component.sass'],
})
export class GridComponent implements OnInit {
   @Input() puzzle: string[];

   ngOnInit() {
      // Insert puzzle values into the grid
      this.prepareGrid(this.puzzle);
   }

   /**
    * Insert the puzzle values into the grid
    *
    * @param {string[]} puzzle the puzzle in array format
    */
   prepareGrid(puzzle: string[]): void {

      const gridSquares = document.querySelectorAll('.square');

      for (let i = 0; i < gridSquares.length; i++) {

         if (i < 81) { // First Grid
            gridSquares[i].innerHTML = puzzle[i] === '.' ? '' : puzzle[i];
         } else { // Second grid
            gridSquares[i].innerHTML = '';
         }

      }

   }

}
