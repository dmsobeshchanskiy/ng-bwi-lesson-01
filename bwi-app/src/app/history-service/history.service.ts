import { Injectable } from '@angular/core';
import { HistoryRecord } from './history-record';
import { Subject } from 'rxjs';

@Injectable({
   providedIn: 'root'
})
export class HistoryService {
   // TODO: provide separate interfaces for pushing and notifications

   private records: Array<HistoryRecord>;
   private sessionStorageKey = 'bwi-app-history';

   public historyDataChanged = new Subject<HistoryRecord[]>();

   public get allRecords(): Array<HistoryRecord> {
      return this.records;
   }

   public addRecordToStorage(record: HistoryRecord): void {
      this.records.push(record);
      this.historyDataChanged.next(this.allRecords);
      this.writeToSessionStorage(this.allRecords);
   }

   constructor() {
      this.records = this.readFromSessionStorage();
      if (!this.records) {
         this.records = new Array<HistoryRecord>();
      }
   }

   private writeToSessionStorage(values: Array<HistoryRecord>) {
      if (values) {
         sessionStorage.setItem(this.sessionStorageKey, JSON.stringify(values));
      }
   }

   private readFromSessionStorage(): Array<HistoryRecord> {
      const value: string = sessionStorage.getItem(this.sessionStorageKey);
      if (value && value !== 'undefined' && value !== 'null') {
         return JSON.parse(value) as Array<HistoryRecord>;
      }
      return null;
   }

}
