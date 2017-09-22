import { Component, OnInit } from '@angular/core';

@Component({
   selector: 'app-status',
   templateUrl: './status.component.html',
   styleUrls: ['./status.component.sass', './status.component.mobile.sass']
})
export class StatusComponent implements OnInit {

   constructor() { }

   ngOnInit() {
   }

   /**
   * Closes a status notification
   */
   closeStatus(event): void {
      document.querySelector('.status-container').classList.add('hidden');
   }

}
