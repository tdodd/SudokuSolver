import { Component, OnInit } from '@angular/core';
import { GridService } from './grid.service';

@Component({
   selector: 'app-grid',
   templateUrl: './grid.component.html',
   styleUrls: ['./grid.component.sass', './grid.component.mobile.sass'],
   providers: [GridService]
})
export class GridComponent implements OnInit {

   constructor(private GridService: GridService) { }

   ngOnInit() {
      const puzzle = this.GridService.getGrid();
      this.prepareGrid(puzzle);
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
            gridSquares[i].innerHTML = puzzle[i - 81] === '.' ? '' : puzzle[i - 81];
         }

      }

   }

}
