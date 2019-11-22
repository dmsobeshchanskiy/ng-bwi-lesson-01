import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

   public showHistory = false;

   get historyButtonCaption(): string {
      return this.showHistory ? 'Hide history' : 'Show history';
   }

   onHistoryClick() {
      this.showHistory = !this.showHistory;
   }
}
