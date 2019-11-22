import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { WeightAnalyzerInput } from '../../weight-analyzer/weight-analyzer-input';


@Component({
   selector: 'app-input',
   templateUrl: './input.component.html',
   styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

   @Output() analyzeRequired = new EventEmitter<WeightAnalyzerInput>();

   inputForm = new FormGroup({
      age: new FormControl('', Validators.required),
      height: new FormControl('', Validators.required),
      weight: new FormControl('', Validators.required)
   });

   constructor() { }

   ngOnInit() {
   }

   onInputSubmit() {
      const inputData = this.prepareInputData();
      this.analyzeRequired.emit(inputData);
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

}
