import { Component, OnInit } from '@angular/core';
import { GridService } from './grid.service';
import { SudokuService } from './sudoku.service';
import { ValidationService } from './validation.service';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.sass', './app.component.mobile.sass'],
   providers: [GridService, SudokuService, ValidationService]
})
export class AppComponent {
   data = { error: false };

   constructor(
      private Sudoku: SudokuService,
      private Grid: GridService) { }

   ngOnInit() {
      // Ask service for grid to display
      this.data['puzzle'] = this.Grid.gridAsArray();
   }

   /**
    * Ask service to solve the puzzle
    */
   solve(): void {

      // Show the loading animation while solving
      this.displayLoadingAnimation();

      // The puzzle to solve
      const puzzle = this.Grid.gridAsString();

      // Time before calling solve()
      const t0 = performance.now();

      this.Sudoku.solve(puzzle)
         .then(solution => {

            // Time after solving
            const t1 = performance.now();

            // Time to solve the puzzle rounded to 4 decimal places (in ms)
            this.data['duration'] = ((t1 - t0) / 1000).toFixed(4);

            // Hide loading animation
            this.hideLoadingAnimation();

            // Show solved puzzle
            this.Grid.prepareSolution(solution);

         })
         .catch(error => {
            this.data['error'] = true;
            this.hideLoadingAnimation();
         });

   }

   /**
    * Show the loading animation while solving the puzzle
    */
   displayLoadingAnimation(): void {

      const solveBtn = document.querySelector('.btn-solve');
      const message = document.querySelector('.loading-msg');
      const loader = document.querySelector('.loader');

      // Hide button and show animation
      solveBtn.classList.add('hidden');
      message.classList.remove('hidden');
      loader.classList.remove('hidden');

   }

   /**
    * Hide the loading animation once the puzzle has been solved
    */
   hideLoadingAnimation(): void {

      // Show loading animation
      const solveBtn = document.querySelector('.btn-solve');
      const message = document.querySelector('.loading-msg');
      const loader = document.querySelector('.loader');

      solveBtn.classList.remove('hidden');
      solveBtn.setAttribute("disabled", "true");
      message.classList.add('hidden');
      loader.classList.add('hidden');

   }

}
