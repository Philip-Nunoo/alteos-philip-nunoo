import fs from 'fs';
import { logger } from '@utils/index';
import { Claim, EligibilityCriteria } from '@/claim';

type ClaimResponse = {
  claimId: string;
  isEligible: boolean;
  message: string;
};

/**
 * ClaimProcessor class to process claims based on eligibility criteria
 * @param claimDataFile string - Path to claims data file
 * @returns ClaimProcessor object
 * @constructor ClaimProcessor object with claimDataFile property
 * @method processClaim - Process claims based on eligibility criteria and return response
 */
export class ClaimProcessor {
  constructor(private readonly claimDataFile: string) {}

  /**
   * Process claims based on eligibility criteria
   * @param {EligibilityCriteria} eligibilityCriteria - Eligibility criteria object
   * @returns ClaimResponse[] - Array of ClaimResponse objects
   */
  public processClaim(eligibilityCriteria: EligibilityCriteria) {
    const claims = this.loadClaims();
    logger.info(`Processing ${claims.length} claims`);

    const response = this.evaluateClaims(claims, eligibilityCriteria);

    logger.info('Finished processing claims');
    return response;
  }

  /**
   * Get claims from file and parse them into Claim objects
   * @returns {Claim[]} claims - Array of Claim objects
   */
  private loadClaims(): Claim[] {
    // Read claims from file
    try {
      const claimsData = fs.readFileSync(this.claimDataFile, 'utf8');
      const claims = JSON.parse(claimsData);
      return claims.map((claimData: any) => new Claim(claimData));
    } catch (error) {
      logger.error(`Error reading claims data`, error);
      return [];
    }
  }

  /**
   * Evaluate claims based on eligibility criteria
   * @param {Claim[]} claims - Array of Claim objects
   * @param {EligibilityCriteria} eligibilityCriteria - Eligibility criteria object
   * @returns ClaimResponse[]
   */
  private evaluateClaims(claims: Claim[], eligibilityCriteria: EligibilityCriteria): ClaimResponse[] {
    return claims.map((claim) => {
      const [isEligible, message] = claim.isEligibleForProcessing(eligibilityCriteria);
      return { claimId: claim.claimId, isEligible, message };
    });
  }

  /**
   * Print claims response as JSON
   * @param {ClaimResponse[]} response - Array of ClaimResponse objects
   * @param {string} filePath - Path to the JSON file
   */
  public static printClaimsResponse(response: ClaimResponse[], filePath: string): void {
    const json = JSON.stringify(response, null, 2);
    fs.writeFileSync(filePath, json);
  }
}
