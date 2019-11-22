import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { WeightAnalyzerService } from '../../weight-analyzer/weight-analyzer.service';
import { WeightAnalyzerInput } from '../../weight-analyzer/weight-analyzer-input';
import { WeightAnalyzerResponse } from '../../weight-analyzer/weight-analyzer-response';

@Component({
   selector: 'app-input',
   templateUrl: './input.component.html',
   styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

   inputForm = new FormGroup({
      age: new FormControl('', Validators.required),
      height: new FormControl('', Validators.required),
      weight: new FormControl('', Validators.required)
   });

   constructor(private analyzer: WeightAnalyzerService) { }

   ngOnInit() {
   }

   onInputSubmit() {
      const inputData = this.prepareInputData();
      const response = this.analyzer.analyze(inputData);
      this.displayResponse(response);
      this.inputForm.reset();
   }

   private prepareInputData(): WeightAnalyzerInput {
      // TODO: parsing!
      const inputData = new WeightAnalyzerInput();
      inputData.age = this.inputForm.value.age;
      inputData.height = this.inputForm.value.height;
      inputData.weight = this.inputForm.value.weight;
      return inputData;
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

}
