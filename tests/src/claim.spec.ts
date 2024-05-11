import { beforeEach, describe, expect, test } from '@jest/globals';

import { Claim } from '../../src/claim';

describe('Claim', () => {
  let claim: Claim;

  beforeEach(() => {
    claim = new Claim({
      claimId: '1',
      policyNumber: '12345',
      policyCoveragePeriod: { start: '2022-01-01', end: '2022-12-31' },
      claimantDetails: 'John Doe',
      dateOfIncident: '2022-06-01',
      typeOfClaim: 'Accident',
      claimedAmount: 5000,
    });
  });

  test('should correctly assign properties in the constructor', () => {
    expect(claim.claimId).toBe('1');
    expect(claim.policyNumber).toBe('12345');
    expect(claim.policyCoveragePeriod.start).toStrictEqual(new Date('2022-01-01'));
    expect(claim.policyCoveragePeriod.end).toStrictEqual(new Date('2022-12-31'));
    expect(claim.claimantDetails).toBe('John Doe');
    expect(claim.dateOfIncident).toStrictEqual(new Date('2022-06-01'));
    expect(claim.typeOfClaim).toBe('Accident');
    expect(claim.claimedAmount).toBe(5000);
  });

  describe('isEligibleForProcessing', () => {
    test('should return false if claimed amount exceeds threshold', () => {
      const eligibilityCriteria = {
        thresholdAmount: 4000,
        coveragePeriod: { start: new Date('2022-01-01'), end: new Date('2022-12-31') },
      };
      const [isEligible, message] = claim.isEligibleForProcessing(eligibilityCriteria);

      expect(isEligible).toBe(false);
      expect(message).toBe('Claimed amount exceeds threshold');
    });

    test('should return false if claim date is outside coverage period', () => {
      claim.dateOfIncident = new Date('2023-06-01');
      const eligibilityCriteria = {
        thresholdAmount: 6000,
        coveragePeriod: { start: new Date('2022-01-01'), end: new Date('2022-12-31') },
      };
      const [isEligible, message] = claim.isEligibleForProcessing(eligibilityCriteria);
      expect(isEligible).toBe(false);
      expect(message).toBe('Claim date is outside coverage period');
    });

    test('should return true if claim is eligible for processing', () => {
      const eligibilityCriteria = {
        thresholdAmount: 6000,
        coveragePeriod: { start: new Date('2022-01-01'), end: new Date('2022-12-31') },
      };
      const [isEligible, message] = claim.isEligibleForProcessing(eligibilityCriteria);

      expect(isEligible).toBe(true);
      expect(message).toBe('Eligible');
    });
  });
});
