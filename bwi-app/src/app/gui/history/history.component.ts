import { Component, OnInit, OnDestroy } from '@angular/core';
import { HistoryService } from '../../history-service/history.service';
import { HistoryRecord } from '../../history-service/history-record';
import { Subscription } from 'rxjs';

@Component({
   selector: 'app-history',
   templateUrl: './history.component.html',
   styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit, OnDestroy {

   public records: Array<HistoryRecord>;
   private subscribe: Subscription;

   get historyExist(): boolean {
      return this.records && this.records.length > 0;
   }

   constructor(private historyService: HistoryService) {
      this.subscribe = this.historyService.historyDataChanged.subscribe(records => {
         this.records = records;
      });
   }

   ngOnInit() {
      this.records = this.historyService.allRecords;
   }

   ngOnDestroy(): void {
      this.subscribe.unsubscribe();
   }

}
