import { Injectable } from '@angular/core';
import { WeightAnalyzerInput } from './weight-analyzer-input';
import { WeightAnalyzerResponse } from './weight-analyzer-response';
import { ErrorCodes } from './error-codes';

@Injectable({
  providedIn: 'root'
})
export class WeightAnalyzerService {

  public analyze(input: WeightAnalyzerInput): WeightAnalyzerResponse {
    const response = new WeightAnalyzerResponse();
    const error = this.getValidationError(input);
    if (error && error.length > 0) {
      response.occuredError = error;
    } else {
      const perfectWeight = this.calcPerfectWeight(input);
      response.weightDeviation = input.weight - perfectWeight;
      response.weightDeviationPercentage = Math.round((input.weight - perfectWeight) * 100 / perfectWeight);
    }

    return response;
  }

  constructor() { }

  private getValidationError(input: WeightAnalyzerInput): string {
    let response = '';
    if (input.height >= 250) {
      response = ErrorCodes.HeightOverflow;
    } else if (input.height < 110) {
      response = ErrorCodes.HeightBelowLimit;
    } else if (input.weight >= 500) {
      response = ErrorCodes.WeightOverflow;
    } else if (input.weight <= 0) {
      response = ErrorCodes.WeightBelowZero;
    } else if (input.age >= 150) {
      response = ErrorCodes.AgeOverflow;
    } else if (input.age < 0) {
      response = ErrorCodes.AgeBelowZero;
    }

    return response;
  }

  private calcPerfectWeight(input: WeightAnalyzerInput): number {
    let response = 0;
    if (input.age <= 40) {
      response = input.height - 110;
    } else {
      response = input.height - 100;
    }
    return response;
  }

}
