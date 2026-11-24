/**
 * DebunkAI - Viral Misinformation & Election Integrity Fact-Checking.
 * Specialized for the Nigerian 2027 Elections with Audio & Video Forensic Features.
 * Works as a Web Fact-Checker and an interactive WhatsApp / Facebook Messenger Chatbot.
 */
import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  Sparkles,
  Cpu,
  Info,
  Send,
  History,
  Trash2,
  RefreshCw,
  Terminal,
  MessageSquare,
  Globe,
  Settings,
  Mic,
  MicOff,
  Video,
  FileAudio,
  Play,
  Pause,
  Upload,
  Volume2,
  Eye,
  Share2,
  Zap,
  ChevronDown,
  ChevronUp,
  Radio,
  Vote,
  Flag,
  FileText,
  Phone,
  MoreVertical,
  Network,
  Users,
  Link2,
  ExternalLink,
  Lightbulb,
  ThumbsUp,
  MessageCircle,
  X,
  Image as ImageIcon,
  Search,
  MapPin,
  Database,
  Compass,
  HelpCircle,
} from 'lucide-react';

interface FindingPoint {
  point: string;
  detail: string;
  status: 'debunked' | 'warning' | 'verified';
}

interface ElectionDepthAnalysis {
  inecProtocolCheck: string;
  peaceAndTensionImpact: string;
  provenanceAndContext: string;
  nigerianContextReply: string;
  officialFactCheckSources: string[];
}

interface CoordinatedCampaignAnalysis {
  isCoordinatedPattern: boolean;
  campaignType:
    | 'Copy-Paste Network (Copypasta)'
    | 'Synchronized Bot Flood'
    | 'Cloned News Impersonation'
    | 'Astroturf / Sockpuppet'
    | 'Organic / Isolated';
  coordinationRisk: 'High' | 'Medium' | 'Low' | 'None';
  coordinationSignatures: string[];
  trollFarmTactics: string;
  networkDispersionPattern: string;
  recommendedCounterMeasure: string;
}

export interface DocumentedFimiCase {
  id: string;
  caseTitle: string;
  year: string;
  perpetrators: string;
  documentedSource: string;
  tacticsUsed: string;
  historicalSummary: string;
  relevanceToClaim: string;
}

export interface FIMIAnalysis {
  isFimiRisk: boolean;
  fimiRiskLevel: 'High' | 'Medium' | 'Low' | 'Clean';
  fimiCategory:
    | 'Foreign State-Sponsored Narrative'
    | 'Covert Foreign Political Consultancy (PsyOps)'
    | 'Foreign-Hosted Cloned Media & Hack-and-Leak'
    | 'Cross-Border Sahelian Destabilization'
    | 'Foreign Health / Biolab Conspiracy'
    | 'None / Domestic';
  foreignActorsOrNetworks: string[];
  geopoliticalObjective: string;
  matchingDocumentedCases: DocumentedFimiCase[];
  sovereigntyImpact: string;
  counterMeasure: string;
}

export interface AudioForensics {
  voiceCloningRisk: 'High' | 'Medium' | 'Low' | 'Clean';
  acousticMarkers: string[];
  speakerContext: string;
}

export interface VideoForensics {
  deepfakeRisk: 'High' | 'Medium' | 'Low' | 'Authentic';
  visualMarkers: string[];
  archivalFootageCheck: string;
}

export interface ImageForensics {
  manipulationRisk: 'High' | 'Medium' | 'Low' | 'Authentic';
  visualMarkers: string[];
  extractedTextOrOcr: string;
  contextVerification: string;
}

export interface MediaDetails {
  transcription?: string;
  audioForensics?: AudioForensics;
  videoForensics?: VideoForensics;
  imageForensics?: ImageForensics;
}

export interface UrlVetSecurityCheck {
  category: string;
  status: 'safe' | 'warning' | 'danger';
  finding: string;
  technicalDetail: string;
}

export interface UrlVetTarget {
  rawUrl: string;
  normalizedDomain: string;
  isOfficialDomain: boolean;
  impersonatedEntity?: string;
  safetyVerdict: 'MALICIOUS_PHISHING' | 'SUSPICIOUS_UNVERIFIED' | 'OFFICIAL_SAFE' | 'CLEAN_CONTENT';
  safetyScore: number;
  threatType:
    | 'Credential Harvester'
    | 'Financial Phishing / Fee Scam'
    | 'Cloned News Disinformation Portal'
    | 'Malware / Exploit'
    | 'Safe Official Portal'
    | 'General Web Link';
  domainAgeEstimate: string;
  hostingCountry: string;
  redirectRisk: 'High (Obfuscated / Multi-hop)' | 'Low (Direct)' | 'None';
  sslSecurity: 'Legitimate Institutional SSL' | 'Automated Free SSL (Common for Phishing)' | 'Insecure / Missing';
  securityChecks: UrlVetSecurityCheck[];
  vettingSummary: string;
  actionRecommendation: string;
}

export interface UrlVetReport {
  hasLinks: boolean;
  overallThreatLevel: 'HIGH_RISK' | 'SUSPICIOUS' | 'SAFE' | 'NO_LINKS';
  analyzedUrls: UrlVetTarget[];
  quickSummary: string;
  canonicalAdvice: string;
}

export type EvidenceIndicatorColor = 'green' | 'yellow' | 'red';

export type LocalEvidenceGapCategory =
  | 'limited_nigerian_african_news_coverage'
  | 'missing_local_language_sources_hausa'
  | 'incomplete_geographic_or_street_imagery'
  | 'unavailable_government_or_institutional_records'
  | 'lack_of_community_level_confirmation'
  | 'private_messaging_platform_only';

export interface LocalEvidenceGapItem {
  category: LocalEvidenceGapCategory;
  label: string;
  description: string;
  severity: 'high' | 'moderate' | 'low';
}

export interface ConfidenceBreakdown {
  evidenceConfidenceScore: number;
  verdictConfidenceScore: number;
  evidenceConfidenceLabel: 'High' | 'Moderate' | 'Low' | 'Insufficient';
  verdictConfidenceLabel: 'High' | 'Moderate' | 'Low';
  factors: {
    sourceCredibility: number;
    evidenceRelevance: number;
    independentCorroboration: number;
    evidenceCompleteness: number;
    geographicAndLinguisticCoverage: number;
  };
  calculationExplanation: string;
  distinctionNote: string;
}

export interface LocalEvidenceGapAnalysis {
  indicatorColor: EvidenceIndicatorColor;
  indicatorLabel: string;
  evidenceAvailability: 'sufficient_supporting' | 'sufficient_contradicting' | 'partial' | 'insufficient';
  detectedLanguage: 'Hausa' | 'Pidgin' | 'Yoruba' | 'Igbo' | 'English' | 'Multilingual';
  geographicFocus: string;
  evidenceFound: string[];
  sourcesConsulted: Array<{
    name: string;
    status: 'checked_found' | 'checked_no_match' | 'unavailable';
    detail?: string;
  }>;
  evidenceSupportingClaim: string[];
  evidenceContradictingClaim: string[];
  missingEvidence: LocalEvidenceGapItem[];
  recommendedVerificationSteps: Array<{
    channel:
      | 'Nigerian Local Media'
      | 'Hausa-Language News Sources'
      | 'Government / Institutional Agencies'
      | 'Local Journalists & Community Sources'
      | 'Geographic & Satellite Imagery Tools'
      | 'Original Creators & Eyewitnesses';
    action: string;
  }>;
  confidenceAssessment: ConfidenceBreakdown;
  epistemicConclusion: string;
}

export interface DebunkResult {
  verdict:
    | 'Misinformation'
    | 'Disinformation'
    | 'Malinformation'
    | 'Verified True'
    | 'Unverified / Needs Context'
    | 'Unverified — insufficient evidence';
  verdictLabel: string;
  credibilityScore: number;
  summary: string;
  categoryExplanation: string;
  claimsExtracted: string[];
  factualReality: string;
  redFlags: string[];
  detailedFindings: FindingPoint[];
  easyReply: string;
  isNigerianElection: boolean;
  electionDepthAnalysis?: ElectionDepthAnalysis;
  coordinatedCampaignAnalysis?: CoordinatedCampaignAnalysis;
  fimiAnalysis?: FIMIAnalysis;
  urlVetReport?: UrlVetReport;
  localEvidenceGapAnalysis?: LocalEvidenceGapAnalysis;
  mediaType?: 'text' | 'audio' | 'video' | 'image';
  mediaDetails?: MediaDetails;
  providerUsed: 'api' | 'local';
  modelUsed: string;
  timestamp: string;
}

interface HistoryItem {
  id: string;
  snippet: string;
  result: DebunkResult;
  date: string;
}

interface ProviderConfig {
  provider: 'api' | 'local';
  geminiModel: string;
  ollamaEndpoint: string;
  ollamaModel: string;
  hasApiKey: boolean;
  metaVerifyToken?: string;
}

interface UploadedImageState {
  previewUrl: string;
  data: string;
  mimeType: string;
  fileName: string;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  time: string;
  mediaType?: 'text' | 'audio' | 'video' | 'image';
  mediaTitle?: string;
  audioDuration?: string;
  imagePreviewUrl?: string;
  debunkResult?: DebunkResult;
  isForwarded?: boolean;
}

interface WebhookLogItem {
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

export const DOCUMENTED_NIGERIA_FIMI_CASES: DocumentedFimiCase[] = [
  {
    id: 'fimi-case-russia-flags',
    caseTitle: 'Russian Flag Agitation & Sahel Coup Influence Operation',
    year: '2024',
    perpetrators: 'Russosphère, African Initiative (Kremlin-backed Africa Corps media proxy), and coordinated Telegram/X accounts with local surrogates',
    documentedSource: 'European External Action Service (EEAS) 2nd FIMI Report; DFRLab (Atlantic Council); Stanford Internet Observatory; Nigerian Department of State Services (DSS)',
    tacticsUsed: 'Weaponized cost-of-living grievances during August 2024 #EndBadGovernance protests; funded and distributed manufactured Russian flags in Kano, Kaduna, and Katsina; propagated fabricated rumors that foreign Russian troops would intervene or stage a coup in Nigeria.',
    historicalSummary: 'Foreign-backed network tapped into regional insecurity and Niger coup fallout to create anti-Western sentiment and test foreign mercenary normalization in Northern Nigeria.',
    relevanceToClaim: 'Employs foreign power intervention tropes, anti-democratic coup incitement, or proxy mercenary narratives.',
  },
  {
    id: 'fimi-case-cambridge-analytica',
    caseTitle: 'Cambridge Analytica / SCL Group Covert Presidential Election Campaign',
    year: '2015',
    perpetrators: 'Cambridge Analytica & SCL Elections (UK political consultancy firm contracted for $2 Million by domestic political financiers)',
    documentedSource: 'UK House of Commons Digital, Culture, Media and Sport Committee Inquiry; The Guardian / Observer investigation; Christopher Wylie whistleblower testimony',
    tacticsUsed: 'Covert psychographic profiling using stolen Israeli private medical records alleging candidate Muhammadu Buhari had terminal prostate cancer; production and viral microtargeting of apocalyptic Islamophobic videos warning that Sharia law would engulf Nigeria; deliberate voter suppression targeting opposition strongholds.',
    historicalSummary: 'Landmark documented instance of foreign data-driven psychological warfare directly hired to distort a Nigerian sovereign presidential election.',
    relevanceToClaim: 'Mirrors the covert dissemination of hacked personal medical dossiers, extreme ethno-religious fear-mongering, or weaponized psychographic profiling.',
  },
  {
    id: 'fimi-case-biolab-pathogens',
    caseTitle: 'Fabricated US/NATO Biolab & Pathogen Research Operations in Nigeria',
    year: '2022–2024',
    perpetrators: 'Russian Ministry of Defense briefings, state-affiliated media (RT, Sputnik), and synchronized foreign social media accounts',
    documentedSource: 'Nigeria Centre for Disease Control (NCDC); World Health Organization (WHO Africa); Dubawa; Africa Check',
    tacticsUsed: 'Fabricated intelligence claims that the United States and WHO operated secret military biolabs in Abuja, Zaria, and Lagos that manufactured and deliberately released monkeypox (mpox), cholera, and Lassa fever pathogens.',
    historicalSummary: 'Geopolitical disinformation campaign seeking to damage Nigeria-Western bilateral public health partnerships and trigger panic against vaccination drives.',
    relevanceToClaim: 'Uses foreign biolab tropes, weaponized disease origin falsehoods, or unverified foreign intelligence leaks regarding health crises.',
  },
  {
    id: 'fimi-case-cloned-news-domains',
    caseTitle: 'Ghostwriter & Foreign-Hosted Cloned Nigerian News Portals',
    year: '2023',
    perpetrators: 'Foreign cyber-espionage and influence clusters operating through proxy servers in Eastern Europe and offshore bulletproof hosting providers',
    documentedSource: 'Centre for Democracy and Development (CDD West Africa) Election Disinformation Tracker; Code for Africa; International Republican Institute (IRI)',
    tacticsUsed: 'Registering lookalike typo-squatted domains impersonating major Nigerian newsrooms (e.g. Channels TV, Punch, Vanguard, Premium Times) and publishing fabricated leaks claiming INEC server crashes or military election postponement.',
    historicalSummary: 'Exploited high news anxiety on election eve to bypass fact-checkers by copying authentic news layouts and visual branding.',
    relevanceToClaim: 'Matches cloned newsroom layouts, fake "breaking news" banners, or fabricated quotes attributed to official institutions.',
  },
  {
    id: 'fimi-case-offshore-server-hoax',
    caseTitle: 'Offshore Server Relocation & Foreign Intelligence Collusion Hoax',
    year: '2023–2027',
    perpetrators: 'Commercial disinformation vendors, anonymous diaspora troll clusters, and offshore bot syndicates',
    documentedSource: 'INEC Official Electoral Fact-Checking Unit; EU Election Observation Mission (EU EOM) Nigeria Report',
    tacticsUsed: 'Circulating viral text claiming that the Independent National Electoral Commission (INEC) secretly relocated its election result servers to Dubai, Frankfurt, or London to enable foreign intelligence services to manipulate vote tallies.',
    historicalSummary: 'Calculated campaign to preemptively destroy public trust in electronic result viewing portals (IReV) and biometric accreditation (BVAS).',
    relevanceToClaim: 'Claims electronic voting servers are controlled by foreign entities or foreign intelligence operatives.',
  },
];

// Nigerian 2027 Election, FIMI & Coordinated Misinformation Scenarios
const NIGERIAN_ELECTION_SAMPLES = [
  {
    id: 'fimi-russian-intervention',
    type: 'text' as const,
    title: '🌍 FIMI: Russian Flags & Sahel Mercenary Coup Rumor',
    badge: 'Disinformation',
    duration: 'Text',
    category: 'Foreign State Influence (FIMI)',
    group: 'fimi',
    text: 'CONFIDENTIAL DIPLOMATIC CABLE: Russian Africa Corps and Wagner commanders stationed in Niger have announced they will deploy military contingents across the northern Nigerian border to protect citizens and support an interim leadership change if the 2027 election is rigged. Protesters in Kano and Kaduna are already raising the Russian flag in solidarity. Retweet and share to all northern WhatsApp platforms before Western embassies censor this!',
  },
  {
    id: 'fimi-cambridge-analytica',
    type: 'video' as const,
    title: '🌍 FIMI: Cambridge Analytica Style Leaked Medical Dossier',
    badge: 'Disinformation',
    duration: '0:35',
    category: 'Foreign PsyOps (FIMI)',
    group: 'fimi',
    text: 'EXPOSED BY FOREIGN INVESTIGATORS: Leaked medical dossier obtained from a private London hospital proves the leading 2027 presidential contender has stage 4 cognitive degeneration and cannot survive the campaign. Watch this documentary clip showing his tremors and foreign doctors confirming the diagnosis. Share immediately to all Nigerian voters before it is purged!',
    videoNote: 'Simulated video clip: Spliced footage with foreign narrator voiceover, ominous background music, and purported medical charts styled after 2015 Cambridge Analytica tactics.',
  },
  {
    id: 'fimi-biolab-conspiracy',
    type: 'text' as const,
    title: '🌍 FIMI: NATO Biolabs in Abuja Outbreak Hoax',
    badge: 'Disinformation',
    duration: 'Text',
    category: 'Foreign Health Disinformation (FIMI)',
    group: 'fimi',
    text: 'BREAKING FROM MOSCOW INTELLIGENCE: Documents declassified today reveal that the recent mysterious fever outbreak in Abuja and Niger State was artificially generated from an unregistered US Department of Defense biolab operating under the guise of an agricultural research facility in the FCT. Nigerian health officials are under gag orders. Forward to all Nigerian groups to demand an immediate investigation!',
  },
  {
    id: 'fimi-foreign-server-hack',
    type: 'text' as const,
    title: '🌍 FIMI: Dubai Offshore Server 2027 Rigging Plot',
    badge: 'Disinformation',
    duration: 'Text',
    category: 'Foreign Infrastructure Hoax (FIMI)',
    group: 'fimi',
    text: 'COPY AND PASTE EVERYWHERE: Confirmed from 3 independent offshore server engineers in Dubai! The 2027 election results transmission will be rerouted through a private offshore server in the UAE controlled by foreign contractors to alter the final tallies. Do not let them silence us! Post this on all Twitter threads, Facebook groups, and broadcast to 10 WhatsApp chats right now!',
  },
  {
    id: 'inec-bvas-audio',
    type: 'audio' as const,
    title: '🎙️ Voice Note: BVAS Shut Down at 2PM',
    badge: 'Disinformation',
    duration: '0:42',
    category: 'Electoral Technology',
    group: 'election',
    text: 'Listen to this leaked voice note from an INEC official in Abuja headquarters! They have finalized a backdoor code to shut down all BVAS machines nationwide by 2:00 PM on election day so they can manually write results for their preferred presidential candidate. Forward this voice note immediately to all Nigerian groups so citizens can protest!',
    audioNote: 'Simulated audio: Distorted phone voice with background office chatter claiming to be an INEC insider in Abuja.',
  },
  {
    id: 'cloned-media-impersonation',
    type: 'text' as const,
    title: '🤖 Cloned News: Fake Channels TV Alert',
    badge: 'Disinformation',
    duration: 'Text',
    category: 'Coordinated Impersonation',
    group: 'cib',
    text: '[BREAKING - Channels Television Official Alert]: Chief Electoral Commissioner has tendered sudden resignation after refusing to comply with directives on 2027 presidential polls. National broadcast scheduled in 1 hour. Read leaked press release: https://channels-tv-breaking.online/resignation-statement-2027 before this page is suspended by the authorities!',
  },
  {
    id: 'election-subsidy-phishing',
    type: 'text' as const,
    title: '🚨 url.vet: ₦50,000 Pre-Election Grant Phishing',
    badge: 'Disinformation',
    duration: 'Text',
    category: 'Financial Phishing (url.vet)',
    group: 'urlvet',
    text: 'FEDERAL MINISTRY OF YOUTH: President Bola Tinubu has approved ₦50,000 2027 Pre-Election Citizen Support Fund for all Nigerian youth. Applications close tonight! Verify your BVN, phone number, and voter card details to receive instant bank credit: https://federal-government-2027-grant.top/apply',
  },
  {
    id: 'recycled-ballot-video',
    type: 'video' as const,
    title: '🎬 Video: 2027 Ballot Box Destruction',
    badge: 'Disinformation',
    duration: '0:35',
    category: 'Recycled Violence Footage',
    group: 'media',
    text: 'WATCH THIS LIVE VIDEO: Political thugs have already started burning and destroying 2027 election ballot boxes in an LGA in the Middle Belt today! The 2027 elections are compromised before they even start. Share before security agencies censor this video!',
    videoNote: 'Simulated video clip: Mobile phone camera recording armed men smashing green ballot boxes on a rural road.',
  },
  {
    id: 'candidate-withdrawal-deepfake',
    type: 'video' as const,
    title: '🎬 Deepfake: Candidate Drops Out',
    badge: 'Disinformation',
    duration: '0:28',
    category: 'AI Deepfake Speech',
    group: 'media',
    text: 'BREAKING NEWS: Watch presidential frontrunner formally address the nation and announce his complete withdrawal from the 2027 presidential race to endorse his opponent. Watch his mouth moving and hear his own voice on national television!',
    videoNote: 'Simulated video clip: Broadcast studio layout with AI lip-syncing over archival presidential campaign speech.',
  },
  {
    id: 'pvc-revalidation-scam',
    type: 'audio' as const,
    title: '🎙️ Voice Memo: ₦2,000 PVC Renewal Fee',
    badge: 'Disinformation',
    duration: '0:50',
    category: 'Financial Phishing',
    group: 'urlvet',
    text: 'Good morning brethren, an urgent announcement from INEC: all Permanent Voter Cards (PVC) issued before 2024 have been cancelled for the 2027 elections. If you do not revalidate online and pay the ₦2,000 biometric processing fee at this link before next Friday, you cannot vote: https://inecnigeria-pvc-revalidate2027.xyz/portal?id=verify',
    audioNote: 'Simulated audio: Voice memo forwarded across WhatsApp church and family community groups.',
  },
  {
    id: 'doctored-ec8a-sheet',
    type: 'image' as const,
    title: '🖼️ Image: Doctored Form EC8A Result Sheet',
    badge: 'Disinformation',
    duration: 'Image',
    category: 'Document Tampering & OCR',
    group: 'media',
    text: 'URGENT ELECTION ALERT: Look at this leaked INEC Form EC8A polling unit result sheet showing 9,450 votes cast in a unit with 420 accredited voters! Download the full sheet here: https://inecnigeria-irev-leaks.xyz/ec8a',
    imageNote: 'Simulated image: Photograph of Form EC8A tally sheet with mismatched ink digits and missing Presiding Officer stamp.',
  },
  {
    id: 'gombe-rural-attack-video',
    type: 'video' as const,
    title: '🟡 Evidence Gap: Rural Attack in Gombe State',
    badge: 'Insufficient Evidence',
    duration: '0:24',
    category: 'Local Evidence Gap Test',
    group: 'gaps',
    text: 'A video allegedly shows an attack in a rural community in Gombe State.',
    videoNote: 'Unindexed rural community video clip with no newsroom lower-third or geolocation tags.',
  },
  {
    id: 'hausa-gombe-incident',
    type: 'text' as const,
    title: '🗣️ Hausa: Hari a Kauye a Jihar Gombe',
    badge: 'Insufficient Evidence',
    duration: 'Text',
    category: 'Hausa Evidence Gap Test',
    group: 'gaps',
    text: 'Wani faifan bidiyo da ke yawo a WhatsApp ya nuna cewa an kai hari a wani kauye a karamar hukumar Akko ta jihar Gombe da safiyar yau, kuma mutane sun gudu daga gidajensu.',
  },
  {
    id: 'hausa-inec-ward-delay',
    type: 'text' as const,
    title: '🗣️ Hausa: Zabe a Mazabar Zamfara',
    badge: 'Insufficient Evidence',
    duration: 'Text',
    category: 'Hausa Election Gap Test',
    group: 'gaps',
    text: 'Labari daga jihar Zamfara: Masu zabe a wata mazaba ta karkara sun ce kayan zabe ba su iso ba har karfe biyu na rana.',
  },
  {
    id: 'inec-official-guideline',
    type: 'text' as const,
    title: '📝 Official INEC: Polling Protocol',
    badge: 'Verified True',
    duration: 'Text',
    category: 'Official Procedure',
    group: 'election',
    text: 'INEC confirms that for the 2027 general elections, voter accreditation will proceed strictly via biometric facial and fingerprint recognition on BVAS machines, and Form EC8A results sheets will be uploaded directly to the IReV portal in accordance with the Electoral Act. Official verified portal: https://inecnigeria.org/election-guidelines',
  },
];

// Generates a realistic simulated Form EC8A image sample in PNG format so 1-click testing exercises the full multimodal pipeline
function createSimulatedEc8aImage(): UploadedImageState {
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 380;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#fefce8';
      ctx.fillRect(0, 0, 640, 380);
      ctx.strokeStyle = '#14532d';
      ctx.lineWidth = 4;
      ctx.strokeRect(12, 12, 616, 356);

      ctx.fillStyle = '#14532d';
      ctx.fillRect(12, 12, 616, 56);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 20px sans-serif';
      ctx.fillText('INEC FORM EC8A (SIMULATED SAMPLE FOR AUDIT)', 28, 47);

      ctx.fillStyle = '#1e293b';
      ctx.font = 'bold 16px monospace';
      ctx.fillText('POLLING UNIT CODE: 24-08-01-002 (LAGOS)', 28, 102);
      ctx.fillText('TOTAL ACCREDITED VOTERS (BVAS): 420', 28, 134);

      // Highlighted tampered tally line
      ctx.fillStyle = '#fee2e2';
      ctx.fillRect(24, 158, 592, 54);
      ctx.strokeStyle = '#dc2626';
      ctx.lineWidth = 2;
      ctx.strokeRect(24, 158, 592, 54);
      ctx.fillStyle = '#b91c1c';
      ctx.font = 'bold 22px monospace';
      ctx.fillText('TOTAL VALID VOTES CAST: 9,450  <-- [MISMATCH!]', 34, 193);

      ctx.fillStyle = '#334155';
      ctx.font = '15px sans-serif';
      ctx.fillText('Presiding Officer Stamp: [MISSING / CROPPED OUT]', 28, 250);
      ctx.fillStyle = '#4338ca';
      ctx.font = 'bold 14px monospace';
      ctx.fillText('Source link: https://inecnigeria-irev-leaks.xyz/ec8a', 28, 286);

      ctx.fillStyle = '#64748b';
      ctx.font = 'italic 12px sans-serif';
      ctx.fillText('Simulated viral screenshot for multimodal OCR & tampering verification testing', 28, 340);

      const dataUrl = canvas.toDataURL('image/png');
      return {
        previewUrl: dataUrl,
        data: dataUrl,
        mimeType: 'image/png',
        fileName: 'simulated-form-ec8a-sample.png',
      };
    }
  } catch (e) {}
  // Minimal 1x1 transparent PNG fallback if canvas unavailable
  const fallback = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
  return {
    previewUrl: fallback,
    data: fallback,
    mimeType: 'image/png',
    fileName: 'simulated-form-ec8a-sample.png',
  };
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'chatbot' | 'web' | 'setup'>('chatbot');

  // Chatbot State
  const [chatPlatform, setChatPlatform] = useState<'whatsapp' | 'facebook'>('whatsapp');
  const [chatInput, setChatInput] = useState('');
  const [chatMediaType, setChatMediaType] = useState<'text' | 'audio' | 'video' | 'image'>('text');
  const [chatImage, setChatImage] = useState<UploadedImageState | null>(null);
  const chatFileInputRef = useRef<HTMLInputElement>(null);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [audioProgress, setAudioProgress] = useState(0);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome_1',
      sender: 'bot',
      text: `👋 Welcome! I am DebunkAI, your election & fact-checking assistant powered by Gemma 4.\n\n🇳🇬 *Nigerian 2027 Elections High-Depth Mode is ACTIVE.*\n🌍 *Foreign Interference (FIMI) Radar is ACTIVE.* (Detects documented foreign troll networks & PsyOps)\n\nForward or upload any text post, screenshot/photo 🖼️, WhatsApp voice note 🎙️, or video clip 🎬. I will inspect images for tampered Form EC8A sheets & cloned news banners, cross-reference official INEC protocols, scan against documented Nigerian FIMI cases, and give you a peaceful reply to share with your family or community groups!`,
      time: 'Just now',
    },
  ]);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Web Fact-Checker State
  const [webInputText, setWebInputText] = useState('');
  const [webMediaType, setWebMediaType] = useState<'text' | 'audio' | 'video' | 'image'>('text');
  const [webImage, setWebImage] = useState<UploadedImageState | null>(null);
  const [isDraggingImage, setIsDraggingImage] = useState(false);
  const webFileInputRef = useRef<HTMLInputElement>(null);
  const [isWebLoading, setIsWebLoading] = useState(false);
  const [webLoadingStage, setWebLoadingStage] = useState('Consulting Gemma 4...');
  const [webErrorMsg, setWebErrorMsg] = useState<string | null>(null);
  const [webResult, setWebResult] = useState<DebunkResult | null>(null);
  const [activeMediaPreview, setActiveMediaPreview] = useState<{
    type: 'audio' | 'video' | 'image';
    title: string;
    note: string;
    duration: string;
  } | null>(null);

  // Audio Recording in Web Fact-Checker
  const [isRecording, setIsRecording] = useState(false);
  const [recordedDuration, setRecordedDuration] = useState(0);
  const recordingTimerRef = useRef<any>(null);

  const [copiedReply, setCopiedReply] = useState(false);
  const [copiedReport, setCopiedReport] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [showFimiModal, setShowFimiModal] = useState(false);
  const [sampleFilter, setSampleFilter] = useState<'all' | 'gaps' | 'urlvet' | 'fimi' | 'election' | 'cib' | 'media'>('all');

  // Setup Tab State
  const [providerConfig, setProviderConfig] = useState<ProviderConfig | null>(null);
  const [webhookLogs, setWebhookLogs] = useState<WebhookLogItem[]>([]);
  const [isPingingWebhook, setIsPingingWebhook] = useState(false);
  const [pingStatus, setPingStatus] = useState<string | null>(null);
  const [copiedWebhookUrl, setCopiedWebhookUrl] = useState(false);
  const [copiedToken, setCopiedToken] = useState(false);

  // Smoke Test Modal
  const [showSmokeModal, setShowSmokeModal] = useState(false);
  const [smokeLoading, setSmokeLoading] = useState(false);
  const [smokeOutput, setSmokeOutput] = useState<any>(null);

  // Share & Community Feedback Modal State
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareTab, setShareTab] = useState<'posts' | 'feedback'>('posts');
  const [selectedPostPlatform, setSelectedPostPlatform] = useState<'twitter' | 'linkedin' | 'whatsapp' | 'forum'>('twitter');
  const [copiedPost, setCopiedPost] = useState(false);
  const [copiedAppUrl, setCopiedAppUrl] = useState(false);

  // Suggestions state
  const [feedbackCategory, setFeedbackCategory] = useState('Local Nigerian Languages (Pidgin/Hausa/Yoruba/Igbo)');
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackAuthor, setFeedbackAuthor] = useState('');
  const [feedbackList, setFeedbackList] = useState<any[]>([]);
  const [feedbackSubmitting, setFeedbackSubmitting] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  // Simulated Audio Playback ticker
  useEffect(() => {
    let interval: any;
    if (playingAudioId) {
      interval = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            setPlayingAudioId(null);
            return 0;
          }
          return prev + 5;
        });
      }, 200);
    } else {
      setAudioProgress(0);
    }
    return () => clearInterval(interval);
  }, [playingAudioId]);

  // Load provider info on mount
  useEffect(() => {
    fetch('/api/provider-info')
      .then((res) => res.json())
      .then((data) => setProviderConfig(data))
      .catch(() => {
        setProviderConfig({
          provider: 'api',
          geminiModel: 'gemma-4-26b-a4b-it',
          ollamaEndpoint: 'http://localhost:11434',
          ollamaModel: 'gemma4:e2b',
          hasApiKey: true,
          metaVerifyToken: 'debunk_bot_token',
        });
      });

    loadWebhookLogs();
    loadFeedback();

    try {
      const saved = localStorage.getItem('debunkai_history');
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch (e) {}
  }, []);

  const loadFeedback = () => {
    fetch('/api/feedback')
      .then((res) => res.json())
      .then((data) => {
        if (data.feedback) setFeedbackList(data.feedback);
      })
      .catch(() => {});
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;
    setFeedbackSubmitting(true);
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: feedbackCategory,
          suggestion: feedbackText,
          author: feedbackAuthor,
        }),
      });
      const data = await res.json();
      if (data.success && data.feedback) {
        setFeedbackList((prev) => [data.feedback, ...prev]);
        setFeedbackText('');
        setFeedbackAuthor('');
        setFeedbackSubmitted(true);
        setTimeout(() => setFeedbackSubmitted(false), 4000);
      }
    } catch (err) {
      const localItem = {
        id: `fb-${Date.now()}`,
        category: feedbackCategory,
        suggestion: feedbackText,
        author: feedbackAuthor || 'Community Member',
        timestamp: new Date().toISOString(),
      };
      setFeedbackList((prev) => [localItem, ...prev]);
      setFeedbackText('');
      setFeedbackSubmitted(true);
      setTimeout(() => setFeedbackSubmitted(false), 4000);
    } finally {
      setFeedbackSubmitting(false);
    }
  };

  // Auto-scroll chat
  useEffect(() => {
    if (activeTab === 'chatbot' && chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, isBotTyping, activeTab]);

  const loadWebhookLogs = () => {
    fetch('/api/webhook/logs')
      .then((res) => res.json())
      .then((data) => {
        if (data.logs) setWebhookLogs(data.logs);
      })
      .catch(() => {});
  };

  const saveToHistory = (claimText: string, debunkResult: DebunkResult) => {
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      snippet: claimText.slice(0, 80) + (claimText.length > 80 ? '...' : ''),
      result: debunkResult,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    const updated = [newItem, ...history.slice(0, 9)];
    setHistory(updated);
    try {
      localStorage.setItem('debunkai_history', JSON.stringify(updated));
    } catch (e) {}
  };

  // Helper: read an image File (upload, drop, or clipboard paste) into base64
  const readImageFile = (file: File): Promise<UploadedImageState> => {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith('image/')) {
        reject(new Error('Please choose a valid image file (PNG, JPG, WEBP, or GIF).'));
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        reject(new Error('Image is too large (max 10 MB). Please upload a smaller screenshot or photo.'));
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const result = String(reader.result || '');
        resolve({
          previewUrl: result,
          data: result,
          mimeType: file.type || 'image/png',
          fileName: file.name || `screenshot-${Date.now()}.png`,
        });
      };
      reader.onerror = () => reject(new Error('Failed to read the selected image file.'));
      reader.readAsDataURL(file);
    });
  };

  const handleChatImageSelected = async (file: File | undefined | null) => {
    if (!file) return;
    try {
      const img = await readImageFile(file);
      setChatImage(img);
      setChatMediaType('image');
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot_img_err_${Date.now()}`,
          sender: 'bot',
          text: `⚠️ ${err.message}`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
  };

  const handleWebImageSelected = async (file: File | undefined | null) => {
    if (!file) return;
    try {
      const img = await readImageFile(file);
      setWebImage(img);
      setWebMediaType('image');
      setWebErrorMsg(null);
      setActiveMediaPreview({
        type: 'image',
        title: img.fileName,
        note: 'Image loaded for visual tampering, OCR text extraction, and election/FIMI verification.',
        duration: 'Image',
      });
    } catch (err: any) {
      setWebErrorMsg(err.message);
    }
  };

  // Chatbot Send Handler (Text / Image / Voice Note / Video)
  const handleSendChatMessage = async (
    textToSend?: string,
    forcedMediaType?: 'text' | 'audio' | 'video' | 'image',
    mediaTitle?: string,
    audioDuration?: string,
    forcedImage?: UploadedImageState | null
  ) => {
    const activeImage = forcedImage !== undefined ? forcedImage : chatImage;
    const msg = (textToSend !== undefined ? textToSend : chatInput).trim();
    if (!msg && !activeImage) return;

    const media: 'text' | 'audio' | 'video' | 'image' =
      forcedMediaType || (activeImage && chatMediaType === 'text' ? 'image' : chatMediaType);

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: msg || (activeImage ? `📷 Check this image: ${activeImage.fileName}` : ''),
      mediaType: media,
      mediaTitle:
        mediaTitle ||
        (media === 'audio'
          ? 'Forwarded Voice Note'
          : media === 'video'
          ? 'Forwarded Video Clip'
          : media === 'image'
          ? activeImage?.fileName || 'Forwarded Screenshot'
          : undefined),
      audioDuration: audioDuration || (media === 'audio' ? '0:42' : undefined),
      imagePreviewUrl: activeImage?.previewUrl,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isForwarded: true,
    };

    setMessages((prev) => [...prev, userMsg]);
    setChatInput('');
    setChatImage(null);
    setChatMediaType('text');
    setIsBotTyping(true);

    try {
      const res = await fetch('/api/chat/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: msg,
          platform: chatPlatform,
          mediaType: media,
          ...(activeImage
            ? {
                imageData: {
                  data: activeImage.data,
                  mimeType: activeImage.mimeType,
                  fileName: activeImage.fileName,
                },
              }
            : {}),
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to get bot reply');
      }

      const data = await res.json();
      const botMsg: ChatMessage = {
        id: `bot_${Date.now()}`,
        sender: 'bot',
        text: data.replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        debunkResult: data.debunkResult,
      };

      setMessages((prev) => [...prev, botMsg]);
      loadWebhookLogs();
    } catch (err: any) {
      const errorBotMsg: ChatMessage = {
        id: `bot_err_${Date.now()}`,
        sender: 'bot',
        text: `⚠️ Verification check failed: ${err.message}. Please verify your connection or AI provider settings.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorBotMsg]);
    } finally {
      setIsBotTyping(false);
    }
  };

  // Web Analyze Handler
  const handleWebAnalyze = async (
    textToTest?: string,
    media?: 'text' | 'audio' | 'video' | 'image',
    forcedImage?: UploadedImageState | null
  ) => {
    const activeImage = forcedImage !== undefined ? forcedImage : webImage;
    const text = (textToTest !== undefined ? textToTest : webInputText).trim();
    if (!text && !activeImage) {
      setWebErrorMsg('Please enter text, upload an image/screenshot, or select a sample scenario.');
      return;
    }

    const currentMedia: 'text' | 'audio' | 'video' | 'image' =
      media || (activeImage && webMediaType === 'text' ? 'image' : webMediaType);

    setIsWebLoading(true);
    setWebErrorMsg(null);
    setWebResult(null);

    setWebLoadingStage(
      currentMedia === 'image'
        ? 'Scanning image for tampering, OCR text, & cloned graphics...'
        : currentMedia === 'audio'
        ? 'Scanning voice patterns & INEC BVAS protocols...'
        : currentMedia === 'video'
        ? 'Checking archival election footage & deepfake markers...'
        : 'Auditing Nigerian 2027 election claims with Gemma 4...'
    );

    const timer1 = setTimeout(() => setWebLoadingStage('Cross-referencing official INEC regulations & Peace accords...'), 2000);
    const timer2 = setTimeout(() => setWebLoadingStage('Synthesizing peace-keeping guidance & community reply...'), 4500);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          mediaType: currentMedia,
          ...(activeImage
            ? {
                imageData: {
                  data: activeImage.data,
                  mimeType: activeImage.mimeType,
                  fileName: activeImage.fileName,
                },
              }
            : {}),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server error (${response.status})`);
      }

      const data: DebunkResult = await response.json();
      setWebResult(data);
      saveToHistory(text || `Image: ${activeImage?.fileName || 'Uploaded screenshot'}`, data);
    } catch (err: any) {
      setWebErrorMsg(err.message || 'Failed to complete analysis.');
    } finally {
      clearTimeout(timer1);
      clearTimeout(timer2);
      setIsWebLoading(false);
    }
  };

  // Handle Recording simulation in Web tab
  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      clearInterval(recordingTimerRef.current);
      setWebInputText(
        'Voice note recording: "Good day, I have an urgent update from our party agents in Kaduna and Rivers. INEC has secretly disabled the BVAS uploading feature for the 2027 presidential polls."'
      );
      setWebMediaType('audio');
      setActiveMediaPreview({
        type: 'audio',
        title: 'Your Recorded Voice Note',
        note: 'Live microphone input captured. Acoustic spectral analysis and speech transcription ready.',
        duration: `0:${recordedDuration < 10 ? '0' : ''}${recordedDuration}`,
      });
      setRecordedDuration(0);
    } else {
      setIsRecording(true);
      setRecordedDuration(1);
      recordingTimerRef.current = setInterval(() => {
        setRecordedDuration((prev) => prev + 1);
      }, 1000);
    }
  };

  const handleTestWebhookPing = async (platform: 'whatsapp' | 'facebook') => {
    setIsPingingWebhook(true);
    setPingStatus(null);

    try {
      const res = await fetch('/api/webhook/test-ping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platform,
          text: NIGERIAN_ELECTION_SAMPLES[0].text,
          mediaType: 'audio',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setPingStatus(`✅ Webhook test passed! Meta event parsed and Gemma 4 responded with Nigerian Election Audit.`);
        loadWebhookLogs();
      } else {
        setPingStatus(`❌ Webhook error: ${data.error || 'Failed'}`);
      }
    } catch (e: any) {
      setPingStatus(`❌ Webhook ping error: ${e.message}`);
    } finally {
      setIsPingingWebhook(false);
    }
  };

  const handleRunSmokeTest = async () => {
    setSmokeLoading(true);
    setSmokeOutput(null);
    setShowSmokeModal(true);

    try {
      const res = await fetch('/api/smoke-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      setSmokeOutput(data);
    } catch (err: any) {
      setSmokeOutput({
        status: 'FAIL',
        error: err.message || 'Could not connect to test runner',
      });
    } finally {
      setSmokeLoading(false);
    }
  };

  const webhookPublicUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/api/webhook`
    : 'https://your-app-url.run.app/api/webhook';

  const copyWebhookUrl = () => {
    navigator.clipboard.writeText(webhookPublicUrl);
    setCopiedWebhookUrl(true);
    setTimeout(() => setCopiedWebhookUrl(false), 2000);
  };

  const copyVerifyToken = () => {
    navigator.clipboard.writeText(providerConfig?.metaVerifyToken || 'debunk_bot_token');
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  const getVerdictTheme = (verdict: string) => {
    switch (verdict) {
      case 'Disinformation':
        return {
          bg: 'bg-rose-50 border-rose-200 text-rose-900',
          badge: 'bg-rose-600 text-white',
          barColor: 'bg-rose-500',
          icon: <XCircle className="w-6 h-6 text-rose-600 flex-shrink-0" />,
        };
      case 'Misinformation':
        return {
          bg: 'bg-amber-50 border-amber-200 text-amber-900',
          badge: 'bg-amber-500 text-slate-900 font-bold',
          barColor: 'bg-amber-500',
          icon: <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0" />,
        };
      case 'Malinformation':
        return {
          bg: 'bg-purple-50 border-purple-200 text-purple-900',
          badge: 'bg-purple-600 text-white',
          barColor: 'bg-purple-600',
          icon: <ShieldAlert className="w-6 h-6 text-purple-600 flex-shrink-0" />,
        };
      case 'Verified True':
        return {
          bg: 'bg-emerald-50 border-emerald-200 text-emerald-900',
          badge: 'bg-emerald-600 text-white',
          barColor: 'bg-emerald-500',
          icon: <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />,
        };
      case 'Unverified — insufficient evidence':
        return {
          bg: 'bg-amber-50 border-amber-300 text-amber-950',
          badge: 'bg-amber-500 text-slate-950 font-bold',
          barColor: 'bg-amber-500',
          icon: <HelpCircle className="w-6 h-6 text-amber-600 flex-shrink-0" />,
        };
      default:
        return {
          bg: 'bg-amber-50/70 border-amber-200 text-slate-900',
          badge: 'bg-amber-500 text-slate-950 font-bold',
          barColor: 'bg-amber-500',
          icon: <Info className="w-6 h-6 text-amber-600 flex-shrink-0" />,
        };
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/20 font-bold">
              🇳🇬
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-slate-900">DebunkAI</span>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Nigeria 2027 Election Special
                </span>
                <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-full bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-amber-700" />
                  <span>Verify before you share</span>
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Images, Audio, Video &amp; WhatsApp Fact-Checker powered by Gemma 4
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setActiveTab('chatbot')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeTab === 'chatbot'
                  ? 'bg-white text-emerald-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp / FB Chatbot</span>
            </button>

            <button
              onClick={() => setActiveTab('web')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeTab === 'web'
                  ? 'bg-white text-emerald-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Web Fact-Checker</span>
            </button>

            <button
              onClick={() => setActiveTab('setup')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeTab === 'setup'
                  ? 'bg-white text-emerald-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Meta Setup</span>
            </button>
          </div>

          {/* Right Tools */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowShareModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition cursor-pointer"
              title="Get ready-to-post messages and submit feature suggestions"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share & Feedback</span>
            </button>

            <button
              onClick={handleRunSmokeTest}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold shadow-xs transition"
              title="Run smoke test on active AI provider"
            >
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden md:inline">Smoke Test</span>
            </button>
          </div>
        </div>
      </header>

      {/* Special Election Alert Header Ribbon */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white px-4 py-2 text-xs">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Vote className="w-4 h-4 text-emerald-300" />
            <span className="font-bold">Nigerian 2027 General Elections Protection Engine:</span>
            <span className="text-emerald-100 hidden sm:inline">
              High in-depth audit enabled for INEC regulations, BVAS/IReV rumors, fake result sheets, and WhatsApp voice notes.
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-emerald-900/60 text-[10px] font-mono border border-emerald-500/40">
              Images 🖼️, Audio 🎙️ &amp; Video 🎬 Forensics
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6">
        {/* ============================================================== */}
        {/* TAB 1: CHATBOT SIMULATOR (WITH AUDIO & VIDEO CHAT BUBBLES)    */}
        {/* ============================================================== */}
        {activeTab === 'chatbot' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Nigerian 2027 Election Media Quick Scenarios */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Vote className="w-3.5 h-3.5" />
                    Nigerian 2027 Election Hub
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Deep Audit Active
                  </span>
                </div>
                <h2 className="text-xl font-extrabold text-slate-900 leading-tight">
                  Fact-Check Images, Voice Notes &amp; Rumors
                </h2>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  During elections, misinformation spreads fast through altered screenshots, forwarded WhatsApp voice notes, and recycled videos. Test how your bot verifies all of them in seconds!
                </p>

                {/* Platform Toggle */}
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setChatPlatform('whatsapp')}
                      className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl border text-xs font-bold transition ${
                        chatPlatform === 'whatsapp'
                          ? 'border-emerald-500 bg-emerald-50/70 text-emerald-900 shadow-xs'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      <span>WhatsApp Bot</span>
                    </button>

                    <button
                      onClick={() => setChatPlatform('facebook')}
                      className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl border text-xs font-bold transition ${
                        chatPlatform === 'facebook'
                          ? 'border-blue-500 bg-blue-50/70 text-blue-900 shadow-xs'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                      <span>Messenger Bot</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 1-Click Nigerian Election Scenarios */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <span>Forward 2027 Election Media to Bot</span>
                  </h3>
                  <button
                    onClick={() => setShowFimiModal(true)}
                    className="text-[10px] text-amber-800 font-bold hover:underline flex items-center gap-1"
                  >
                    <span>🌍 FIMI Cases ({DOCUMENTED_NIGERIA_FIMI_CASES.length})</span>
                  </button>
                </div>

                {/* Filter Chips */}
                <div className="flex flex-wrap items-center gap-1 pb-1">
                  <button
                    onClick={() => setSampleFilter('all')}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold transition ${
                      sampleFilter === 'all'
                        ? 'bg-slate-800 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setSampleFilter('urlvet')}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold transition flex items-center gap-1 ${
                      sampleFilter === 'urlvet'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-indigo-50 text-indigo-800 border border-indigo-200'
                    }`}
                  >
                    🛡️ url.vet
                  </button>
                  <button
                    onClick={() => setSampleFilter('fimi')}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold transition flex items-center gap-1 ${
                      sampleFilter === 'fimi'
                        ? 'bg-amber-600 text-white'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}
                  >
                    🌍 FIMI
                  </button>
                  <button
                    onClick={() => setSampleFilter('election')}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold transition flex items-center gap-1 ${
                      sampleFilter === 'election'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    }`}
                  >
                    🇳🇬 Election
                  </button>
                  <button
                    onClick={() => setSampleFilter('media')}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold transition flex items-center gap-1 ${
                      sampleFilter === 'media'
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-50 text-blue-800 border border-blue-200'
                    }`}
                  >
                    🎙️ Media
                  </button>
                  <button
                    onClick={() => setSampleFilter('gaps')}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold transition flex items-center gap-1 ${
                      sampleFilter === 'gaps'
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-amber-50 text-amber-900 border border-amber-300'
                    }`}
                  >
                    🟡 Gaps / Hausa
                  </button>
                </div>

                <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                  {NIGERIAN_ELECTION_SAMPLES.filter(
                    (sample) => sampleFilter === 'all' || sample.group === sampleFilter
                  ).map((sample) => (
                    <button
                      key={sample.id}
                      onClick={() => {
                        const sampleImg = sample.type === 'image' ? createSimulatedEc8aImage() : null;
                        handleSendChatMessage(
                          sample.text,
                          sample.type,
                          sample.title,
                          sample.duration !== 'Text' && sample.duration !== 'Image' ? sample.duration : undefined,
                          sampleImg
                        );
                      }}
                      className="w-full text-left p-3 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/40 transition group"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-slate-800 group-hover:text-emerald-800 flex items-center gap-1.5">
                          <span>{sample.title}</span>
                        </span>
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            sample.badge === 'Verified True'
                              ? 'bg-emerald-100 text-emerald-800'
                              : sample.badge === 'Insufficient Evidence'
                              ? 'bg-amber-100 text-amber-900'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {sample.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                        "{sample.text}"
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Nigerian Fact-Checking Standards Card */}
              <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-4 text-xs text-emerald-950 space-y-2">
                <div className="font-bold flex items-center gap-1.5 text-emerald-900">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>High In-Depth Analysis Standards</span>
                </div>
                <ul className="space-y-1.5 text-[11px] text-emerald-900 leading-relaxed">
                  <li>• <strong>INEC Statutory Checks:</strong> Confirms BVAS accreditation & IReV upload rules.</li>
                  <li>• <strong>Peace & Security Impact:</strong> Identifies potential incitement of electoral violence.</li>
                  <li>• <strong>Audio/Video Forensics:</strong> Flags synthetic voices and recycled past-election videos.</li>
                  <li>• <strong>Community De-escalation:</strong> Ready-to-copy peace message for Nigerian WhatsApp groups.</li>
                </ul>
              </div>
            </div>

            {/* Right Column: Realistic Phone Mockup with Audio/Video Bubbles */}
            <div className="lg:col-span-7 flex justify-center">
              <div className="w-full max-w-md bg-white rounded-3xl border-4 border-slate-800 shadow-2xl overflow-hidden flex flex-col h-[700px]">
                {/* Speaker Notch */}
                <div className="bg-slate-800 py-1 flex justify-center items-center">
                  <div className="w-16 h-1 rounded-full bg-slate-600" />
                </div>

                {/* Chat App Header */}
                <div
                  className={`px-4 py-3 text-white flex items-center justify-between transition-colors ${
                    chatPlatform === 'whatsapp' ? 'bg-[#075E54]' : 'bg-[#0084FF]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm shadow-xs border border-white/30">
                      🇳🇬
                    </div>
                    <div>
                      <div className="font-bold text-sm flex items-center gap-1.5">
                        <span>DebunkAI Nigeria 2027</span>
                        <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded font-mono">BOT</span>
                      </div>
                      <div className="text-[11px] text-white/80 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Online • Electoral & Media Forensics</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-white/90">
                    <Phone className="w-4 h-4 cursor-pointer hover:opacity-80" />
                    <Video className="w-4 h-4 cursor-pointer hover:opacity-80" />
                    <MoreVertical className="w-4 h-4 cursor-pointer hover:opacity-80" />
                  </div>
                </div>

                {/* Messages Body */}
                <div
                  ref={chatScrollRef}
                  className={`flex-1 p-3 overflow-y-auto space-y-3 ${
                    chatPlatform === 'whatsapp'
                      ? 'bg-[#EFEAE2] bg-opacity-95'
                      : 'bg-slate-50'
                  }`}
                  style={{
                    backgroundImage:
                      chatPlatform === 'whatsapp'
                        ? 'radial-gradient(#d1d7db 1px, transparent 1px)'
                        : 'none',
                    backgroundSize: '16px 16px',
                  }}
                >
                  {/* Notice Pill */}
                  <div className="flex justify-center">
                    <span className="px-3 py-1 rounded-lg bg-black/10 text-slate-800 text-[10px] font-medium text-center max-w-[90%] backdrop-blur-xs flex items-center justify-center gap-1.5 flex-wrap">
                      <span className="font-extrabold text-amber-900 bg-amber-200/90 px-1.5 py-0.2 rounded border border-amber-300">
                        🛡️ Verify before you share
                      </span>
                      <span className="text-slate-600">Cross-referenced with INEC & Peace Accords.</span>
                    </span>
                  </div>

                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${
                        msg.sender === 'user' ? 'items-end' : 'items-start'
                      }`}
                    >
                      <div
                        className={`max-w-[88%] rounded-2xl p-3 shadow-xs text-xs leading-relaxed ${
                          msg.sender === 'user'
                            ? chatPlatform === 'whatsapp'
                              ? 'bg-[#D9FDD3] text-slate-900 rounded-tr-xs border border-[#C0EBA6]'
                              : 'bg-[#0084FF] text-white rounded-tr-xs'
                            : 'bg-white text-slate-900 rounded-tl-xs border border-slate-200/80'
                        }`}
                      >
                        {/* Forwarded Header */}
                        {msg.isForwarded && (
                          <div
                            className={`flex items-center gap-1 text-[10px] mb-1.5 italic font-medium ${
                              msg.sender === 'user' && chatPlatform === 'facebook'
                                ? 'text-white/80'
                                : 'text-slate-500'
                            }`}
                          >
                            <Share2 className="w-3 h-3" />
                            <span>Forwarded Many Times</span>
                          </div>
                        )}

                        {/* Audio Voice Note Bubble Display */}
                        {msg.mediaType === 'audio' && (
                          <div className="mb-2 p-2 rounded-xl bg-black/5 border border-black/10 flex items-center gap-3">
                            <button
                              onClick={() => {
                                if (playingAudioId === msg.id) {
                                  setPlayingAudioId(null);
                                } else {
                                  setPlayingAudioId(msg.id);
                                }
                              }}
                              className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs flex-shrink-0 hover:bg-emerald-700 transition"
                            >
                              {playingAudioId === msg.id ? (
                                <Pause className="w-4 h-4" />
                              ) : (
                                <Play className="w-4 h-4 ml-0.5" />
                              )}
                            </button>

                            <div className="flex-1">
                              <div className="flex items-center justify-between text-[10px] font-bold text-slate-700 mb-1">
                                <span className="flex items-center gap-1">
                                  <Mic className="w-3 h-3 text-emerald-600" />
                                  <span>{msg.mediaTitle || 'Voice Note'}</span>
                                </span>
                                <span>{msg.audioDuration || '0:42'}</span>
                              </div>
                              {/* Audio Waveform visualization */}
                              <div className="flex items-center gap-0.5 h-3">
                                {[30, 70, 45, 90, 60, 40, 85, 50, 75, 95, 40, 65, 80, 50, 30].map(
                                  (h, idx) => {
                                    const isPlayed = (idx / 15) * 100 <= (playingAudioId === msg.id ? audioProgress : 0);
                                    return (
                                      <div
                                        key={idx}
                                        className={`w-1 rounded-full transition-colors ${
                                          isPlayed ? 'bg-emerald-600' : 'bg-slate-300'
                                        }`}
                                        style={{ height: `${h}%` }}
                                      />
                                    );
                                  }
                                )}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Video Clip Bubble Display */}
                        {msg.mediaType === 'video' && (
                          <div className="mb-2 rounded-xl overflow-hidden border border-black/10 bg-slate-900 text-white relative">
                            <div className="h-28 bg-gradient-to-br from-slate-800 to-slate-950 flex flex-col items-center justify-center p-3 text-center relative">
                              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center mb-1 text-white shadow-md">
                                <Play className="w-5 h-5 ml-0.5" />
                              </div>
                              <span className="text-[11px] font-bold truncate max-w-[90%]">
                                {msg.mediaTitle || 'Viral Video Clip'}
                              </span>
                              <span className="text-[9px] text-slate-300">
                                Visual Forensics Inspection Ready
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Image Attachment Bubble Display */}
                        {msg.mediaType === 'image' && (
                          <div className="mb-2 rounded-xl overflow-hidden border border-black/10 bg-slate-100">
                            {msg.imagePreviewUrl ? (
                              <img
                                src={msg.imagePreviewUrl}
                                alt={msg.mediaTitle || 'Uploaded screenshot'}
                                className="w-full max-h-44 object-contain bg-slate-900/5"
                              />
                            ) : (
                              <div className="h-24 flex flex-col items-center justify-center bg-indigo-50 text-indigo-800 p-2">
                                <ImageIcon className="w-6 h-6 mb-1" />
                                <span className="text-[10px] font-bold">{msg.mediaTitle || 'Forwarded Image'}</span>
                              </div>
                            )}
                            {msg.mediaTitle && (
                              <div className="px-2.5 py-1 bg-black/5 text-[10px] font-semibold text-slate-700 flex items-center justify-between gap-2">
                                <span className="truncate flex items-center gap-1">
                                  <ImageIcon className="w-3 h-3 text-indigo-600 flex-shrink-0" />
                                  {msg.mediaTitle}
                                </span>
                                <span className="text-[9px] text-indigo-700 font-bold">OCR Ready</span>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Message Text */}
                        {msg.text && (
                          <div className="whitespace-pre-wrap font-sans text-[12px]">
                            {msg.text}
                          </div>
                        )}

                        {/* Interactive Debunk Badge if present on bot msg */}
                        {msg.debunkResult && (
                          <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-col gap-1.5">
                            <div className="flex flex-wrap items-center justify-between gap-1">
                              <div className="flex items-center gap-1 flex-wrap">
                                <span
                                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                    msg.debunkResult.verdict === 'Verified True'
                                      ? 'bg-emerald-100 text-emerald-800'
                                      : msg.debunkResult.verdict === 'Disinformation'
                                      ? 'bg-rose-100 text-rose-800'
                                      : 'bg-amber-100 text-amber-900'
                                  }`}
                                >
                                  {msg.debunkResult.verdict}
                                  {msg.debunkResult.verdict !== 'Unverified — insufficient evidence'
                                    ? ` (${msg.debunkResult.credibilityScore}%)`
                                    : ''}
                                </span>
                                {msg.debunkResult.localEvidenceGapAnalysis && (
                                  <span
                                    className={`px-1.5 py-0.5 rounded text-[9px] font-bold border ${
                                      msg.debunkResult.localEvidenceGapAnalysis.indicatorColor === 'green'
                                        ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                                        : msg.debunkResult.localEvidenceGapAnalysis.indicatorColor === 'red'
                                        ? 'bg-rose-50 text-rose-900 border-rose-300'
                                        : 'bg-amber-50 text-amber-950 border-amber-300'
                                    }`}
                                  >
                                    {msg.debunkResult.localEvidenceGapAnalysis.indicatorColor === 'green'
                                      ? '🟢 Evidence Supports'
                                      : msg.debunkResult.localEvidenceGapAnalysis.indicatorColor === 'red'
                                      ? '🔴 Contradicted'
                                      : `🟡 Gaps Remain (${msg.debunkResult.localEvidenceGapAnalysis.confidenceAssessment.evidenceConfidenceScore}% Evid.)`}
                                  </span>
                                )}
                                {msg.debunkResult.coordinatedCampaignAnalysis?.isCoordinatedPattern && (
                                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-purple-100 text-purple-900 border border-purple-200">
                                    🤖 Coordinated Campaign
                                  </span>
                                )}
                                {msg.debunkResult.fimiAnalysis?.isFimiRisk && (
                                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-100 text-amber-950 border border-amber-300">
                                    🌍 FIMI Precedent Matched
                                  </span>
                                )}
                                {msg.debunkResult.mediaType === 'image' && (
                                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-indigo-100 text-indigo-900 border border-indigo-200">
                                    🖼️ Image Forensics
                                  </span>
                                )}
                                {msg.debunkResult.urlVetReport?.hasLinks && (
                                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold border ${
                                    msg.debunkResult.urlVetReport.overallThreatLevel === 'HIGH_RISK'
                                      ? 'bg-rose-100 text-rose-950 border-rose-300'
                                      : msg.debunkResult.urlVetReport.overallThreatLevel === 'SAFE'
                                      ? 'bg-emerald-100 text-emerald-950 border-emerald-300'
                                      : 'bg-amber-100 text-amber-950 border-amber-300'
                                  }`}>
                                    🛡️ url.vet: {msg.debunkResult.urlVetReport.overallThreatLevel === 'HIGH_RISK' ? 'High Risk' : msg.debunkResult.urlVetReport.overallThreatLevel === 'SAFE' ? 'Safe' : 'Suspicious'}
                                  </span>
                                )}
                              </div>

                              <button
                                onClick={() => {
                                  const textToCopy =
                                    msg.debunkResult?.electionDepthAnalysis?.nigerianContextReply ||
                                    msg.debunkResult!.easyReply;
                                  navigator.clipboard.writeText(textToCopy);
                                  setCopiedReply(true);
                                  setTimeout(() => setCopiedReply(false), 2000);
                                }}
                                className="text-[10px] text-emerald-700 font-bold hover:underline flex items-center gap-1"
                              >
                                {copiedReply ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                                <span>{copiedReply ? 'Copied!' : 'Copy Reply'}</span>
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Timestamp */}
                        <div
                          className={`text-[9px] mt-1 flex items-center justify-end gap-1 ${
                            msg.sender === 'user' && chatPlatform === 'facebook'
                              ? 'text-white/70'
                              : 'text-slate-400'
                          }`}
                        >
                          <span>{msg.time}</span>
                          {msg.sender === 'user' && (
                            <span className="text-blue-500 font-bold">✓✓</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isBotTyping && (
                    <div className="flex items-start">
                      <div className="bg-white rounded-2xl rounded-tl-xs px-3.5 py-2.5 shadow-xs border border-slate-200 flex items-center gap-2">
                        <span className="text-[11px] text-slate-600 font-semibold">
                          Gemma 4 is checking INEC records & media forensics...
                        </span>
                        <div className="flex gap-1 items-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" />
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]" />
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Media Selector Bar */}
                <div className="px-3 py-1.5 bg-slate-200/80 border-t border-slate-300 flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-slate-600 font-semibold">Modality:</span>
                    <button
                      type="button"
                      onClick={() => setChatMediaType('text')}
                      className={`px-2 py-0.5 rounded font-bold transition ${
                        chatMediaType === 'text'
                          ? 'bg-white text-emerald-800 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      📝 Text
                    </button>
                    <button
                      type="button"
                      onClick={() => setChatMediaType('image')}
                      className={`px-2 py-0.5 rounded font-bold transition ${
                        chatMediaType === 'image'
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      🖼️ Image
                    </button>
                    <button
                      type="button"
                      onClick={() => setChatMediaType('audio')}
                      className={`px-2 py-0.5 rounded font-bold transition ${
                        chatMediaType === 'audio'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      🎙️ Voice
                    </button>
                    <button
                      type="button"
                      onClick={() => setChatMediaType('video')}
                      className={`px-2 py-0.5 rounded font-bold transition ${
                        chatMediaType === 'video'
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      🎬 Video
                    </button>
                  </div>
                </div>

                {/* Attached Image Thumbnail Preview Strip */}
                {chatImage && (
                  <div className="px-3 py-2 bg-indigo-50 border-t border-indigo-200 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <img
                        src={chatImage.previewUrl}
                        alt={chatImage.fileName}
                        className="w-10 h-10 rounded-lg object-cover border border-indigo-300 bg-white flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-[11px] font-bold text-indigo-950 truncate">{chatImage.fileName}</p>
                        <p className="text-[10px] text-indigo-700">Screenshot attached • Ready to scan</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setChatImage(null)}
                      className="p-1 rounded-full hover:bg-indigo-200/70 text-indigo-800 transition"
                      title="Remove image"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Chat Input Bar */}
                <div className="p-2.5 bg-slate-100 border-t border-slate-200">
                  <input
                    ref={chatFileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      handleChatImageSelected(e.target.files?.[0]);
                      e.target.value = '';
                    }}
                  />
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendChatMessage();
                    }}
                    className="flex items-center gap-2"
                  >
                    <button
                      type="button"
                      onClick={() => chatFileInputRef.current?.click()}
                      disabled={isBotTyping}
                      title="Attach photo or screenshot (PNG, JPG, WEBP)"
                      className={`w-9 h-9 rounded-full flex items-center justify-center border transition flex-shrink-0 ${
                        chatImage
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50 hover:text-indigo-700'
                      }`}
                    >
                      <ImageIcon className="w-4 h-4" />
                    </button>

                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onPaste={(e) => {
                        const items = e.clipboardData?.items;
                        if (!items) return;
                        for (let i = 0; i < items.length; i++) {
                          if (items[i].type.startsWith('image/')) {
                            const file = items[i].getAsFile();
                            if (file) {
                              e.preventDefault();
                              handleChatImageSelected(file);
                              break;
                            }
                          }
                        }
                      }}
                      placeholder={
                        chatImage
                          ? 'Optional caption or press Send to inspect image...'
                          : chatMediaType === 'image'
                          ? 'Attach/paste screenshot or add caption...'
                          : chatMediaType === 'audio'
                          ? 'Paste audio transcript or voice note summary...'
                          : chatMediaType === 'video'
                          ? 'Paste viral video claim, TikTok or tweet caption...'
                          : 'Paste message or Ctrl+V a screenshot...'
                      }
                      disabled={isBotTyping}
                      className="flex-1 bg-white border border-slate-300 rounded-full px-4 py-2 text-xs text-slate-800 placeholder:text-slate-400 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 disabled:opacity-50"
                    />

                    <button
                      type="submit"
                      disabled={isBotTyping || (!chatInput.trim() && !chatImage)}
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-white shadow-xs transition flex-shrink-0 ${
                        isBotTyping || (!chatInput.trim() && !chatImage)
                          ? 'bg-slate-300 cursor-not-allowed'
                          : chatPlatform === 'whatsapp'
                          ? 'bg-[#00A884] hover:bg-[#075E54]'
                          : 'bg-[#0084FF] hover:bg-blue-600'
                      }`}
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: WEB FACT-CHECKER (AUDIO RECORDER & VIDEO PLAYER)       */}
        {/* ============================================================== */}
        {activeTab === 'web' && (
          <div className="space-y-6">
            {/* Input Form Card with Media Mode Switcher */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                      <Vote className="w-5 h-5 text-emerald-600" />
                      <span>Nigerian 2027 Election & Viral Claims Analyzer</span>
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-[10px] font-extrabold uppercase tracking-wide flex items-center gap-1 shadow-2xs">
                      <ShieldCheck className="w-3 h-3 text-amber-700" />
                      Verify before you share
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Audit text, images/screenshots, voice notes, or video clips with Gemma 4
                  </p>
                </div>

                {/* Modality Selector Tabs */}
                <div className="flex flex-wrap items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs gap-1">
                  <button
                    onClick={() => {
                      setWebMediaType('text');
                      setActiveMediaPreview(null);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition ${
                      webMediaType === 'text'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5 text-blue-600" />
                    <span>Text Claim</span>
                  </button>

                  <button
                    onClick={() => setWebMediaType('image')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition ${
                      webMediaType === 'image'
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Image / Screenshot</span>
                  </button>

                  <button
                    onClick={() => setWebMediaType('audio')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition ${
                      webMediaType === 'audio'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Mic className="w-3.5 h-3.5" />
                    <span>Voice Note</span>
                  </button>

                  <button
                    onClick={() => setWebMediaType('video')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition ${
                      webMediaType === 'video'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Video Clip</span>
                  </button>
                </div>
              </div>

              {/* Image Upload / Dropzone / Preview Box */}
              {(webMediaType === 'image' || webImage) && (
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDraggingImage(true);
                  }}
                  onDragLeave={() => setIsDraggingImage(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDraggingImage(false);
                    const file = e.dataTransfer?.files?.[0];
                    if (file) handleWebImageSelected(file);
                  }}
                  className={`mb-4 p-4 rounded-xl border-2 border-dashed transition ${
                    isDraggingImage
                      ? 'bg-indigo-100/80 border-indigo-500'
                      : 'bg-indigo-50/70 border-indigo-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs flex-shrink-0">
                        <ImageIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-indigo-950">
                          Image, Screenshot &amp; Form EC8A Forensics
                        </h4>
                        <p className="text-[11px] text-indigo-800">
                          Upload, drag &amp; drop, or paste (Ctrl+V) any photo, WhatsApp screenshot, or tally sheet (PNG, JPG, WEBP)
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer transition shadow-xs">
                        <Upload className="w-4 h-4" />
                        <span>{webImage ? 'Change Image' : 'Upload Image'}</span>
                        <input
                          ref={webFileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            handleWebImageSelected(e.target.files?.[0]);
                            e.target.value = '';
                          }}
                        />
                      </label>
                      {webImage && (
                        <button
                          type="button"
                          onClick={() => {
                            setWebImage(null);
                            if (activeMediaPreview?.type === 'image') setActiveMediaPreview(null);
                          }}
                          className="px-2.5 py-2 rounded-xl text-xs font-bold bg-white border border-indigo-200 text-indigo-800 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 transition"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>

                  {webImage && (
                    <div className="mt-3 pt-3 border-t border-indigo-200 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                      <img
                        src={webImage.previewUrl}
                        alt={webImage.fileName}
                        className="max-h-40 rounded-xl border border-indigo-300 bg-white shadow-xs object-contain"
                      />
                      <div className="text-xs text-indigo-950 space-y-1">
                        <p className="font-bold flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>{webImage.fileName}</span>
                        </p>
                        <p className="text-[11px] text-indigo-800">
                          Ready for OCR text/URL extraction, Form EC8A number checks, cloned news graphic checks, and AI-artifact inspection.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Audio Mode Recording / Upload Box */}
              {webMediaType === 'audio' && (
                <div className="mb-4 p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                        <FileAudio className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-emerald-950">
                          WhatsApp Audio / Voice Note Forensics
                        </h4>
                        <p className="text-[11px] text-emerald-800">
                          Record a voice note directly or test synthetic voice cloning detection
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={toggleRecording}
                        className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                          isRecording
                            ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        }`}
                      >
                        {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                        <span>
                          {isRecording ? `Recording (${recordedDuration}s)... Stop` : 'Record Voice Note'}
                        </span>
                      </button>
                    </div>
                  </div>

                  {activeMediaPreview?.type === 'audio' && (
                    <div className="mt-3 pt-3 border-t border-emerald-200 flex items-center justify-between gap-3 text-xs text-emerald-900">
                      <div className="flex items-center gap-2">
                        <Volume2 className="w-4 h-4 text-emerald-600" />
                        <span className="font-bold">{activeMediaPreview.title}</span>
                        <span className="text-[11px] text-emerald-700">({activeMediaPreview.duration})</span>
                      </div>
                      <span className="text-[11px] text-emerald-700 italic">
                        {activeMediaPreview.note}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Video Mode Upload / Inspection Box */}
              {webMediaType === 'video' && (
                <div className="mb-4 p-4 rounded-xl bg-blue-50/70 border border-blue-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                        <Video className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-blue-950">
                          Viral Video Clip & Deepfake Forensics
                        </h4>
                        <p className="text-[11px] text-blue-800">
                          Detect recycled past-election footage, altered lower-thirds, or AI lip-syncing
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white cursor-pointer transition">
                        <Upload className="w-4 h-4" />
                        <span>Upload Clip</span>
                        <input
                          type="file"
                          accept="video/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setWebInputText(
                                `Uploaded video clip (${file.name}): Video circulating on social media showing ballot paper handling.`
                              );
                              setActiveMediaPreview({
                                type: 'video',
                                title: file.name,
                                note: 'Video frames buffered. Visual facial landmarks and lower-third banners ready for inspection.',
                                duration: '0:35',
                              });
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>

                  {activeMediaPreview?.type === 'video' && (
                    <div className="mt-3 pt-3 border-t border-blue-200 flex items-center justify-between gap-3 text-xs text-blue-900">
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-blue-600" />
                        <span className="font-bold">{activeMediaPreview.title}</span>
                      </div>
                      <span className="text-[11px] text-blue-700 italic">
                        {activeMediaPreview.note}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Text Input Area */}
              <div className="mb-2">
                <textarea
                  rows={4}
                  value={webInputText}
                  onChange={(e) => setWebInputText(e.target.value)}
                  onPaste={(e) => {
                    const items = e.clipboardData?.items;
                    if (!items) return;
                    for (let i = 0; i < items.length; i++) {
                      if (items[i].type.startsWith('image/')) {
                        const file = items[i].getAsFile();
                        if (file) {
                          e.preventDefault();
                          handleWebImageSelected(file);
                          break;
                        }
                      }
                    }
                  }}
                  placeholder={
                    webMediaType === 'image' || webImage
                      ? 'Optional: Add the WhatsApp caption or context accompanying this image (or leave blank to inspect image alone)...'
                      : webMediaType === 'audio'
                      ? 'Transcript of the voice note or summary of what is spoken...'
                      : webMediaType === 'video'
                      ? 'Caption or description of the video clip (or pick a sample below)...'
                      : 'Paste forwarded message, tweet, URL, or Ctrl+V a screenshot to check...'
                  }
                  className="w-full p-3.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-800 text-sm leading-relaxed placeholder:text-slate-400 transition"
                />
                <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1.5 px-0.5">
                  <span className="flex items-center gap-1.5 text-indigo-700 font-medium">
                    <Link2 className="w-3.5 h-3.5" />
                    <span>url.vet Link Intelligence &amp; Image OCR active: Paste links or Ctrl+V screenshots</span>
                  </span>
                </div>
              </div>

              {/* Quick 1-Click Nigerian Election & FIMI Samples */}
              <div className="mt-3">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Vote className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Test with realistic Nigerian 2027 scenarios:</span>
                  </span>

                  <button
                    onClick={() => setShowFimiModal(true)}
                    className="text-xs text-amber-800 font-bold bg-amber-50 hover:bg-amber-100 border border-amber-200 px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition"
                  >
                    <Globe className="w-3.5 h-3.5 text-amber-600" />
                    <span>Browse Documented FIMI Archive ({DOCUMENTED_NIGERIA_FIMI_CASES.length})</span>
                  </button>
                </div>

                {/* Filter buttons */}
                <div className="flex flex-wrap items-center gap-1 mb-2.5">
                  <button
                    onClick={() => setSampleFilter('all')}
                    className={`px-2.5 py-1 rounded-md text-xs font-bold transition ${
                      sampleFilter === 'all'
                        ? 'bg-slate-800 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    All ({NIGERIAN_ELECTION_SAMPLES.length})
                  </button>
                  <button
                    onClick={() => setSampleFilter('urlvet')}
                    className={`px-2.5 py-1 rounded-md text-xs font-bold transition flex items-center gap-1 ${
                      sampleFilter === 'urlvet'
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-indigo-50 text-indigo-800 border border-indigo-200 hover:bg-indigo-100'
                    }`}
                  >
                    <span>🛡️ url.vet Link Scans</span>
                  </button>
                  <button
                    onClick={() => setSampleFilter('fimi')}
                    className={`px-2.5 py-1 rounded-md text-xs font-bold transition flex items-center gap-1 ${
                      sampleFilter === 'fimi'
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
                    }`}
                  >
                    <span>🌍 Documented FIMI Cases</span>
                  </button>
                  <button
                    onClick={() => setSampleFilter('election')}
                    className={`px-2.5 py-1 rounded-md text-xs font-bold transition flex items-center gap-1 ${
                      sampleFilter === 'election'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                    }`}
                  >
                    <span>🇳🇬 INEC & Electoral Act</span>
                  </button>
                  <button
                    onClick={() => setSampleFilter('cib')}
                    className={`px-2.5 py-1 rounded-md text-xs font-bold transition flex items-center gap-1 ${
                      sampleFilter === 'cib'
                        ? 'bg-purple-600 text-white shadow-xs'
                        : 'bg-purple-50 text-purple-800 border border-purple-200 hover:bg-purple-100'
                    }`}
                  >
                    <span>🤖 Cloned Media & Copypasta</span>
                  </button>
                  <button
                    onClick={() => setSampleFilter('media')}
                    className={`px-2.5 py-1 rounded-md text-xs font-bold transition flex items-center gap-1 ${
                      sampleFilter === 'media'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-blue-50 text-blue-800 border border-blue-200 hover:bg-blue-100'
                    }`}
                  >
                    <span>🖼️ Image / 🎬 Video / 🎙️ Voice</span>
                  </button>
                  <button
                    onClick={() => setSampleFilter('gaps')}
                    className={`px-2.5 py-1 rounded-md text-xs font-bold transition flex items-center gap-1 ${
                      sampleFilter === 'gaps'
                        ? 'bg-amber-500 text-slate-950 shadow-xs'
                        : 'bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100'
                    }`}
                  >
                    <span>🟡 Local Gaps &amp; Hausa</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {NIGERIAN_ELECTION_SAMPLES.filter(
                    (sample) => sampleFilter === 'all' || sample.group === sampleFilter
                  ).map((sample) => (
                    <button
                      key={sample.id}
                      onClick={() => {
                        setWebInputText(sample.text);
                        setWebMediaType(sample.type);
                        const sampleImg = sample.type === 'image' ? createSimulatedEc8aImage() : null;
                        setWebImage(sampleImg);
                        setActiveMediaPreview(
                          sample.type !== 'text'
                            ? {
                                type: sample.type,
                                title: sample.title,
                                note:
                                  sample.type === 'audio'
                                    ? (sample as any).audioNote
                                    : sample.type === 'video'
                                    ? (sample as any).videoNote
                                    : (sample as any).imageNote,
                                duration: sample.duration,
                              }
                            : null
                        );
                        handleWebAnalyze(sample.text, sample.type, sampleImg);
                      }}
                      className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-800 text-slate-700 font-medium transition text-left flex items-center gap-1.5"
                    >
                      <span>{sample.title}</span>
                      <span className="text-[10px] text-slate-400 font-mono">({sample.badge})</span>
                    </button>
                  ))}
                </div>
              </div>

              {webErrorMsg && (
                <div className="mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                  <span>{webErrorMsg}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-slate-500">
                  {webImage
                    ? `Image attached: ${webImage.fileName}${webInputText.length > 0 ? ` + ${webInputText.length} chars` : ''}`
                    : webInputText.length > 0
                    ? `${webInputText.length} characters`
                    : 'No text or image entered'}
                </div>

                <div className="flex items-center gap-2">
                  {history.length > 0 && (
                    <button
                      onClick={() => setShowHistory(!showHistory)}
                      className="px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition"
                    >
                      <History className="w-3.5 h-3.5" />
                      <span>Recent ({history.length})</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleWebAnalyze()}
                    disabled={isWebLoading || (!webInputText.trim() && !webImage)}
                    className={`px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 text-white shadow-sm transition ${
                      isWebLoading || (!webInputText.trim() && !webImage)
                        ? 'bg-emerald-300 cursor-not-allowed'
                        : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20 cursor-pointer active:scale-98'
                    }`}
                  >
                    {isWebLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>{webLoadingStage}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Run Gemma 4 High-Depth Audit</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* In-depth Result Display */}
            {webResult && (
              <div className="space-y-6">
                {/* Verdict Card */}
                {(() => {
                  const theme = getVerdictTheme(webResult.verdict);
                  return (
                    <div className={`rounded-2xl border p-6 shadow-sm ${theme.bg}`}>
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-black/10">
                        <div className="flex items-center gap-3">
                          {theme.icon}
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              {webResult.isNigerianElection && (
                                <span className="px-2.5 py-0.5 rounded-md bg-emerald-700 text-white text-[11px] font-bold">
                                  🇳🇬 2027 Election Audit
                                </span>
                              )}
                              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${theme.badge}`}>
                                {webResult.verdict}
                              </span>
                              <span className="font-bold text-base text-slate-800">
                                {webResult.verdictLabel}
                              </span>
                            </div>
                            <p className="mt-1 text-xs text-slate-500">
                              Audited with {webResult.modelUsed} via {webResult.providerUsed.toUpperCase()}
                            </p>
                          </div>
                        </div>

                        {/* Credibility Gauge */}
                        <div className="bg-white/80 backdrop-blur-xs border border-black/10 rounded-xl p-3 min-w-[180px]">
                          <div className="flex items-center justify-between text-xs font-semibold mb-1">
                            <span className="text-slate-600">Credibility Score</span>
                            <span className="text-slate-900 font-extrabold">{webResult.credibilityScore}%</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${theme.barColor}`}
                              style={{ width: `${Math.max(webResult.credibilityScore, 4)}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Summary */}
                      <div className="mt-4">
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                          Verdict in Plain Words
                        </h4>
                        <p className="mt-1 text-base sm:text-lg font-semibold text-slate-900 leading-snug">
                          {webResult.summary}
                        </p>
                      </div>

                      <div className="mt-3 p-3 rounded-xl bg-white/60 border border-black/5 text-xs text-slate-700">
                        <strong>Categorization Reason: </strong>
                        <span>{webResult.categoryExplanation}</span>
                      </div>
                    </div>
                  );
                })()}

                {/* Dedicated Section: Local Evidence Gap Analysis */}
                {webResult.localEvidenceGapAnalysis && (() => {
                  const gap = webResult.localEvidenceGapAnalysis;
                  const conf = gap.confidenceAssessment;
                  const isGreen = gap.indicatorColor === 'green';
                  const isRed = gap.indicatorColor === 'red';
                  const containerTheme = isGreen
                    ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                    : isRed
                    ? 'bg-rose-50/70 border-rose-300 text-rose-950'
                    : 'bg-amber-50/80 border-amber-300 text-amber-950';
                  const pillTheme = isGreen
                    ? 'bg-emerald-600 text-white'
                    : isRed
                    ? 'bg-rose-600 text-white'
                    : 'bg-amber-500 text-slate-950';
                  const dotTheme = isGreen
                    ? 'bg-emerald-500'
                    : isRed
                    ? 'bg-rose-500'
                    : 'bg-amber-500';

                  return (
                    <section
                      aria-label="Local Evidence Gap Analysis"
                      className={`rounded-2xl border p-5 sm:p-6 shadow-xs space-y-5 ${containerTheme}`}
                    >
                      {/* Section Header & Traffic-Light Indicator */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-black/10">
                        <div className="flex items-start gap-2.5">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${pillTheme} shadow-xs`}>
                            <Compass className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="font-extrabold text-sm sm:text-base tracking-tight">
                                Local Evidence Gap Analysis
                              </h3>
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${pillTheme}`}>
                                <span className={`w-2 h-2 rounded-full bg-white/90`} />
                                <span>
                                  {isGreen ? 'Green' : isRed ? 'Red' : 'Yellow'}: {gap.indicatorLabel}
                                </span>
                              </span>
                            </div>
                            <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] opacity-85">
                              <span className="inline-flex items-center gap-1 bg-white/80 px-2 py-0.5 rounded border border-black/10 font-semibold">
                                <Globe className="w-3 h-3" />
                                Language: {gap.detectedLanguage}
                              </span>
                              <span className="inline-flex items-center gap-1 bg-white/80 px-2 py-0.5 rounded border border-black/10 font-semibold">
                                <MapPin className="w-3 h-3" />
                                Scope: {gap.geographicFocus}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Epistemic Conclusion Callout */}
                      <div className="p-3.5 rounded-xl bg-white border border-black/10 flex items-start gap-2.5 text-xs">
                        <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1 ${dotTheme}`} />
                        <div>
                          <strong className="text-slate-900 block mb-0.5">Epistemic Assessment &amp; Conclusion</strong>
                          <p className="text-slate-800 font-medium leading-relaxed">{gap.epistemicConclusion}</p>
                        </div>
                      </div>

                      {/* Dual Transparent Confidence Assessment */}
                      <div className="bg-white rounded-xl border border-black/10 p-4 space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                            Transparent Confidence Assessment (5-Factor Scoring)
                          </h4>
                          <span className="text-[11px] text-slate-500 font-medium">
                            Distinguishes evidence availability from verdict certainty
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                            <div className="flex items-center justify-between text-xs font-bold mb-1">
                              <span className="text-slate-700">Confidence in Available Evidence</span>
                              <span className="text-slate-950 font-mono">
                                {conf.evidenceConfidenceScore}/100 ({conf.evidenceConfidenceLabel})
                              </span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  conf.evidenceConfidenceScore >= 70
                                    ? 'bg-emerald-500'
                                    : conf.evidenceConfidenceScore >= 45
                                    ? 'bg-amber-500'
                                    : 'bg-amber-400'
                                }`}
                                style={{ width: `${Math.max(conf.evidenceConfidenceScore, 5)}%` }}
                              />
                            </div>
                          </div>

                          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                            <div className="flex items-center justify-between text-xs font-bold mb-1">
                              <span className="text-slate-700">Confidence in Assigned Verdict</span>
                              <span className="text-slate-950 font-mono">
                                {conf.verdictConfidenceScore}/100 ({conf.verdictConfidenceLabel})
                              </span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                              <div
                                className="h-full rounded-full bg-indigo-600"
                                style={{ width: `${Math.max(conf.verdictConfidenceScore, 5)}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* 5 Score Factors Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1">
                          {[
                            { label: 'Source Credibility', val: conf.factors.sourceCredibility },
                            { label: 'Evidence Relevance', val: conf.factors.evidenceRelevance },
                            { label: 'Corroboration', val: conf.factors.independentCorroboration },
                            { label: 'Completeness', val: conf.factors.evidenceCompleteness },
                            { label: 'Geo & Language', val: conf.factors.geographicAndLinguisticCoverage },
                          ].map((f) => (
                            <div key={f.label} className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-center">
                              <span className="block text-[10px] font-semibold text-slate-500 truncate">{f.label}</span>
                              <span className="block text-xs font-extrabold text-slate-900 font-mono mt-0.5">
                                {f.val} / 20
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="text-[11px] text-slate-700 space-y-1 pt-1 border-t border-slate-100 leading-relaxed">
                          <p>
                            <strong>How it is calculated:</strong> {conf.calculationExplanation}
                          </p>
                          <p>
                            <strong>Evidence vs. Verdict:</strong> {conf.distinctionNote}
                          </p>
                        </div>
                      </div>

                      {/* Evidence Found & Sources Consulted */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white rounded-xl border border-black/10 p-4 space-y-2">
                          <h4 className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                            <Search className="w-3.5 h-3.5 text-slate-600" />
                            <span>Evidence Found</span>
                          </h4>
                          <ul className="space-y-1.5 text-xs text-slate-700">
                            {gap.evidenceFound.map((item, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="font-bold text-slate-500">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-white rounded-xl border border-black/10 p-4 space-y-2">
                          <h4 className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                            <Database className="w-3.5 h-3.5 text-slate-600" />
                            <span>Sources Consulted</span>
                          </h4>
                          <ul className="space-y-2 text-xs">
                            {gap.sourcesConsulted.map((src, i) => (
                              <li key={i} className="p-2 rounded-lg bg-slate-50 border border-slate-100 space-y-0.5">
                                <div className="flex items-center justify-between gap-2">
                                  <span className="font-bold text-slate-800 text-[11px]">{src.name}</span>
                                  <span
                                    className={`px-1.5 py-0.2 rounded text-[9px] font-bold uppercase flex-shrink-0 ${
                                      src.status === 'checked_found'
                                        ? 'bg-emerald-100 text-emerald-800'
                                        : src.status === 'checked_no_match'
                                        ? 'bg-slate-200 text-slate-700'
                                        : 'bg-amber-100 text-amber-900'
                                    }`}
                                  >
                                    {src.status === 'checked_found'
                                      ? 'Match Found'
                                      : src.status === 'checked_no_match'
                                      ? 'No Match'
                                      : 'Unavailable'}
                                  </span>
                                </div>
                                {src.detail && <p className="text-[11px] text-slate-500 leading-snug">{src.detail}</p>}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Supporting vs Contradicting Evidence */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white rounded-xl border border-emerald-200 p-4 space-y-2">
                          <h4 className="text-xs font-extrabold text-emerald-900">
                            Evidence Supporting the Claim ({gap.evidenceSupportingClaim.length})
                          </h4>
                          {gap.evidenceSupportingClaim.length > 0 ? (
                            <ul className="space-y-1.5 text-xs text-slate-700">
                              {gap.evidenceSupportingClaim.map((ev, i) => (
                                <li key={i} className="flex items-start gap-1.5">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                                  <span>{ev}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-xs text-slate-500 italic">
                              No verified evidence currently confirms this claim.
                            </p>
                          )}
                        </div>

                        <div className="bg-white rounded-xl border border-rose-200 p-4 space-y-2">
                          <h4 className="text-xs font-extrabold text-rose-900">
                            Evidence Contradicting the Claim ({gap.evidenceContradictingClaim.length})
                          </h4>
                          {gap.evidenceContradictingClaim.length > 0 ? (
                            <ul className="space-y-1.5 text-xs text-slate-700">
                              {gap.evidenceContradictingClaim.map((ev, i) => (
                                <li key={i} className="flex items-start gap-1.5">
                                  <XCircle className="w-3.5 h-3.5 text-rose-600 flex-shrink-0 mt-0.5" />
                                  <span>{ev}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-xs text-slate-500 italic">
                              No verifiable contradicting evidence found (claim is not proven false).
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Missing Evidence & Recommended Next Verification Steps */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white rounded-xl border border-amber-200 p-4 space-y-2.5">
                          <h4 className="text-xs font-extrabold text-amber-950">
                            Missing Evidence (Local Evidence Gaps)
                          </h4>
                          {gap.missingEvidence.length > 0 ? (
                            <ul className="space-y-2 text-xs">
                              {gap.missingEvidence.map((m, i) => (
                                <li key={i} className="p-2.5 rounded-lg bg-amber-50/80 border border-amber-200 space-y-0.5">
                                  <div className="flex items-center justify-between gap-2">
                                    <span className="font-bold text-amber-950 text-[11px]">{m.label}</span>
                                    <span
                                      className={`px-1.5 py-0.2 rounded text-[9px] font-bold uppercase ${
                                        m.severity === 'high'
                                          ? 'bg-amber-200 text-amber-950'
                                          : 'bg-slate-100 text-slate-700'
                                      }`}
                                    >
                                      {m.severity} gap
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-slate-700 leading-snug">{m.description}</p>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-xs text-emerald-700 font-medium">
                              No critical local evidence gaps identified.
                            </p>
                          )}
                        </div>

                        <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-2.5">
                          <h4 className="text-xs font-extrabold text-slate-900">
                            Recommended Next Verification Steps
                          </h4>
                          <ul className="space-y-2 text-xs">
                            {gap.recommendedVerificationSteps.map((step, i) => (
                              <li key={i} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-0.5">
                                <span className="inline-block px-2 py-0.2 rounded bg-emerald-100 text-emerald-900 font-bold text-[10px]">
                                  {step.channel}
                                </span>
                                <p className="text-[11px] text-slate-700 leading-snug">{step.action}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </section>
                  );
                })()}

                {/* Media Forensics Card (Audio, Video, or Image) */}
                {webResult.mediaDetails && (
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                      {webResult.mediaType === 'audio' ? (
                        <Mic className="w-5 h-5 text-emerald-600" />
                      ) : webResult.mediaType === 'image' ? (
                        <ImageIcon className="w-5 h-5 text-indigo-600" />
                      ) : (
                        <Video className="w-5 h-5 text-blue-600" />
                      )}
                      <h3 className="font-bold text-slate-900 text-sm">
                        {webResult.mediaType === 'audio'
                          ? 'Audio Voice Note Forensic Inspection'
                          : webResult.mediaType === 'image'
                          ? 'Image & Screenshot Forensic Inspection'
                          : 'Video Clip & Deepfake Forensic Inspection'}
                      </h3>
                    </div>

                    {webResult.mediaDetails.audioForensics && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                          <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                            Voice Cloning / Deepfake Risk
                          </span>
                          <span className="font-extrabold text-sm text-rose-600">
                            {webResult.mediaDetails.audioForensics.voiceCloningRisk} Risk
                          </span>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                          <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                            Acoustic Markers
                          </span>
                          <span className="text-xs text-slate-700">
                            {webResult.mediaDetails.audioForensics.acousticMarkers.join(', ')}
                          </span>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                          <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                            Speaker Context
                          </span>
                          <span className="text-xs text-slate-700">
                            {webResult.mediaDetails.audioForensics.speakerContext}
                          </span>
                        </div>
                      </div>
                    )}

                    {webResult.mediaDetails.videoForensics && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                          <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                            Visual Manipulation Risk
                          </span>
                          <span className="font-extrabold text-sm text-rose-600">
                            {webResult.mediaDetails.videoForensics.deepfakeRisk} Risk
                          </span>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                          <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                            Visual Artifacts
                          </span>
                          <span className="text-xs text-slate-700">
                            {webResult.mediaDetails.videoForensics.visualMarkers.join(', ')}
                          </span>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                          <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                            Archival Footage Match
                          </span>
                          <span className="text-xs text-slate-700">
                            {webResult.mediaDetails.videoForensics.archivalFootageCheck}
                          </span>
                        </div>
                      </div>
                    )}

                    {webResult.mediaDetails.imageForensics && (
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                            <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                              Image Manipulation Risk
                            </span>
                            <span
                              className={`font-extrabold text-sm ${
                                webResult.mediaDetails.imageForensics.manipulationRisk === 'Authentic'
                                  ? 'text-emerald-600'
                                  : webResult.mediaDetails.imageForensics.manipulationRisk === 'Low'
                                  ? 'text-amber-600'
                                  : 'text-rose-600'
                              }`}
                            >
                              {webResult.mediaDetails.imageForensics.manipulationRisk}
                              {webResult.mediaDetails.imageForensics.manipulationRisk !== 'Authentic' ? ' Risk' : ''}
                            </span>
                          </div>
                          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                            <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                              Tampering / AI Markers
                            </span>
                            <span className="text-xs text-slate-700">
                              {webResult.mediaDetails.imageForensics.visualMarkers.join(', ')}
                            </span>
                          </div>
                          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                            <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                              Provenance &amp; Context Check
                            </span>
                            <span className="text-xs text-slate-700">
                              {webResult.mediaDetails.imageForensics.contextVerification}
                            </span>
                          </div>
                        </div>

                        {webResult.mediaDetails.imageForensics.extractedTextOrOcr && (
                          <div className="p-3 bg-indigo-50/70 rounded-xl border border-indigo-200">
                            <span className="text-[10px] font-bold text-indigo-800 uppercase block mb-1">
                              Extracted Image Text (OCR)
                            </span>
                            <p className="text-xs text-indigo-950 font-mono whitespace-pre-wrap">
                              {webResult.mediaDetails.imageForensics.extractedTextOrOcr}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Nigerian Election High-Depth Findings (If Election Post) */}
                {webResult.isNigerianElection && webResult.electionDepthAnalysis && (
                  <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-5 shadow-xs space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-emerald-200">
                      <Flag className="w-5 h-5 text-emerald-700" />
                      <h3 className="font-bold text-emerald-950 text-sm">
                        Electoral Authority Verification (INEC & Electoral Act 2022/2026)
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Statutory protocol */}
                      <div className="p-4 bg-white rounded-xl border border-emerald-100 space-y-1">
                        <span className="text-xs font-bold text-emerald-900 block">
                          🏛️ Statutory INEC Protocol
                        </span>
                        <p className="text-xs text-slate-700 leading-relaxed">
                          {webResult.electionDepthAnalysis.inecProtocolCheck}
                        </p>
                      </div>

                      {/* Peace & Security Impact */}
                      <div className="p-4 bg-white rounded-xl border border-emerald-100 space-y-1">
                        <span className="text-xs font-bold text-emerald-900 block">
                          🕊️ Peace & Security Impact Assessment
                        </span>
                        <p className="text-xs text-slate-700 leading-relaxed">
                          {webResult.electionDepthAnalysis.peaceAndTensionImpact}
                        </p>
                      </div>
                    </div>

                    {/* Official fact check coalition sources */}
                    <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
                      <span className="text-slate-600 font-semibold">Recommended Sources:</span>
                      {webResult.electionDepthAnalysis.officialFactCheckSources?.map((src, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-md bg-white border border-emerald-200 text-emerald-800 font-medium"
                        >
                          {src}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Coordinated Campaign & Bot Network Analysis (CIB) */}
                {webResult.coordinatedCampaignAnalysis && (
                  <div className={`rounded-2xl p-5 shadow-xs border space-y-4 ${
                    webResult.coordinatedCampaignAnalysis.isCoordinatedPattern
                      ? 'bg-purple-50/80 border-purple-200 text-purple-950'
                      : 'bg-white border-slate-200 text-slate-800'
                  }`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-black/10">
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-purple-700" />
                        <div>
                          <h3 className="font-bold text-sm text-purple-950">
                            Coordinated Misinformation & Bot Network Audit (CIB)
                          </h3>
                          <p className="text-[11px] text-purple-800">
                            Detects troll farms, copy-paste copypasta networks, and artificial broadcast amplification
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase ${
                          webResult.coordinatedCampaignAnalysis.coordinationRisk === 'High'
                            ? 'bg-rose-600 text-white'
                            : webResult.coordinatedCampaignAnalysis.coordinationRisk === 'Medium'
                            ? 'bg-amber-500 text-white'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {webResult.coordinatedCampaignAnalysis.coordinationRisk} Coordination Risk
                        </span>
                        <span className="text-xs font-mono font-semibold bg-white px-2 py-0.5 rounded border border-purple-200 text-purple-900">
                          {webResult.coordinatedCampaignAnalysis.campaignType}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3.5 bg-white rounded-xl border border-purple-100 space-y-2">
                        <span className="text-xs font-bold text-purple-950 block flex items-center gap-1.5">
                          <Network className="w-3.5 h-3.5 text-purple-600" />
                          Detected Inauthentic Signatures
                        </span>
                        <ul className="space-y-1.5 text-xs text-slate-700">
                          {webResult.coordinatedCampaignAnalysis.coordinationSignatures.map((sig, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-purple-600 font-bold">•</span>
                              <span>{sig}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-3.5 bg-white rounded-xl border border-purple-100 space-y-2">
                        <span className="text-xs font-bold text-purple-950 block">
                          Troll Farm / Dispersion Tactics
                        </span>
                        <p className="text-xs text-slate-700 leading-relaxed">
                          {webResult.coordinatedCampaignAnalysis.trollFarmTactics}
                        </p>
                        <div className="pt-1.5 border-t border-slate-100 text-[11px] text-slate-500">
                          <strong>Propagation Path: </strong>
                          <span>{webResult.coordinatedCampaignAnalysis.networkDispersionPattern}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-purple-200 text-xs flex items-start gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-purple-700 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-purple-950">How to Break the Coordinated Chain: </strong>
                        <span className="text-slate-700">{webResult.coordinatedCampaignAnalysis.recommendedCounterMeasure}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Foreign Information Manipulation & Interference (FIMI) Radar Card */}
                {webResult.fimiAnalysis && (
                  <div className={`rounded-2xl p-5 shadow-xs border space-y-4 ${
                    webResult.fimiAnalysis.isFimiRisk
                      ? 'bg-amber-50/80 border-amber-300 text-amber-950'
                      : 'bg-white border-slate-200 text-slate-800'
                  }`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-black/10">
                      <div className="flex items-center gap-2">
                        <Globe className="w-5 h-5 text-amber-700" />
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-bold text-sm text-amber-950">
                              Foreign Interference & PsyOps Analysis (FIMI)
                            </h3>
                            <span className="text-[10px] bg-amber-200/90 text-amber-900 px-2 py-0.5 rounded font-extrabold uppercase border border-amber-300">
                              Documented Nigerian Cases
                            </span>
                          </div>
                          <p className="text-[11px] text-amber-800">
                            Detects foreign state propaganda, mercenary narratives, and covert foreign political consultancies
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase ${
                          webResult.fimiAnalysis.fimiRiskLevel === 'High'
                            ? 'bg-rose-600 text-white'
                            : webResult.fimiAnalysis.fimiRiskLevel === 'Medium'
                            ? 'bg-amber-600 text-white'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {webResult.fimiAnalysis.fimiRiskLevel} FIMI Risk
                        </span>
                        <button
                          onClick={() => setShowFimiModal(true)}
                          className="text-xs font-semibold bg-white px-2.5 py-1 rounded-lg border border-amber-300 text-amber-900 hover:bg-amber-100 transition flex items-center gap-1 shadow-2xs cursor-pointer"
                        >
                          <span>Documented Archive</span>
                          <ChevronDown className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Plain Language Explainer */}
                    <div className="p-3 bg-amber-100/70 rounded-xl border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5">
                      <Info className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>What is FIMI in simple words? </strong>
                        <span>
                          Foreign Information Manipulation and Interference is when foreign powers, overseas troll farms, or foreign political consultancies secretly manipulate news and social media in Nigeria to divide our people, stir tension, or tamper with our elections.
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Foreign Actors and Geopolitical Intent */}
                      <div className="p-3.5 bg-white rounded-xl border border-amber-200 space-y-2">
                        <span className="text-xs font-bold text-amber-950 block">
                          🌍 Foreign Networks & Outside Geopolitical Intent
                        </span>
                        <div className="text-xs text-slate-700 space-y-2">
                          <div>
                            <strong className="text-slate-900">Suspected Network / Actors: </strong>
                            <span className="text-slate-800 font-medium">
                              {webResult.fimiAnalysis.foreignActorsOrNetworks.join(', ')}
                            </span>
                          </div>
                          <div className="pt-1.5 border-t border-slate-100">
                            <strong className="text-slate-900">Outside Objective: </strong>
                            <p className="mt-0.5 leading-relaxed text-slate-600">
                              {webResult.fimiAnalysis.geopoliticalObjective}
                            </p>
                          </div>
                          <div className="pt-1.5 border-t border-slate-100 text-[11px] text-amber-800">
                            <strong>Category: </strong>
                            <span>{webResult.fimiAnalysis.fimiCategory}</span>
                          </div>
                        </div>
                      </div>

                      {/* Documented Nigerian Case Precedents */}
                      <div className="p-3.5 bg-white rounded-xl border border-amber-200 space-y-2">
                        <span className="text-xs font-bold text-amber-950 flex items-center justify-between">
                          <span>📚 Matched Documented Nigerian Case Precedents</span>
                          <span className="text-[10px] text-amber-700 font-mono font-bold">
                            {webResult.fimiAnalysis.matchingDocumentedCases?.length || 0} Matched
                          </span>
                        </span>
                        {webResult.fimiAnalysis.matchingDocumentedCases && webResult.fimiAnalysis.matchingDocumentedCases.length > 0 ? (
                          <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                            {webResult.fimiAnalysis.matchingDocumentedCases.map((fCase) => (
                              <div key={fCase.id} className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-200 text-xs space-y-1">
                                <div className="flex items-center justify-between font-bold text-slate-900">
                                  <span className="text-amber-950">{fCase.caseTitle}</span>
                                  <span className="text-[10px] px-1.5 py-0.2 bg-white rounded border border-amber-200 text-amber-800 font-mono">
                                    {fCase.year}
                                  </span>
                                </div>
                                <p className="text-[11px] text-slate-600 leading-snug">
                                  {fCase.historicalSummary}
                                </p>
                                <div className="text-[10px] text-slate-500 pt-1 border-t border-amber-100">
                                  <strong>Documented By: </strong>
                                  <span className="italic">{fCase.documentedSource}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-slate-500 italic p-3 bg-slate-50 rounded-lg">
                            No specific foreign state playbook matched; evaluated as domestic or organic viral content.
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Sovereignty & Countermeasure */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 bg-white rounded-xl border border-amber-200 space-y-1">
                        <strong className="text-amber-950 flex items-center gap-1.5 font-bold">
                          <span>🛡️ Nigerian Democratic Sovereignty Impact</span>
                        </strong>
                        <p className="text-slate-700 leading-relaxed text-[11px]">
                          {webResult.fimiAnalysis.sovereigntyImpact}
                        </p>
                      </div>
                      <div className="p-3 bg-white rounded-xl border border-amber-200 space-y-1">
                        <strong className="text-amber-950 flex items-center gap-1.5 font-bold">
                          <span>💡 Citizen Protection & Verification Action</span>
                        </strong>
                        <p className="text-slate-700 leading-relaxed text-[11px]">
                          {webResult.fimiAnalysis.counterMeasure}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. url.vet Link Security & Phishing Intelligence Report */}
                {webResult.urlVetReport && webResult.urlVetReport.hasLinks && (
                  <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-900 text-white rounded-2xl p-5 sm:p-6 shadow-md border border-indigo-700/80 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-indigo-800">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl bg-indigo-600 border border-indigo-400/40 flex items-center justify-center font-bold text-white shadow-xs text-base">
                          🛡️
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-base font-extrabold tracking-tight text-white flex items-center gap-1.5">
                              <span>url.vet Link Security & Phishing Intelligence</span>
                            </h3>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                              Threat Intel Scan
                            </span>
                          </div>
                          <p className="text-[11px] text-indigo-200">
                            Automated domain vetting, cloned portal heuristics, and credential harvester detection
                          </p>
                        </div>
                      </div>

                      {(() => {
                        const lowestScore =
                          webResult.urlVetReport.analyzedUrls.length > 0
                            ? Math.min(...webResult.urlVetReport.analyzedUrls.map((u) => u.safetyScore))
                            : 100;
                        const isHighRisk = webResult.urlVetReport.overallThreatLevel === 'HIGH_RISK';
                        const isSafe = webResult.urlVetReport.overallThreatLevel === 'SAFE';

                        return (
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                                isHighRisk
                                  ? 'bg-rose-500/20 text-rose-300 border-rose-500'
                                  : isSafe
                                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500'
                                  : 'bg-amber-500/20 text-amber-300 border-amber-500'
                              }`}
                            >
                              {isHighRisk ? 'High Risk' : isSafe ? 'Safe' : 'Suspicious'}
                            </span>
                            <div className="px-3 py-1 rounded-xl bg-white/10 border border-white/20 text-right">
                              <span className="text-[10px] text-indigo-200 block">Safety Score</span>
                              <span
                                className={`text-sm font-extrabold font-mono ${
                                  lowestScore >= 80
                                    ? 'text-emerald-400'
                                    : lowestScore >= 50
                                    ? 'text-amber-400'
                                    : 'text-rose-400'
                                }`}
                              >
                                {lowestScore} / 100
                              </span>
                            </div>
                          </div>
                        );
                      })()}
                    </div>

                    {/* Plain Language Explainer */}
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs text-indigo-100 flex items-start gap-2.5">
                      <Info className="w-4 h-4 text-indigo-300 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white">What is url.vet vetting in simple words? </strong>
                        <span>
                          Political propagandists and fraudsters set up fake websites pretending to be INEC, news channels, or presidential grant programs. url.vet inspects the website infrastructure (age, country, SSL, typosquatting) before citizens get scammed or misinformed.
                        </span>
                      </div>
                    </div>

                    {/* Inspected Target Domains */}
                    <div className="space-y-3">
                      <span className="text-xs font-bold text-indigo-200 uppercase tracking-wider block">
                        🔗 Inspected Domains & Web Infrastructure ({webResult.urlVetReport.analyzedUrls.length})
                      </span>

                      <div className="grid grid-cols-1 gap-3">
                        {webResult.urlVetReport.analyzedUrls.map((target, idx) => (
                          <div
                            key={idx}
                            className="p-3.5 rounded-xl bg-slate-900/90 border border-indigo-700/60 text-xs space-y-2.5"
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <span className="font-mono font-bold text-white text-sm bg-black/40 px-2.5 py-0.5 rounded border border-white/10 flex items-center gap-1.5">
                                  <Link2 className="w-3.5 h-3.5 text-indigo-400" />
                                  <span>{target.normalizedDomain}</span>
                                </span>
                                {target.isOfficialDomain ? (
                                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                                    ✅ Official Verified Domain
                                  </span>
                                ) : (
                                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                                    ⚠️ Unofficial / Suspected Clone
                                  </span>
                                )}
                              </div>

                              <span className="text-[11px] text-slate-300 font-mono">
                                Threat: {target.threatType}
                              </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-[11px] pt-1">
                              <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                                <span className="text-slate-400 block text-[10px]">Domain Age</span>
                                <span className="text-white font-medium">{target.domainAgeEstimate}</span>
                              </div>
                              <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                                <span className="text-slate-400 block text-[10px]">Hosting / Country</span>
                                <span className="text-white font-medium">{target.hostingCountry}</span>
                              </div>
                              <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                                <span className="text-slate-400 block text-[10px]">SSL Security</span>
                                <span className="text-white font-medium truncate block" title={target.sslSecurity}>
                                  {target.sslSecurity}
                                </span>
                              </div>
                              <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                                <span className="text-slate-400 block text-[10px]">Redirect Risk</span>
                                <span
                                  className={`font-medium ${
                                    target.redirectRisk.startsWith('High') ? 'text-rose-400' : 'text-emerald-400'
                                  }`}
                                >
                                  {target.redirectRisk}
                                </span>
                              </div>
                            </div>

                            {target.impersonatedEntity && (
                              <div className="p-2.5 rounded-lg bg-rose-950/70 border border-rose-800 text-rose-200 text-xs flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                                <div>
                                  <strong className="text-white">Typosquatting Alert: </strong>
                                  <span>Mimicking official legitimate portal: </span>
                                  <span className="underline font-mono font-bold text-white">
                                    {target.impersonatedEntity}
                                  </span>
                                </div>
                              </div>
                            )}

                            {/* Individual Target Security Checks */}
                            {target.securityChecks && target.securityChecks.length > 0 && (
                              <div className="pt-2 border-t border-white/10 space-y-1.5">
                                <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider block">
                                  Domain Security Checks
                                </span>
                                {target.securityChecks.map((check, cIdx) => (
                                  <div
                                    key={cIdx}
                                    className="p-2 rounded-lg bg-white/5 flex items-start gap-2 text-[11px]"
                                  >
                                    <div className="flex-shrink-0 mt-0.5">
                                      {check.status === 'safe' ? (
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                      ) : check.status === 'danger' ? (
                                        <XCircle className="w-3.5 h-3.5 text-rose-400" />
                                      ) : (
                                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                                      )}
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center justify-between">
                                        <span className="font-bold text-white">{check.category}</span>
                                        <span
                                          className={`text-[9px] font-bold px-1.5 py-0.2 rounded font-mono uppercase ${
                                            check.status === 'safe'
                                              ? 'bg-emerald-500/20 text-emerald-300'
                                              : check.status === 'danger'
                                              ? 'bg-rose-500/20 text-rose-300'
                                              : 'bg-amber-500/20 text-amber-300'
                                          }`}
                                        >
                                          {check.status}
                                        </span>
                                      </div>
                                      <p className="text-indigo-200/90 mt-0.5 leading-snug">{check.finding}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Advice Box */}
                    <div className="p-3 bg-indigo-950/90 rounded-xl border border-indigo-700/70 text-xs flex items-start gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white">Citizen Action Guidance: </strong>
                        <span className="text-indigo-100">{webResult.urlVetReport.canonicalAdvice}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Claims vs Reality */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                    <h3 className="text-sm font-bold text-slate-900 mb-3">1. What This Post Claims</h3>
                    <ul className="space-y-2 text-xs text-slate-700">
                      {webResult.claimsExtracted.map((claim, idx) => (
                        <li key={idx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                          <span className="text-emerald-500 font-bold">•</span>
                          <span>{claim}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                    <h3 className="text-sm font-bold text-slate-900 mb-3">2. The Verified Reality</h3>
                    <div className="p-3 bg-emerald-50/60 border border-emerald-100 rounded-xl text-xs text-emerald-950 leading-relaxed">
                      {webResult.factualReality}
                    </div>
                  </div>
                </div>

                {/* Red Flags / Caution Signals */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                  <h3 className="text-sm font-bold text-slate-900 mb-3">
                    {webResult.verdict === 'Unverified — insufficient evidence'
                      ? 'Verification Caution Notes'
                      : webResult.verdict === 'Verified True'
                      ? 'Verification Status Notes'
                      : 'Red Flags Detected'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {webResult.redFlags.map((flag, idx) => {
                      const isInsufficient = webResult.verdict === 'Unverified — insufficient evidence';
                      const isTrue = webResult.verdict === 'Verified True';
                      return (
                        <span
                          key={idx}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-medium ${
                            isInsufficient
                              ? 'bg-amber-50 border-amber-200 text-amber-900'
                              : isTrue
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                              : 'bg-rose-50 border-rose-100 text-rose-800'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isInsufficient ? 'bg-amber-500' : isTrue ? 'bg-emerald-500' : 'bg-rose-500'
                            }`}
                          />
                          {flag}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* WhatsApp Community De-escalation Reply */}
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-5 shadow-xs">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <div>
                      <h3 className="text-sm font-bold text-emerald-950">
                        {webResult.isNigerianElection
                          ? 'Peaceful Nigerian Community Reply (Copy & Share)'
                          : 'How to Reply Politely in Chats'}
                      </h3>
                      <p className="text-[11px] text-emerald-800">
                        Send this to your WhatsApp family or community group to prevent panic without fighting
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        const textToCopy =
                          webResult.electionDepthAnalysis?.nigerianContextReply ||
                          webResult.easyReply;
                        navigator.clipboard.writeText(textToCopy);
                        setCopiedReply(true);
                        setTimeout(() => setCopiedReply(false), 2000);
                      }}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition"
                    >
                      {copiedReply ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedReply ? 'Copied!' : 'Copy Reply'}</span>
                    </button>
                  </div>

                  <div className="p-3 bg-white border border-emerald-100 rounded-xl text-xs sm:text-sm text-slate-800 italic leading-relaxed">
                    "{webResult.electionDepthAnalysis?.nigerianContextReply || webResult.easyReply}"
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: META SETUP & WEBHOOK INSPECTOR                         */}
        {/* ============================================================== */}
        {activeTab === 'setup' && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Settings className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-slate-900">
                    Connect to Live WhatsApp & Facebook Messenger
                  </h2>
                  <p className="text-xs text-slate-500">
                    Your Webhook endpoint processes text, voice notes, and video payloads
                  </p>
                </div>
              </div>

              {/* Webhook Connection Details */}
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Meta Webhook Callback URL:
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={webhookPublicUrl}
                      className="flex-1 bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-800 select-all"
                    />
                    <button
                      onClick={copyWebhookUrl}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition"
                    >
                      {copiedWebhookUrl ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedWebhookUrl ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Verify Token (Secret Password):
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={providerConfig?.metaVerifyToken || 'debunk_bot_token'}
                      className="flex-1 bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-800 select-all"
                    />
                    <button
                      onClick={copyVerifyToken}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition"
                    >
                      {copiedToken ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedToken ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Instant Webhook Ping Tester */}
              <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-slate-600">
                  Test simulated incoming Nigerian 2027 election audio voice notes through the live webhook:
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleTestWebhookPing('whatsapp')}
                    disabled={isPingingWebhook}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition disabled:opacity-50"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Ping WhatsApp Audio Webhook</span>
                  </button>

                  <button
                    onClick={() => handleTestWebhookPing('facebook')}
                    disabled={isPingingWebhook}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition disabled:opacity-50"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Ping Messenger Webhook</span>
                  </button>
                </div>
              </div>

              {pingStatus && (
                <div className="mt-3 p-3 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono text-slate-800">
                  {pingStatus}
                </div>
              )}
            </div>

            {/* Webhook Activity Logs */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Radio className="w-4 h-4 text-emerald-500 animate-pulse" />
                  <h3 className="font-bold text-slate-900 text-sm">
                    Live Webhook Activity Inspector
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    ({webhookLogs.length} events logged)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={loadWebhookLogs}
                    className="p-1 rounded hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition"
                    title="Refresh logs"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={async () => {
                      await fetch('/api/webhook/clear-logs', { method: 'POST' });
                      setWebhookLogs([]);
                    }}
                    className="text-xs text-rose-600 hover:underline flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Clear</span>
                  </button>
                </div>
              </div>

              {webhookLogs.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-400">
                  No webhook events received yet. Click "Ping WhatsApp Audio Webhook" above or send messages in the Chatbot Simulator to see live logs!
                </div>
              ) : (
                <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
                  {webhookLogs.map((log) => (
                    <div
                      key={log.id}
                      className="p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              log.platform === 'whatsapp'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {log.platform}
                          </span>
                          {log.mediaType && log.mediaType !== 'text' && (
                            <span className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 text-[10px] font-bold uppercase">
                              {log.mediaType === 'audio' ? '🎙️ Audio' : log.mediaType === 'image' ? '🖼️ Image' : '🎬 Video'}
                            </span>
                          )}
                          <span className="text-slate-500 font-mono text-[11px]">
                            Sender: {log.senderId}
                          </span>
                        </div>
                        <span className="text-slate-400 text-[10px]">{log.timestamp}</span>
                      </div>

                      <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-slate-800">
                        <span className="font-bold text-[11px] text-slate-500 block mb-0.5">Incoming Payload:</span>
                        <p className="line-clamp-2">{log.incomingText}</p>
                      </div>

                      {log.replyText && (
                        <div className="bg-white p-2.5 rounded-lg border border-emerald-100 text-emerald-950 font-mono text-[11px] whitespace-pre-wrap">
                          <span className="font-bold text-[11px] text-emerald-700 block mb-0.5 font-sans">
                            Gemma 4 Response Sent:
                          </span>
                          {log.replyText.slice(0, 260)}...
                        </div>
                      )}

                      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                        <span>
                          Verdict: <strong>{log.verdict || 'Processed'}</strong>
                        </span>
                        <span
                          className={`font-semibold ${
                            log.deliveryStatus === 'delivered'
                              ? 'text-emerald-600'
                              : log.deliveryStatus === 'simulated'
                              ? 'text-blue-600'
                              : 'text-slate-500'
                          }`}
                        >
                          Status: {log.deliveryStatus}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Smoke Test Modal */}
      {showSmokeModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 text-slate-100 border border-slate-800 rounded-2xl max-w-xl w-full p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-emerald-400" />
                <h3 className="font-mono text-sm font-bold text-white">Gemma 4 Smoke Test Runner</h3>
              </div>
              <button
                onClick={() => setShowSmokeModal(false)}
                className="text-slate-400 hover:text-white text-xs font-mono px-2 py-1 rounded bg-slate-800"
              >
                [Esc / Close]
              </button>
            </div>

            <div className="font-mono text-xs bg-black/60 p-4 rounded-xl border border-slate-800 space-y-3 max-h-[380px] overflow-y-auto">
              <div className="text-slate-400">
                &gt; Sending realistic viral claim through active provider...
              </div>

              {smokeLoading ? (
                <div className="flex items-center gap-2 text-amber-400 py-3">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Executing test on {providerConfig?.provider === 'local' ? 'Ollama' : 'Gemma 4 API'}...</span>
                </div>
              ) : smokeOutput ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Provider:</span>
                    <span className="text-white font-bold">{smokeOutput.config?.provider?.toUpperCase()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Model:</span>
                    <span className="text-blue-300 font-bold">
                      {smokeOutput.config?.geminiModel || smokeOutput.config?.ollamaModel}
                    </span>
                  </div>
                  {smokeOutput.durationMs && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Response Latency:</span>
                      <span className="text-slate-200">{smokeOutput.durationMs}ms</span>
                    </div>
                  )}

                  {smokeOutput.result && (
                    <div className="mt-3 p-3 bg-slate-800/80 rounded border border-slate-700 space-y-1.5">
                      <div className="text-emerald-400 font-bold">Verdict: {smokeOutput.result.verdict}</div>
                      <div className="text-slate-300 text-[11px]">{smokeOutput.result.summary}</div>
                      <div className="text-slate-400 text-[10px]">Reply: "{smokeOutput.result.easyReply}"</div>
                    </div>
                  )}

                  <div className="pt-2 border-t border-slate-800">
                    <span
                      className={`inline-block px-3 py-1 rounded font-bold ${
                        smokeOutput.status === 'PASS'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}
                    >
                      STATUS: {smokeOutput.status}
                    </span>
                    {smokeOutput.error && (
                      <div className="text-rose-400 text-[11px] mt-2">{smokeOutput.error}</div>
                    )}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                onClick={handleRunSmokeTest}
                disabled={smokeLoading}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-semibold disabled:opacity-50"
              >
                Re-run Test
              </button>
              <button
                onClick={() => setShowSmokeModal(false)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Documented FIMI Cases Knowledge Archive Modal */}
      {showFimiModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 border border-slate-200 rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-700 to-amber-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-white">
                    Documented Cases of FIMI in Nigeria
                  </h3>
                  <p className="text-xs text-amber-100">
                    Foreign Information Manipulation & Interference: Verified Investigations & Historical Precedents
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowFimiModal(false)}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
              >
                ✕
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4 flex-1">
              {/* Educational Banner */}
              <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 flex items-start gap-3">
                <Info className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-amber-950 font-bold mb-0.5">
                    What is FIMI and Why Does It Matter for Nigerian Elections?
                  </strong>
                  <p className="leading-relaxed text-slate-700">
                    Foreign Information Manipulation and Interference (FIMI) is when outside foreign actors (governments, intelligence fronts, mercenary groups, or overseas political consulting firms) covertly manipulate news, social media, and WhatsApp groups in Nigeria. Their goal is usually to inflame ethnic or religious fault lines, undermine trust in democratic institutions like INEC, or advance outside foreign interests.
                  </p>
                </div>
              </div>

              {/* Documented Cases List */}
              <div className="space-y-4">
                {DOCUMENTED_NIGERIA_FIMI_CASES.map((fimiCase, idx) => (
                  <div
                    key={fimiCase.id}
                    className="p-4 rounded-xl border border-slate-200 bg-white hover:border-amber-300 transition space-y-2.5 shadow-2xs"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 font-extrabold text-xs flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <h4 className="font-extrabold text-sm text-slate-900">
                          {fimiCase.caseTitle}
                        </h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-mono text-xs font-bold border border-amber-200">
                          Year: {fimiCase.year}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                        <strong className="text-slate-900 block mb-1">Perpetrators / Network Identified:</strong>
                        <span className="text-slate-700 leading-relaxed">{fimiCase.perpetrators}</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                        <strong className="text-slate-900 block mb-1">Documented Investigative Source:</strong>
                        <span className="text-slate-700 italic leading-relaxed">{fimiCase.documentedSource}</span>
                      </div>
                    </div>

                    <div className="text-xs text-slate-700 space-y-1.5 pt-1">
                      <div>
                        <strong className="text-slate-900">Tactics Used: </strong>
                        <span className="text-slate-700">{fimiCase.tacticsUsed}</span>
                      </div>
                      <div>
                        <strong className="text-slate-900">Historical Finding: </strong>
                        <span className="text-slate-600">{fimiCase.historicalSummary}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-amber-800 font-medium">
                        🛡️ Verify before you share
                      </span>

                      <button
                        onClick={() => {
                          const matchingSample = NIGERIAN_ELECTION_SAMPLES.find(
                            (s) => s.id === fimiCase.id || s.category.includes('FIMI')
                          ) || NIGERIAN_ELECTION_SAMPLES[0];

                          setShowFimiModal(false);
                          setActiveTab('web');
                          setWebInputText(matchingSample.text);
                          setWebMediaType(matchingSample.type);
                          handleWebAnalyze(matchingSample.text, matchingSample.type);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition cursor-pointer"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        <span>Test This FIMI Pattern</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Sources: EEAS FIMI Reports, UK Parliament Inquiry, DFRLab, Stanford Internet Observatory, CDD West Africa, Dubawa, NCDC.
              </span>
              <button
                onClick={() => setShowFimiModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold transition"
              >
                Close Archive
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share & Community Feedback Hub Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-5 bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 text-white flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-xl shadow-xs">
                  📢
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-extrabold text-white">Share DebunkAI & Suggest Improvements</h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-slate-950 font-mono">
                      COMMUNITY
                    </span>
                  </div>
                  <p className="text-xs text-emerald-100/90 mt-0.5">
                    Help test the app, share with Nigerian voters, and suggest features you'd like to see!
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowShareModal(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Nav Tabs */}
            <div className="flex border-b border-slate-200 bg-slate-50 px-5 pt-2">
              <button
                onClick={() => setShareTab('posts')}
                className={`pb-2.5 px-3 text-xs font-bold border-b-2 flex items-center gap-1.5 transition ${
                  shareTab === 'posts'
                    ? 'border-emerald-600 text-emerald-800'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Ready-to-Copy Posts</span>
              </button>

              <button
                onClick={() => setShareTab('feedback')}
                className={`pb-2.5 px-3 text-xs font-bold border-b-2 flex items-center gap-1.5 transition ${
                  shareTab === 'feedback'
                    ? 'border-emerald-600 text-emerald-800'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                <span>Submit Suggestions & Vote ({feedbackList.length})</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {shareTab === 'posts' ? (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-2">
                      Choose Your Platform Template:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <button
                        onClick={() => setSelectedPostPlatform('twitter')}
                        className={`p-2.5 rounded-xl border text-xs font-bold text-left transition flex items-center gap-2 ${
                          selectedPostPlatform === 'twitter'
                            ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span className="text-sm">𝕏</span>
                        <span>Twitter / X</span>
                      </button>

                      <button
                        onClick={() => setSelectedPostPlatform('linkedin')}
                        className={`p-2.5 rounded-xl border text-xs font-bold text-left transition flex items-center gap-2 ${
                          selectedPostPlatform === 'linkedin'
                            ? 'border-blue-700 bg-blue-700 text-white shadow-xs'
                            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span className="text-sm">💼</span>
                        <span>LinkedIn</span>
                      </button>

                      <button
                        onClick={() => setSelectedPostPlatform('whatsapp')}
                        className={`p-2.5 rounded-xl border text-xs font-bold text-left transition flex items-center gap-2 ${
                          selectedPostPlatform === 'whatsapp'
                            ? 'border-emerald-700 bg-emerald-700 text-white shadow-xs'
                            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span className="text-sm">💬</span>
                        <span>WhatsApp</span>
                      </button>

                      <button
                        onClick={() => setSelectedPostPlatform('forum')}
                        className={`p-2.5 rounded-xl border text-xs font-bold text-left transition flex items-center gap-2 ${
                          selectedPostPlatform === 'forum'
                            ? 'border-amber-700 bg-amber-700 text-white shadow-xs'
                            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span className="text-sm">🌐</span>
                        <span>Nairaland/FB</span>
                      </button>
                    </div>
                  </div>

                  {/* Post Content Preview Box */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700">
                        {selectedPostPlatform === 'twitter'
                          ? 'Twitter / X Thread'
                          : selectedPostPlatform === 'linkedin'
                          ? 'LinkedIn Civic Tech Post'
                          : selectedPostPlatform === 'whatsapp'
                          ? 'WhatsApp Family & Group Broadcast'
                          : 'Forum & Facebook Post'}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Includes your live app link
                      </span>
                    </div>

                    {(() => {
                      const liveAppUrl =
                        typeof window !== 'undefined'
                          ? window.location.origin
                          : 'https://ais-pre-bywvj7w4urbc3ikkxszhcz-716745602805.europe-west2.run.app';

                      const postTexts: Record<string, string> = {
                        twitter: `🇳🇬 We built DebunkAI – an AI fact-checking engine powered by Gemma 4 with high-depth analysis for the upcoming Nigerian 2027 elections!

Forward or paste viral WhatsApp voice notes 🎙️, video clips 🎬, or cloned INEC portals.

🛡️ Live url.vet phishing scan
🌍 Documented FIMI foreign interference radar
✅ "Verify before you share" label

👉 Try it live & give us your feedback:
${liveAppUrl}

What features should we add next? Local languages (Pidgin/Hausa/Yoruba/Igbo)? SMS hotline? Drop your ideas! 👇
#Nigeria2027 #FactCheck #Gemma4 #VerifyBeforeYouShare`,

                        linkedin: `Excited to announce DebunkAI – an open civic intelligence & election integrity fact-checking app built for the upcoming Nigerian 2027 General Elections, powered by Gemma 4.

Electoral misinformation spreads fast through forwarded WhatsApp voice notes, recycled riot footage, and cloned phishing portals (e.g. fake PVC renewal fees or fake presidential grant scams).

Key Features:
• 🇳🇬 Nigerian 2027 Election Special: Cross-referenced with statutory INEC protocols & Electoral Act
• 🎙️ Audio Voice Note Forensics & 🎬 Video deepfake verification
• 🛡️ url.vet Threat Intelligence: Catches typosquatted portals (.xyz, .top) and BVN/NIN biometric harvesters
• 🌍 Documented FIMI radar: Cross-references documented foreign interference playbooks
• 💬 Interactive WhatsApp & Messenger chatbot simulator

We are actively gathering community feedback, feature suggestions, and critiques to make this as impactful as possible for citizens and election observers.

Try the live tool here:
${liveAppUrl}

What features, data sources, or local language integrations should we prioritize next? Please share your thoughts!`,

                        whatsapp: `*🛡️ VERIFY BEFORE YOU SHARE: DebunkAI Fact-Checker for Nigerian 2027 Elections* 🇳🇬

Hello family and friends! With rumors spreading about BVAS, voter card renewal fees, and fake news videos, we built a free AI tool called *DebunkAI* (powered by Google's Gemma 4) to verify claims before anyone forwards them.

*What it can check:*
🎙️ Forwarded WhatsApp voice notes
🎬 Viral election video clips
🔗 Suspicious website links & fake ₦50,000 grant scams (url.vet scan)
📝 Statutory INEC guidelines & peace accords

*👉 Try it out now on your phone or computer:*
${liveAppUrl}

Please test it with any viral post you've seen and let me know your thoughts or suggestions on how to improve it for our communities! Thank you 🙏`,

                        forum: `[Community Project] DebunkAI: AI Fact-Checker for Nigerian 2027 Elections & Viral Posts (Seeking Your Suggestions!)

Fellow Nigerians and tech enthusiasts,

I built a web app called DebunkAI powered by Gemma 4 to help citizens verify rumors, forwarded WhatsApp voice notes, recycled protest videos, and fake INEC links.

With 2027 campaigns approaching, we want to give everyday citizens a tool with the principle: "Verify before you share".

Key features built so far:
1. Nigerian 2027 Election Deep Analysis: Checks claims against official INEC procedures & Electoral Act.
2. Voice Note & Video Forensics: Identifies cloned AI voices and old recycled ballot videos.
3. url.vet Link Intelligence: Catches fake portals asking for BVN or ₦2,000 PVC fees.
4. WhatsApp & Facebook Chatbot: Simulates how citizens can forward claims in chat and get a polite community reply to share back.

Try it here:
${liveAppUrl}

I am seeking your suggestions and constructive critiques:
- What features would make this most useful to you?
- Should we prioritize Pidgin, Hausa, Yoruba, and Igbo voice translations?
- Would an offline SMS/USSD channel be helpful in areas with poor internet?

Looking forward to your suggestions!`,
                      };

                      const currentText = postTexts[selectedPostPlatform] || postTexts.twitter;

                      const handleCopyText = () => {
                        navigator.clipboard.writeText(currentText);
                        setCopiedPost(true);
                        setTimeout(() => setCopiedPost(false), 2500);
                      };

                      const handleCopyUrl = () => {
                        navigator.clipboard.writeText(liveAppUrl);
                        setCopiedAppUrl(true);
                        setTimeout(() => setCopiedAppUrl(false), 2500);
                      };

                      const twitterIntentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                        currentText
                      )}`;
                      const whatsappIntentUrl = `https://wa.me/?text=${encodeURIComponent(currentText)}`;

                      return (
                        <div className="space-y-3">
                          <textarea
                            readOnly
                            rows={8}
                            value={currentText}
                            className="w-full p-3.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-800 text-xs font-mono leading-relaxed outline-none focus:border-emerald-500"
                          />

                          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={handleCopyText}
                                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition cursor-pointer"
                              >
                                {copiedPost ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                <span>{copiedPost ? 'Copied Post Text!' : 'Copy Full Post'}</span>
                              </button>

                              <button
                                onClick={handleCopyUrl}
                                className="px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                              >
                                {copiedAppUrl ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Link2 className="w-3.5 h-3.5" />}
                                <span>{copiedAppUrl ? 'Copied Link!' : 'Copy App Link'}</span>
                              </button>
                            </div>

                            <div className="flex items-center gap-2">
                              {selectedPostPlatform === 'twitter' && (
                                <a
                                  href={twitterIntentUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold flex items-center gap-1.5 transition shadow-xs"
                                >
                                  <span>Post to 𝕏</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              )}

                              {selectedPostPlatform === 'whatsapp' && (
                                <a
                                  href={whatsappIntentUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-3 py-2 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold flex items-center gap-1.5 transition shadow-xs"
                                >
                                  <MessageCircle className="w-3.5 h-3.5" />
                                  <span>Share to WhatsApp</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              ) : (
                /* Suggest Features & Vote Tab */
                <div className="space-y-5">
                  <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 space-y-1">
                    <strong className="flex items-center gap-1.5 text-amber-900 font-bold">
                      <Lightbulb className="w-4 h-4 text-amber-600" />
                      <span>Have an idea to make DebunkAI better?</span>
                    </strong>
                    <p className="leading-relaxed">
                      We want everyday voters, community leaders, and fact-checkers to shape this tool. Share what would help your local community spot fake news faster.
                    </p>
                  </div>

                  {/* Submission Form */}
                  <form onSubmit={handleFeedbackSubmit} className="space-y-3 p-4 rounded-2xl border border-slate-200 bg-white shadow-xs">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Submit Your Suggestion
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Category:
                        </label>
                        <select
                          value={feedbackCategory}
                          onChange={(e) => setFeedbackCategory(e.target.value)}
                          className="w-full p-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 outline-none focus:border-emerald-500 bg-white"
                        >
                          <option value="Local Nigerian Languages (Pidgin/Hausa/Yoruba/Igbo)">
                            🗣️ Local Languages (Pidgin/Hausa/Yoruba/Igbo)
                          </option>
                          <option value="Offline / USSD & SMS">
                            📱 Offline / USSD & SMS Verification
                          </option>
                          <option value="INEC Polling Unit & BVAS Database">
                            🗳️ INEC Polling Unit & BVAS Database
                          </option>
                          <option value="Audio Voice Note & Deepfake Analysis">
                            🎙️ Audio Voice Note & Deepfake Forensics
                          </option>
                          <option value="Phishing & Fake Grant Scams (url.vet)">
                            🛡️ Phishing & Scams (url.vet)
                          </option>
                          <option value="Other Feature Idea">
                            💡 Other Feature Idea
                          </option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Your Name or Handle (Optional):
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Ade, Voter in Kaduna, or @handle"
                          value={feedbackAuthor}
                          onChange={(e) => setFeedbackAuthor(e.target.value)}
                          className="w-full p-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Your Suggestion / Feedback:
                      </label>
                      <textarea
                        rows={3}
                        required
                        placeholder="Describe the feature or improvement you'd love to see (e.g. translate debunk summaries into Hausa audio, or add SMS hotline)..."
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                        className="w-full p-3 rounded-xl border border-slate-300 text-xs text-slate-800 outline-none focus:border-emerald-500 leading-relaxed"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      {feedbackSubmitted ? (
                        <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                          <Check className="w-4 h-4" />
                          <span>Thank you! Your suggestion has been recorded.</span>
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-400">
                          Community suggestions help prioritize upcoming updates
                        </span>
                      )}

                      <button
                        type="submit"
                        disabled={feedbackSubmitting || !feedbackText.trim()}
                        className={`px-4 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 transition ${
                          feedbackSubmitting || !feedbackText.trim()
                            ? 'bg-emerald-300 cursor-not-allowed'
                            : 'bg-emerald-600 hover:bg-emerald-700 shadow-xs cursor-pointer'
                        }`}
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{feedbackSubmitting ? 'Submitting...' : 'Send Suggestion'}</span>
                      </button>
                    </div>
                  </form>

                  {/* Community Suggestions List */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                        <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Community Suggested Ideas ({feedbackList.length})</span>
                      </h4>
                      <span className="text-[10px] text-slate-400 font-mono">Live Feedback Feed</span>
                    </div>

                    <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                      {feedbackList.map((item, idx) => (
                        <div
                          key={item.id || idx}
                          className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900 px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[10px]">
                              {item.category}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              {item.author || 'Community Member'}
                            </span>
                          </div>
                          <p className="text-slate-700 text-[11px] leading-relaxed pt-0.5">
                            "{item.suggestion}"
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                DebunkAI • 🇳🇬 "Verify before you share"
              </span>
              <button
                onClick={() => setShowShareModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-500 px-4">
        <p className="font-semibold text-slate-700 flex items-center justify-center gap-1.5 flex-wrap">
          <span>DebunkAI Nigeria 2027</span>
          <span>•</span>
          <span className="text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300 font-extrabold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
            Verify before you share
          </span>
          <span>•</span>
          <span>Powered by Gemma 4 with local Ollama fallback</span>
          <span>•</span>
          <button
            onClick={() => setShowShareModal(true)}
            className="text-emerald-700 hover:underline font-bold flex items-center gap-1 cursor-pointer"
          >
            <Lightbulb className="w-3 h-3 text-amber-600" />
            <span>Share & Give Feedback</span>
          </button>
        </p>
        <p className="mt-1 text-[11px] text-slate-400">
          Cross-referenced against INEC official guidelines, the Electoral Act, and independent fact-checking coalitions.
        </p>
      </footer>
    </div>
  );
}
