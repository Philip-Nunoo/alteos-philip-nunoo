export type EligibilityCriteria = {
  thresholdAmount: number;
  coveragePeriod: { start: Date; end: Date };
};

type ClaimData = {
  claimId: string;
  policyNumber: string;
  policyCoveragePeriod: { start: string; end: string };
  claimantDetails: string;
  dateOfIncident: string;
  typeOfClaim: string;
  claimedAmount: number;
};

/**
 * Claim class to represent a claim
 * @param {ClaimData} claimData - Claim data object
 * @returns {Claim} - Claim object
 * @constructor Claim object with claim data properties
 * @method isEligibleForProcessing - Check if claim is eligible for processing based on eligibility criteria
 */
export class Claim {
  claimId: string;
  policyNumber: string;
  policyCoveragePeriod: { start: Date; end: Date };
  claimantDetails: string;
  dateOfIncident: Date;
  typeOfClaim: string;
  claimedAmount: number;

  constructor(claimData: ClaimData) {
    this.claimId = claimData.claimId;
    this.policyNumber = claimData.policyNumber;
    this.policyCoveragePeriod = {
      start: new Date(claimData.policyCoveragePeriod.start),
      end: new Date(claimData.policyCoveragePeriod.end),
    };
    this.claimantDetails = claimData.claimantDetails;
    this.dateOfIncident = new Date(claimData.dateOfIncident);
    this.typeOfClaim = claimData.typeOfClaim;
    this.claimedAmount = claimData.claimedAmount;
  }

  /**
   * Check if claim is eligible for processing based on eligibility criteria
   * @param {EligibilityCriteria} eligibilityCriteria - Eligibility criteria object
   * @returns {[boolean, string]} - Tuple with eligibility status and message
   */
  isEligibleForProcessing(eligibilityCriteria: EligibilityCriteria): [boolean, string] {
    if (this.claimedAmount > eligibilityCriteria.thresholdAmount) {
      return [false, 'Claimed amount exceeds threshold'];
    }

    const claimDate = new Date(this.dateOfIncident);

    if (claimDate < eligibilityCriteria.coveragePeriod.start || claimDate > eligibilityCriteria.coveragePeriod.end) {
      return [false, 'Claim date is outside coverage period'];
    }

    return [true, 'Eligible'];
  }
}
