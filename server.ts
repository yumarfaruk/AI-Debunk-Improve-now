import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

import {
  analyzeClaim,
  getActiveProviderConfig,
  REALISTIC_SAMPLE_CLAIM,
  NIGERIAN_ELECTION_SAMPLES,
  DOCUMENTED_NIGERIA_FIMI_CASES,
} from './server/debunkService.ts';

import {
  verifyMetaWebhook,
  handleMetaWebhookPayload,
  formatChatbotResponse,
  getWebhookLogs,
  clearWebhookLogs,
  addWebhookLog,
} from './server/chatbotService.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
let port = parseInt(process.env.PORT || '3000', 10);
const portArgIndex = process.argv.indexOf('--port');
if (portArgIndex !== -1 && process.argv[portArgIndex + 1]) {
  port = parseInt(process.argv[portArgIndex + 1], 10);
}

app.use(express.json({ limit: '15mb' }));

// API Routes
app.get('/api/provider-info', (req, res) => {
  try {
    const config = getActiveProviderConfig();
    res.json({
      ...config,
      metaVerifyToken: process.env.META_VERIFY_TOKEN || 'debunk_bot_token',
      hasWhatsAppToken: Boolean(process.env.WHATSAPP_TOKEN),
      hasWhatsAppPhoneId: Boolean(process.env.WHATSAPP_PHONE_NUMBER_ID),
      hasFacebookToken: Boolean(process.env.PAGE_ACCESS_TOKEN),
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/election-samples', (req, res) => {
  res.json({ samples: NIGERIAN_ELECTION_SAMPLES });
});

app.get('/api/fimi-cases', (req, res) => {
  res.json({ cases: DOCUMENTED_NIGERIA_FIMI_CASES });
});

interface UserFeedback {
  id: string;
  category: string;
  suggestion: string;
  author?: string;
  rating?: number;
  timestamp: string;
}

const communityFeedbackList: UserFeedback[] = [
  {
    id: 'fb-1',
    category: 'Local Nigerian Languages',
    suggestion: 'Add Nigerian Pidgin, Hausa, Yoruba, and Igbo translation for voice note debunking so grassroots community members can understand immediately.',
    author: 'Civic Technologist, Lagos',
    rating: 5,
    timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    id: 'fb-2',
    category: 'Offline / USSD & SMS',
    suggestion: 'Provide an offline SMS or USSD code verification for rural polling units where 4G data networks might be throttled or unavailable on election day.',
    author: 'Election Observer, Kano',
    rating: 5,
    timestamp: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    id: 'fb-3',
    category: 'INEC Polling Unit Search',
    suggestion: 'Allow citizens to paste their PU code (e.g., 24-08-01-002) to verify if a viral incident report actually happened in their registered polling unit.',
    author: 'Voter, Abuja',
    rating: 4,
    timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
];

app.get('/api/feedback', (req, res) => {
  res.json({ feedback: communityFeedbackList });
});

app.post('/api/feedback', (req, res) => {
  const { category, suggestion, author, rating } = req.body || {};
  if (!suggestion || !suggestion.trim()) {
    return res.status(400).json({ error: 'Please enter a suggestion.' });
  }
  const item: UserFeedback = {
    id: `fb-${Date.now()}`,
    category: category || 'General Suggestion',
    suggestion: suggestion.trim(),
    author: author?.trim() || 'Community Member',
    rating: Number(rating) || 5,
    timestamp: new Date().toISOString(),
  };
  communityFeedbackList.unshift(item);
  res.json({ success: true, feedback: item });
});

app.post('/api/analyze', async (req, res) => {
  try {
    const { text, provider, mediaType = 'text', imageData } = req.body || {};
    const result = await analyzeClaim(text || '', provider, mediaType, imageData);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Analysis failed' });
  }
});

app.post('/api/smoke-test', async (req, res) => {
  try {
    const { provider } = req.body || {};
    const config = getActiveProviderConfig(provider);
    const startTime = Date.now();
    const result = await analyzeClaim(REALISTIC_SAMPLE_CLAIM, provider);
    const durationMs = Date.now() - startTime;
    res.json({
      status: 'PASS',
      durationMs,
      config,
      sampleClaim: REALISTIC_SAMPLE_CLAIM,
      result,
    });
  } catch (err: any) {
    res.status(500).json({
      status: 'FAIL',
      error: err.message || 'Smoke test failed',
    });
  }
});

// Meta Webhook Verification (WhatsApp & Facebook Messenger)
const handleWebhookGet = (req: express.Request, res: express.Response) => {
  const mode = req.query['hub.mode'] as string;
  const token = req.query['hub.verify_token'] as string;
  const challenge = req.query['hub.challenge'] as string;

  const verification = verifyMetaWebhook(mode, token, challenge);
  if (verification.isValid && verification.challenge) {
    console.log('[Webhook] Meta verification handshake succeeded.');
    res.status(200).send(verification.challenge);
  } else {
    console.warn('[Webhook] Meta verification failed or invalid token.');
    res.sendStatus(403);
  }
};

app.get('/webhook', handleWebhookGet);
app.get('/api/webhook', handleWebhookGet);

// Meta Webhook Message Receiver
const handleWebhookPost = async (req: express.Request, res: express.Response) => {
  res.status(200).send('EVENT_RECEIVED');

  try {
    await handleMetaWebhookPayload(req.body);
  } catch (err: any) {
    console.error('[Webhook] Error handling payload:', err.message);
  }
};

app.post('/webhook', handleWebhookPost);
app.post('/api/webhook', handleWebhookPost);

// Interactive Chatbot Simulation Endpoint
app.post('/api/chat/simulate', async (req, res) => {
  try {
    const { message, platform = 'whatsapp', provider, mediaType = 'text', imageData } = req.body || {};
    const hasImage = Boolean(imageData && imageData.data);
    if ((!message || !message.trim()) && !hasImage) {
      res.status(400).json({ error: 'Message or image cannot be empty.' });
      return;
    }

    const effectiveMediaType = hasImage && mediaType === 'text' ? 'image' : mediaType;
    const debunkResult = await analyzeClaim(message || '', provider, effectiveMediaType, imageData);
    const formattedReply = formatChatbotResponse(debunkResult, platform);

    addWebhookLog({
      platform: platform as 'whatsapp' | 'facebook',
      direction: 'incoming',
      senderId: platform === 'whatsapp' ? '+234 803 123 4567' : 'fb_user_10284',
      incomingText: (message && message.trim()) || `[Uploaded Image${imageData?.fileName ? `: ${imageData.fileName}` : ''}]`,
      mediaType: effectiveMediaType,
      replyText: formattedReply,
      verdict: debunkResult.verdict,
      credibilityScore: debunkResult.credibilityScore,
      deliveryStatus: 'simulated',
    });

    res.json({
      replyText: formattedReply,
      debunkResult,
      platform,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Chatbot simulation failed' });
  }
});

// Webhook Activity Logs
app.get('/api/webhook/logs', (req, res) => {
  res.json({ logs: getWebhookLogs() });
});

app.post('/api/webhook/clear-logs', (req, res) => {
  clearWebhookLogs();
  res.json({ success: true });
});

// Test ping endpoint to trigger a simulated WhatsApp or Facebook webhook
app.post('/api/webhook/test-ping', async (req, res) => {
  try {
    const { platform = 'whatsapp', text, mediaType = 'text' } = req.body || {};
    const testText = text || NIGERIAN_ELECTION_SAMPLES[0].text;

    let testPayload: any;
    if (platform === 'whatsapp') {
      testPayload = {
        object: 'whatsapp_business_account',
        entry: [
          {
            id: 'WHATSAPP_BUSINESS_ID',
            changes: [
              {
                value: {
                  messaging_product: 'whatsapp',
                  metadata: {
                    display_phone_number: '234800000000',
                    phone_number_id: '10987654321',
                  },
                  messages: [
                    {
                      from: '2348039876543',
                      id: `wamid_${Date.now()}`,
                      timestamp: Math.floor(Date.now() / 1000).toString(),
                      text: { body: testText },
                      type:
                        mediaType === 'audio'
                          ? 'audio'
                          : mediaType === 'video'
                          ? 'video'
                          : mediaType === 'image'
                          ? 'image'
                          : 'text',
                      ...(mediaType === 'image' ? { image: { caption: testText } } : {}),
                    },
                  ],
                },
                field: 'messages',
              },
            ],
          },
        ],
      };
    } else {
      testPayload = {
        object: 'page',
        entry: [
          {
            id: 'PAGE_ID_98765',
            time: Date.now(),
            messaging: [
              {
                sender: { id: 'fb_user_449102' },
                recipient: { id: 'PAGE_ID_98765' },
                timestamp: Date.now(),
                message: {
                  mid: `mid_${Date.now()}`,
                  text: testText,
                },
              },
            ],
          },
        ],
      };
    }

    const handled = await handleMetaWebhookPayload(testPayload);
    res.json({
      success: true,
      handled,
      payload: testPayload,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`DebunkAI server listening on http://0.0.0.0:${port}`);
    console.log(`Provider: ${process.env.PROVIDER || 'api'}`);
  });
}

startServer();
