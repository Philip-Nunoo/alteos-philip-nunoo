import { logger } from '@utils/index';
import { EligibilityCriteria } from '@/claim';
import { ClaimProcessor } from '@/claim-processor';
import { config } from 'dotenv';

config();

function main() {
  // Read environment variables
  const claimFile = process.env.CLAIM_DATA_FILE ?? './claims.json';
  const startDate = new Date(process.env.COVERAGE_START_DATE ?? '2022-01-01');
  const endDate = new Date(process.env.COVERAGE_END_DATE ?? '2022-12-31');
  const thresholdAmount = Number(process.env.THRESHOLD_AMOUNT ?? 5000);

  // Initialize claim processor
  const claimProcessor = new ClaimProcessor(claimFile);

  // Process claims
  const eligibilityCriteria: EligibilityCriteria = {
    thresholdAmount,
    coveragePeriod: { start: startDate, end: endDate },
  };
  const response = claimProcessor.processClaim(eligibilityCriteria);

  logger.info('Claim processing response:');
  console.log(JSON.stringify(response, null, 2));

  // Print response to file
  const outputFile = process.env.OUTPUT_FILE ?? './output.json';
  ClaimProcessor.printClaimsResponse(response, outputFile);
}

main();
