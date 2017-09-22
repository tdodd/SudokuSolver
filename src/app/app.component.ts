import { Component } from '@angular/core';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.sass', './app.component.mobile.sass']
})
export class AppComponent {

   solve(): void {

      // Show loading animation
      const solveBtn = document.querySelector('.btn-solve');
      const loader = document.querySelector('.loader');
      solveBtn.classList.add('hidden');
      loader.classList.remove('hidden');

   }

}
