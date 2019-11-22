import { Injectable } from '@angular/core';
import { HistoryRecord } from './history-record';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
   // TODO: provide separate interfaces for pushing and notifications

   private records = new Array<HistoryRecord>();

   public historyDataChanged = new Subject<HistoryRecord[]>();

   public get allRecords(): Array<HistoryRecord> {
      return this.records;
   }

   public addRecordToStorage(record: HistoryRecord): void {
      this.records.push(record);
      this.historyDataChanged.next(this.allRecords);
   }

   constructor() { }

}
