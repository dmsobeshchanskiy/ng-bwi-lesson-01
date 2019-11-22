import { Component } from '@angular/core';
import { WeightAnalyzerService } from '../weight-analyzer/weight-analyzer.service';
import { HistoryService } from '../history-service/history.service';
import { WeightAnalyzerInput } from '../weight-analyzer/weight-analyzer-input';
import { WeightAnalyzerResponse } from '../weight-analyzer/weight-analyzer-response';

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

   constructor(private analyzer: WeightAnalyzerService, private historyService: HistoryService) {

   }

   onAnalyzeRequired(input: WeightAnalyzerInput) {
      const response = this.analyzer.analyze(input);
      this.displayResponse(response);
      this.addRecordToHistory(input, response);
   }

   onHistoryClick() {
      this.showHistory = !this.showHistory;
   }

   private displayResponse(response: WeightAnalyzerResponse) {
      let message = '';
      if (response.occuredError && response.occuredError.length > 0) {
         message = `Analyze fails with error ${response.occuredError}`;
      } else {
         message = `Weight deviation is: ${response.weightDeviation} kg / ${response.weightDeviationPercentage} %`;
      }
      alert(message);
   }

   private addRecordToHistory(inputData: WeightAnalyzerInput, response: WeightAnalyzerResponse) {
      const record = {
         height: inputData.height,
         weight: inputData.weight,
         age: inputData.age,
         weightDeviation: response.weightDeviation,
         weightDeviationPercentage: response.weightDeviationPercentage
      };
      this.historyService.addRecordToStorage(record);
   }
}
