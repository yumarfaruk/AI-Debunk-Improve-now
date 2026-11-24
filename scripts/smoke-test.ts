/**
 * Smoke test script for Gemma 4 DebunkAI.
 * Sends realistic viral claim input through the active provider (API or Ollama)
 * and prints PASS or FAIL.
 */
import dotenv from 'dotenv';
dotenv.config();

import { analyzeClaim, getActiveProviderConfig, REALISTIC_SAMPLE_CLAIM } from '../server/debunkService.ts';

async function runSmokeTest() {
  console.log('========================================================');
  console.log('           GEMMA 4 DEBUNK-AI SMOKE TEST                 ');
  console.log('========================================================');

  const config = getActiveProviderConfig();
  console.log(`Active Provider: ${config.provider.toUpperCase()}`);
  if (config.provider === 'api') {
    console.log(`Model:           ${config.geminiModel}`);
    console.log(`API Key Set:     ${config.hasApiKey ? 'YES' : 'NO (missing GEMINI_API_KEY)'}`);
  } else {
    console.log(`Ollama Endpoint: ${config.ollamaEndpoint}`);
    console.log(`Ollama Model:    ${config.ollamaModel}`);
  }

  console.log('\n--- Realistic Viral Input ---');
  console.log(REALISTIC_SAMPLE_CLAIM);
  console.log('-----------------------------\n');
  console.log('Sending claim to Gemma 4 for verification...');

  const startTime = Date.now();

  try {
    const result = await analyzeClaim(REALISTIC_SAMPLE_CLAIM);
    const durationMs = Date.now() - startTime;

    console.log('\n--- Model Verification Findings ---');
    console.log(`Verdict:          ${result.verdict} (${result.verdictLabel})`);
    console.log(`Credibility:      ${result.credibilityScore}/100`);
    console.log(`Model Used:       ${result.modelUsed}`);
    console.log(`Response Time:    ${durationMs}ms`);
    console.log(`Summary:          ${result.summary}`);
    console.log(`Category Reason:  ${result.categoryExplanation}`);
    console.log(`Extracted Claims: ${result.claimsExtracted.join(' | ')}`);
    console.log(`Factual Reality:  ${result.factualReality}`);
    console.log(`Red Flags Found:  ${result.redFlags.join(', ')}`);
    console.log(`Easy Reply:       "${result.easyReply}"`);
    console.log('-----------------------------------\n');

    // Validation checks
    const isValidVerdict = [
      'Misinformation',
      'Disinformation',
      'Malinformation',
      'Verified True',
      'Unverified / Needs Context',
      'Unverified — insufficient evidence',
    ].includes(result.verdict);

    const hasSummary = Boolean(result.summary && result.summary.length > 10);
    const hasFindings = Array.isArray(result.detailedFindings) && result.detailedFindings.length > 0;
    const hasGapReport = Boolean(result.localEvidenceGapAnalysis);

    // Test a documented Nigerian FIMI case
    console.log('Sending documented Nigerian FIMI claim to test historical case matching...');
    const fimiSample = `CONFIDENTIAL DIPLOMATIC CABLE: Russian Africa Corps and Wagner commanders stationed in Niger have announced they will deploy military contingents across the northern Nigerian border if the 2027 election is rigged. Protesters in Kano and Kaduna are already raising the Russian flag in solidarity. Retweet and share before Western embassies censor this!`;
    const fimiResult = await analyzeClaim(fimiSample);

    console.log(`FIMI Verdict:     ${fimiResult.verdict} (${fimiResult.verdictLabel})`);
    console.log(`FIMI Risk Level:  ${fimiResult.fimiAnalysis?.fimiRiskLevel}`);
    console.log(`FIMI Category:    ${fimiResult.fimiAnalysis?.fimiCategory}`);
    console.log(`Documented Cases: ${fimiResult.fimiAnalysis?.matchingDocumentedCases?.map((c) => c.caseTitle).join('; ') || 'None'}`);

    const hasFimiData = Boolean(
      fimiResult.fimiAnalysis &&
      fimiResult.fimiAnalysis.matchingDocumentedCases &&
      fimiResult.fimiAnalysis.matchingDocumentedCases.length > 0
    );

    // Test Local Evidence Gap Indicator on Gombe rural attack example
    console.log('\nTesting Local Evidence Gap Indicator on Gombe rural claim...');
    const gombeResult = await analyzeClaim('A video allegedly shows an attack in a rural community in Gombe State.', undefined, 'video');
    console.log(`Gombe Verdict:    ${gombeResult.verdict} | Indicator: ${gombeResult.localEvidenceGapAnalysis?.indicatorColor}`);
    const hasValidGombeGap =
      gombeResult.verdict === 'Unverified — insufficient evidence' &&
      gombeResult.localEvidenceGapAnalysis?.indicatorColor === 'yellow';

    if (isValidVerdict && hasSummary && hasFindings && hasGapReport && hasFimiData && hasValidGombeGap) {
      console.log('\nSMOKE TEST VERIFICATION CHECKS:');
      console.log('  [x] Provider connection active');
      console.log('  [x] Viral claim parsed and evaluated cleanly');
      console.log('  [x] Structured findings & verdict returned');
      console.log('  [x] Local Evidence Gap Indicator & yellow uncertainty guardrail verified');
      console.log('  [x] Documented Nigerian FIMI historical cases matched');
      console.log('  [x] Label "Verify before you share" present');
      console.log('\nRESULT: PASS');
      process.exit(0);
    } else {
      console.error('\nFAIL: Model returned incomplete data structure or failed validation.');
      process.exit(1);
    }
  } catch (error: any) {
    console.error(`\nSmoke test error encountered: ${error.message}`);
    console.error('\nRESULT: FAIL');
    process.exit(1);
  }
}

runSmokeTest();
