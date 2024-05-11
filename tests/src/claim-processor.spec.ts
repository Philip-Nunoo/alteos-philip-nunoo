import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import fs from 'fs';
import { ClaimProcessor } from '../../src/claim-processor';
import { Claim, EligibilityCriteria } from '../../src/claim';

jest.mock('fs');
jest.mock('../../src/utils/index');

describe('ClaimProcessor', () => {
  let claimProcessor: ClaimProcessor;
  let mockClaims: Claim[];
  let mockEligibilityCriteria: EligibilityCriteria;

  beforeEach(() => {
    claimProcessor = new ClaimProcessor('mockFilePath');
    mockEligibilityCriteria = {
      thresholdAmount: 5000,
      coveragePeriod: { start: new Date('2022-01-01'), end: new Date('2022-12-31') },
    };

    mockClaims = [
      new Claim({
        claimId: '1',
        claimedAmount: 4000,
        policyNumber: '123',
        policyCoveragePeriod: { start: '2022-01-01', end: '2022-12-31' },
        claimantDetails: 'John Doe',
        dateOfIncident: '2022-01-01',
        typeOfClaim: 'Accident',
      }),
      new Claim({
        claimId: '2',
        claimedAmount: 6000,
        policyNumber: '123',
        policyCoveragePeriod: { start: '2022-01-01', end: '2022-12-31' },
        claimantDetails: 'John Doe',
        dateOfIncident: '2022-01-01',
        typeOfClaim: 'Accident',
      }),
    ];
  });

  it('should get claims from file', () => {
    (fs.readFileSync as jest.Mock).mockReturnValueOnce(JSON.stringify(mockClaims));
    const claims = (claimProcessor as any).loadClaims();
    expect(claims).toEqual(mockClaims);
  });

  it('should process claims', () => {
    jest.spyOn(claimProcessor as any, 'loadClaims').mockReturnValueOnce(mockClaims);
    const claimResponses = claimProcessor.processClaim(mockEligibilityCriteria);
    expect(claimResponses).toEqual([
      { claimId: '1', isEligible: true, message: 'Eligible' },
      { claimId: '2', isEligible: false, message: 'Claimed amount exceeds threshold' },
    ]);
  });

  it('should evaluate claims', () => {
    const claimResponses = (claimProcessor as any).evaluateClaims(mockClaims, mockEligibilityCriteria);
    expect(claimResponses).toEqual([
      { claimId: '1', isEligible: true, message: 'Eligible' },
      { claimId: '2', isEligible: false, message: 'Claimed amount exceeds threshold' },
    ]);
  });

  it('should return empty array when evaluateClaims returns empty array in processClaim', () => {
    jest.spyOn(claimProcessor as any, 'loadClaims').mockReturnValueOnce(mockClaims);
    jest.spyOn(claimProcessor as any, 'evaluateClaims').mockReturnValueOnce([]);
    const claimResponses = claimProcessor.processClaim(mockEligibilityCriteria);
    expect(claimResponses).toEqual([]);
  });

  it('should return empty array when fs.readFileSync throws an error in loadClaims', () => {
    (fs.readFileSync as jest.Mock).mockImplementationOnce(() => {
      throw new Error('Error reading file');
    });
    const claims = (claimProcessor as any).loadClaims();
    expect(claims).toEqual([]);
  });
});
