/**
 * WhatsApp & Facebook Messenger Chatbot Service for DebunkAI.
 * Formats Gemma 4 fact-checking findings into conversational mobile messages
 * and handles Meta Webhook verification & incoming message delivery.
 * Supports special High-Depth Nigerian 2027 Election Audits and Audio/Video Forensics.
 */
import { analyzeClaim, DebunkResult } from './debunkService.ts';

export interface WebhookLogEvent {
  id: string;
  timestamp: string;
  platform: 'whatsapp' | 'facebook' | 'simulated';
  direction: 'incoming' | 'outgoing';
  senderId: string;
  incomingText: string;
  mediaType?: 'text' | 'audio' | 'video' | 'image';
  replyText?: string;
  verdict?: string;
  credibilityScore?: number;
  deliveryStatus: 'delivered' | 'simulated' | 'logged_only' | 'error';
  errorDetail?: string;
}

// In-memory store of recent webhook events for the inspector UI
const recentLogs: WebhookLogEvent[] = [];

export function getWebhookLogs(): WebhookLogEvent[] {
  return [...recentLogs].slice(0, 30);
}

export function clearWebhookLogs(): void {
  recentLogs.length = 0;
}

export function addWebhookLog(event: Omit<WebhookLogEvent, 'id' | 'timestamp'>): WebhookLogEvent {
  const log: WebhookLogEvent = {
    id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    ...event,
  };
  recentLogs.unshift(log);
  if (recentLogs.length > 50) {
    recentLogs.pop();
  }
  return log;
}

/**
 * Formats a structured DebunkResult into a friendly, readable chat message
 * styled specifically for mobile messaging apps (WhatsApp / Facebook Messenger).
 */
export function formatChatbotResponse(result: DebunkResult, platform: 'whatsapp' | 'facebook' = 'whatsapp'): string {
  const isWhatsApp = platform === 'whatsapp';
  const bold = (txt: string) => (isWhatsApp ? `*${txt}*` : txt.toUpperCase());
  const italic = (txt: string) => (isWhatsApp ? `_${txt}_` : `"${txt}"`);

  let emojiVerdict = '🔍';
  if (result.verdict === 'Disinformation') emojiVerdict = '🔴 🚨';
  else if (result.verdict === 'Misinformation') emojiVerdict = '🟡 ⚠️';
  else if (result.verdict === 'Malinformation') emojiVerdict = '🛑';
  else if (result.verdict === 'Verified True') emojiVerdict = '🟢 ✅';
  else if (result.verdict === 'Unverified — insufficient evidence') emojiVerdict = '🟡 🔎';

  const redFlagsList = result.redFlags && result.redFlags.length > 0
    ? result.redFlags.map((rf) => `• ${rf}`).join('\n')
    : '• None detected';

  const headerTitle = result.isNigerianElection
    ? `🇳🇬 ${bold('NIGERIAN 2027 ELECTION AUDIT')}`
    : `${emojiVerdict} ${bold('DEBUNK-AI FACT-CHECK')}`;

  let mediaForensicsSection = '';
  if (result.mediaType === 'audio' && result.mediaDetails?.audioForensics) {
    const af = result.mediaDetails.audioForensics;
    mediaForensicsSection = `
🎙️ ${bold('Audio Forensic Analysis:')}
• Voice Cloning Risk: ${af.voiceCloningRisk}
• Markers: ${af.acousticMarkers.join(', ')}
• Speaker: ${af.speakerContext}
`;
  } else if (result.mediaType === 'video' && result.mediaDetails?.videoForensics) {
    const vf = result.mediaDetails.videoForensics;
    mediaForensicsSection = `
🎬 ${bold('Video Forensic Analysis:')}
• Deepfake Risk: ${vf.deepfakeRisk}
• Visual Markers: ${vf.visualMarkers.join(', ')}
• Archival Check: ${vf.archivalFootageCheck}
`;
  } else if (result.mediaType === 'image' && result.mediaDetails?.imageForensics) {
    const imf = result.mediaDetails.imageForensics;
    mediaForensicsSection = `
🖼️ ${bold('Image & Screenshot Forensic Analysis:')}
• Manipulation Risk: ${imf.manipulationRisk}
• Visual Markers: ${imf.visualMarkers.join(', ')}
${imf.extractedTextOrOcr ? `• Text Detected (OCR): ${imf.extractedTextOrOcr.slice(0, 180)}\n` : ''}• Context Check: ${imf.contextVerification}
`;
  }

  let electionSection = '';
  if (result.isNigerianElection && result.electionDepthAnalysis) {
    const ea = result.electionDepthAnalysis;
    electionSection = `
🏛️ ${bold('INEC & Electoral Protocol:')}
${ea.inecProtocolCheck}

🕊️ ${bold('Peace & Tension Impact:')}
${ea.peaceAndTensionImpact}
`;
  }

  let cibSection = '';
  if (result.coordinatedCampaignAnalysis?.isCoordinatedPattern) {
    const cib = result.coordinatedCampaignAnalysis;
    cibSection = `
🤖 ${bold('Coordinated Campaign Network Detected:')}
• Campaign Type: ${cib.campaignType}
• Coordination Risk: ${cib.coordinationRisk}
• Tactic: ${cib.trollFarmTactics}
• Counter-Measure: ${cib.recommendedCounterMeasure}
`;
  }

  let fimiSection = '';
  if (result.fimiAnalysis?.isFimiRisk) {
    const fimi = result.fimiAnalysis;
    const topCase = fimi.matchingDocumentedCases?.[0];
    fimiSection = `
🌍 ${bold('FOREIGN INTERFERENCE (FIMI) ALERT:')}
• Risk Level: ${fimi.fimiRiskLevel} (${fimi.fimiCategory})
• Foreign Networks / Actors: ${fimi.foreignActorsOrNetworks.join(', ')}
${topCase ? `• Documented Nigeria Precedent: ${topCase.caseTitle} (${topCase.year})\n  Source: ${topCase.documentedSource}` : ''}
• Outside Geopolitical Goal: ${fimi.geopoliticalObjective}
• Sovereignty Advisory: ${fimi.sovereigntyImpact}
• How to Protect Yourself: ${fimi.counterMeasure}
`;
  }

  let urlVetSection = '';
  if (result.urlVetReport?.hasLinks && result.urlVetReport.analyzedUrls.length > 0) {
    const topTarget = result.urlVetReport.analyzedUrls[0];
    const isPhish = topTarget.safetyVerdict === 'MALICIOUS_PHISHING';
    const isSafe = topTarget.safetyVerdict === 'OFFICIAL_SAFE';
    const safetyIcon = isPhish ? '🚨' : isSafe ? '✅' : '⚠️';
    urlVetSection = `
🛡️ ${bold('URL.VET LINK SECURITY & PHISHING SCAN:')}
• Inspected Link: ${topTarget.rawUrl}
• Normalized Domain: ${topTarget.normalizedDomain}
• Safety Verdict: ${safetyIcon} ${topTarget.safetyVerdict.replace('_', ' ')} (Safety Score: ${topTarget.safetyScore}/100)
• Threat Classification: ${topTarget.threatType}
${topTarget.impersonatedEntity ? `• Impersonated Entity: ${topTarget.impersonatedEntity}\n` : ''}• Domain Age & Infrastructure: ${topTarget.domainAgeEstimate}
• Hosting Location: ${topTarget.hostingCountry}
• url.vet Security Advice: ${topTarget.actionRecommendation}
`;
  }

  let localGapSection = '';
  if (result.localEvidenceGapAnalysis) {
    const gap = result.localEvidenceGapAnalysis;
    const indicatorEmoji =
      gap.indicatorColor === 'green' ? '🟢' : gap.indicatorColor === 'red' ? '🔴' : '🟡';
    const missingList =
      gap.missingEvidence.length > 0
        ? gap.missingEvidence
            .slice(0, 3)
            .map((m) => `• ${m.label}`)
            .join('\n')
        : '• No critical local evidence gaps detected';
    const nextStepList = gap.recommendedVerificationSteps
      .slice(0, 3)
      .map((s) => `• ${s.channel}: ${s.action}`)
      .join('\n');

    localGapSection = `
🧭 ${bold('LOCAL EVIDENCE GAP ANALYSIS:')}
• Status: ${indicatorEmoji} ${gap.indicatorLabel}
• Language / Scope: ${gap.detectedLanguage} • ${gap.geographicFocus}
• Evidence Confidence: ${gap.confidenceAssessment.evidenceConfidenceScore}/100 (${gap.confidenceAssessment.evidenceConfidenceLabel})
• Verdict Confidence: ${gap.confidenceAssessment.verdictConfidenceScore}/100 (${gap.confidenceAssessment.verdictConfidenceLabel})
• Evidence Gaps:
${missingList}
• Recommended Next Steps:
${nextStepList}
• Epistemic Note: ${gap.epistemicConclusion}
`;
  }

  const replyToShare = result.isNigerianElection && result.electionDepthAnalysis?.nigerianContextReply
    ? result.electionDepthAnalysis.nigerianContextReply
    : result.easyReply;

  return `${headerTitle}
━━━━━━━━━━━━━━━━━━
${bold('Verdict:')} ${result.verdict}
${bold('Classification:')} ${result.verdictLabel}
${bold('Credibility Score:')} ${result.credibilityScore}/100
${mediaForensicsSection}
${bold('📌 In Simple Words:')}
${result.summary}

${bold('🔎 Verified Reality:')}
${result.factualReality}
${localGapSection}${electionSection}${fimiSection}${cibSection}${urlVetSection}
${bold('🚩 Key Signals / Flags:')}
${redFlagsList}

━━━━━━━━━━━━━━━━━━
${bold('💬 Copy & Send to WhatsApp/Family Groups:')}
${italic(replyToShare)}

${italic('🛡️ Verify before you share • Powered by Gemma 4 • Send any image, voice note, video, or viral post anytime to check!')}`;
}

/**
 * Verify Meta Webhook handshake (GET request).
 */
export function verifyMetaWebhook(
  mode?: string,
  token?: string,
  challenge?: string
): { isValid: boolean; challenge?: string } {
  const expectedToken = process.env.META_VERIFY_TOKEN || 'debunk_bot_token';

  if (mode === 'subscribe' && token === expectedToken) {
    return { isValid: true, challenge };
  }
  return { isValid: false };
}

/**
 * Dispatches a message back to WhatsApp via Meta Cloud API.
 */
export async function sendWhatsAppMessage(to: string, messageText: string, phoneNumberId?: string): Promise<boolean> {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneId = phoneNumberId || process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!token || !phoneId) {
    return false;
  }

  const url = `https://graph.facebook.com/v21.0/${phoneId}/messages`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to,
      type: 'text',
      text: { body: messageText },
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error(`WhatsApp Cloud API error (${response.status}):`, errText);
    return false;
  }
  return true;
}

/**
 * Dispatches a message back to Facebook Messenger via Meta Graph API.
 */
export async function sendFacebookMessage(recipientId: string, messageText: string): Promise<boolean> {
  const token = process.env.PAGE_ACCESS_TOKEN;

  if (!token) {
    return false;
  }

  const url = `https://graph.facebook.com/v21.0/me/messages?access_token=${token}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      recipient: { id: recipientId },
      message: { text: messageText },
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error(`Facebook Send API error (${response.status}):`, errText);
    return false;
  }
  return true;
}

/**
 * Main webhook handler for Meta (WhatsApp & Facebook Messenger).
 * Parses incoming message, calls Gemma 4, formats output, and responds.
 */
export async function handleMetaWebhookPayload(body: any): Promise<{
  handled: boolean;
  platform?: 'whatsapp' | 'facebook';
  sender?: string;
  incomingText?: string;
  replyText?: string;
  delivered?: boolean;
}> {
  // 1. Detect WhatsApp Cloud API payload
  if (body?.object === 'whatsapp_business_account' || body?.entry?.[0]?.changes?.[0]?.value?.messages) {
    const change = body.entry?.[0]?.changes?.[0]?.value;
    const message = change?.messages?.[0];
    const phoneNumberId = change?.metadata?.phone_number_id;

    if (!message) {
      return { handled: false };
    }

    const sender = message.from;
    let incomingText = '';
    let mediaType: 'text' | 'audio' | 'video' | 'image' = 'text';

    if (message.type === 'text') {
      incomingText = message.text?.body?.trim() || '';
    } else if (message.type === 'audio' || message.type === 'voice') {
      mediaType = 'audio';
      incomingText = message.audio?.caption || 'Voice note forwarded: Leaked INEC election conversation.';
    } else if (message.type === 'video') {
      mediaType = 'video';
      incomingText = message.video?.caption || 'Video clip forwarded: Polling unit voting incident.';
    } else if (message.type === 'image') {
      mediaType = 'image';
      incomingText = message.image?.caption || 'Image forwarded: Screenshot or Form EC8A election result sheet.';
    }

    if (!incomingText) {
      return { handled: false };
    }

    try {
      const debunkResult = await analyzeClaim(incomingText, undefined, mediaType);
      const replyText = formatChatbotResponse(debunkResult, 'whatsapp');

      const isDelivered = await sendWhatsAppMessage(sender, replyText, phoneNumberId);

      addWebhookLog({
        platform: 'whatsapp',
        direction: 'incoming',
        senderId: sender,
        incomingText,
        mediaType,
        replyText,
        verdict: debunkResult.verdict,
        credibilityScore: debunkResult.credibilityScore,
        deliveryStatus: isDelivered ? 'delivered' : 'logged_only',
      });

      return {
        handled: true,
        platform: 'whatsapp',
        sender,
        incomingText,
        replyText,
        delivered: isDelivered,
      };
    } catch (err: any) {
      addWebhookLog({
        platform: 'whatsapp',
        direction: 'incoming',
        senderId: sender,
        incomingText,
        deliveryStatus: 'error',
        errorDetail: err.message,
      });
      return { handled: false };
    }
  }

  // 2. Detect Facebook Messenger payload
  if (body?.object === 'page' || body?.entry?.[0]?.messaging) {
    const messaging = body.entry?.[0]?.messaging?.[0];
    const sender = messaging?.sender?.id;
    const attachmentType = messaging?.message?.attachments?.[0]?.type;
    const mediaType: 'text' | 'audio' | 'video' | 'image' =
      attachmentType === 'image'
        ? 'image'
        : attachmentType === 'audio'
        ? 'audio'
        : attachmentType === 'video'
        ? 'video'
        : 'text';
    const incomingText =
      messaging?.message?.text?.trim() ||
      (mediaType === 'image'
        ? 'Image attachment forwarded: Screenshot or graphic for verification.'
        : mediaType === 'audio'
        ? 'Audio attachment forwarded for verification.'
        : mediaType === 'video'
        ? 'Video attachment forwarded for verification.'
        : '');

    if (!sender || !incomingText) {
      return { handled: false };
    }

    try {
      const debunkResult = await analyzeClaim(incomingText, undefined, mediaType);
      const replyText = formatChatbotResponse(debunkResult, 'facebook');

      const isDelivered = await sendFacebookMessage(sender, replyText);

      addWebhookLog({
        platform: 'facebook',
        direction: 'incoming',
        senderId: sender,
        incomingText,
        mediaType,
        replyText,
        verdict: debunkResult.verdict,
        credibilityScore: debunkResult.credibilityScore,
        deliveryStatus: isDelivered ? 'delivered' : 'logged_only',
      });

      return {
        handled: true,
        platform: 'facebook',
        sender,
        incomingText,
        replyText,
        delivered: isDelivered,
      };
    } catch (err: any) {
      addWebhookLog({
        platform: 'facebook',
        direction: 'incoming',
        senderId: sender,
        incomingText,
        deliveryStatus: 'error',
        errorDetail: err.message,
      });
      return { handled: false };
    }
  }

  return { handled: false };
}
