import { Injectable } from '@angular/core';
import { WeightAnalyzerInput } from './weight-analyzer-input';
import { WeightAnalyzerResponse } from './weight-analyzer-response';
import { ErrorCodes } from './error-codes';

@Injectable({
   providedIn: 'root'
})
export class WeightAnalyzerService {

   private switchingAge = 40;
   private belowCoefficient = 110;
   private aboveCoefficient = 100;

   private heightUpperLimit = 250;
   private heightDownLimit = 110;

   private weightUpperLimit = 500;
   private weightDownLimit = 0;

   private ageUpperLimit = 150;
   private ageDownLimit = 0;

   public analyze(input: WeightAnalyzerInput): WeightAnalyzerResponse {
      const response = new WeightAnalyzerResponse();
      const error = this.getValidationError(input);
      if (error && error.length > 0) {
         response.occuredError = error;
      } else {
         const perfectWeight = this.calcPerfectWeight(input);
         response.weightDeviation = Math.round(input.weight - perfectWeight);
         response.weightDeviationPercentage = Math.round((input.weight - perfectWeight) * 100 / perfectWeight);
      }

      return response;
   }

   constructor() { }

   private getValidationError(input: WeightAnalyzerInput): string {
      let response = '';
      if (input.height >= this.heightUpperLimit) {
         response = ErrorCodes.HeightOverflow;
      } else if (input.height < this.heightDownLimit) {
         response = ErrorCodes.HeightBelowLimit;
      } else if (input.weight >= this.weightUpperLimit) {
         response = ErrorCodes.WeightOverflow;
      } else if (input.weight <= this.weightDownLimit) {
         response = ErrorCodes.WeightBelowZero;
      } else if (input.age >= this.ageUpperLimit) {
         response = ErrorCodes.AgeOverflow;
      } else if (input.age < this.ageDownLimit) {
         response = ErrorCodes.AgeBelowZero;
      }

      return response;
   }

   private calcPerfectWeight(input: WeightAnalyzerInput): number {
      let response = 0;
      if (input.age <= this.switchingAge) {
         response = input.height - this.belowCoefficient;
      } else {
         response = input.height - this.aboveCoefficient;
      }
      return response;
   }

}
