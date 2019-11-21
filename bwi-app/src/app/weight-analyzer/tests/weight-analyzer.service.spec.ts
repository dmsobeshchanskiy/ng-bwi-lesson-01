/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { WeightAnalyzerService } from '../weight-analyzer.service';
import { ErrorCodes } from '../error-codes';

describe('Service: WeightAnalyzer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WeightAnalyzerService]
    });
  });

  it('should report about height overflow',
    inject([WeightAnalyzerService], (service: WeightAnalyzerService) => {
      const input = {
        height: 250,
        weight: 100,
        age: 20
      };
      const response = service.analyze(input);
      expect(response.occuredError).toBe(ErrorCodes.HeightOverflow);
  }));

  it('should report about height below limit',
    inject([WeightAnalyzerService], (service: WeightAnalyzerService) => {
      const input = {
        height: 109,
        weight: 100,
        age: 20
      };
      const response = service.analyze(input);
      expect(response.occuredError).toBe(ErrorCodes.HeightBelowLimit);
  }));

  it('should report about weight overflow',
    inject([WeightAnalyzerService], (service: WeightAnalyzerService) => {
      const input = {
        height: 180,
        weight: 500,
        age: 20
      };
      const response = service.analyze(input);
      expect(response.occuredError).toBe(ErrorCodes.WeightOverflow);
  }));

  it('should report about weight below zero',
    inject([WeightAnalyzerService], (service: WeightAnalyzerService) => {
      let input = {
        height: 180,
        weight: -100,
        age: 20
      };
      let response = service.analyze(input);
      expect(response.occuredError).toBe(ErrorCodes.WeightBelowZero);
      input = {
        height: 180,
        weight: 0,
        age: 20
      };
      response = service.analyze(input);
      expect(response.occuredError).toBe(ErrorCodes.WeightBelowZero);
  }));

  it('should report about age overflow',
    inject([WeightAnalyzerService], (service: WeightAnalyzerService) => {
      const input = {
        height: 180,
        weight: 100,
        age: 150
      };
      const response = service.analyze(input);
      expect(response.occuredError).toBe(ErrorCodes.AgeOverflow);
  }));

  it('should report about age below zero',
    inject([WeightAnalyzerService], (service: WeightAnalyzerService) => {
      const input = {
        height: 180,
        weight: 100,
        age: -20
      };
      const response = service.analyze(input);
      expect(response.occuredError).toBe(ErrorCodes.AgeBelowZero);
  }));

  it('should support age equal to zero',
    inject([WeightAnalyzerService], (service: WeightAnalyzerService) => {
      const input = {
        height: 180,
        weight: 100,
        age: 0
      };
      const response = service.analyze(input);
      expect(response.occuredError).toBeUndefined();
  }));

  it('should analyze for under 40 years',
    inject([WeightAnalyzerService], (service: WeightAnalyzerService) => {
      const input = {
        height: 168,
        weight: 68,
        age: 30
      };
      const response = service.analyze(input);
      expect(response.occuredError).toBeUndefined();
      expect(response.weightDeviation).toBe(10);
      expect(response.weightDeviationPercentage).toBe(17);
  }));

  it('should analyze for above 40 years',
    inject([WeightAnalyzerService], (service: WeightAnalyzerService) => {
      const input = {
        height: 168,
        weight: 48,
        age: 50
      };
      const response = service.analyze(input);
      expect(response.occuredError).toBeUndefined();
      expect(response.weightDeviation).toBe(-20);
      expect(response.weightDeviationPercentage).toBe(-29);
  }));



});
