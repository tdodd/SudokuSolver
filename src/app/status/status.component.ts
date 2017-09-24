import { Component, OnInit, Input } from '@angular/core';

@Component({
   selector: 'app-status',
   templateUrl: './status.component.html',
   styleUrls: ['./status.component.sass', './status.component.mobile.sass']
})
export class StatusComponent implements OnInit {

   @Input() duration: number;
   @Input() error: boolean;

   constructor() { }

   ngOnInit() {
   }

   /**
    * Closes a status notification
    */
   closeStatus(): void {
      document.querySelector('.status-container').classList.add('hidden');
   }

}
