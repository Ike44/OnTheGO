const express = require('express');
const router = express.Router();
const axios = require('axios');
const OpenAI = require('openai');

const MAX_RESPONSE_LENGTH = 200;
let assistantId = null;

// Function to fetch the OpenAI API key from the API endpoint
const fetchOpenAiApiKey = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/openai-api-key');
    if (!response.data.key) {
      throw new Error('OpenAI API key not found');
    }
    return response.data.key;
  } catch (err) {
    console.error('Error retrieving OpenAI API key:', err);
    throw err;
  }
};

// Create or get assistant
const getAssistant = async (openai) => {
  if (!assistantId) {
    const assistant = await openai.beta.assistants.create({
      name: "Brenda",
      instructions: 'You are Brenda, an AI assistant integrated into the OnTheGO urban mobility platform. Your role is to help users navigate the app and maximize its features. Provide clear, friendly, and professional guidance to users regarding their urban mobility needs.\n\nHere are some key areas you can assist with:\n\nTravel Planning: Help users plan trips by suggesting optimal routes, providing real-time navigation, and integrating transport options like public transit or car-sharing services.\nFeature Guidance: Explain how to use specific app features, such as location tracking, transport booking, and route customization.\nReal-Time Assistance: Provide updates about delays, weather, or disruptions that might impact travel plans.\nUser Support: Help with app-related questions, troubleshoot common issues, and direct users to further support if needed.\nLocal Recommendations: Suggest nearby points of interest or services like restaurants, gas stations, or parking spots.\n\nMaintain a polite and approachable tone, and adapt your responses to meet the user\'s needs. Be concise when possible, but always aim to provide thorough and actionable answers.',
      model: "gpt-4o-mini"
    });
    assistantId = assistant.id;
  }
  return assistantId;
};

router.post('/chat', async (req, res) => {
  const { message, threadId } = req.body;

  try {
    const apiKey = await fetchOpenAiApiKey();
    const openai = new OpenAI({ apiKey });

    // Get or create assistant
    const assistantId = await getAssistant(openai);

    // Create or retrieve thread
    const thread = threadId ? 
      await openai.beta.threads.retrieve(threadId) :
      await openai.beta.threads.create();

    // Add message to thread
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: message
    });

    // Run assistant
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistantId
    });

    // Wait for completion
    let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    while (runStatus.status !== 'completed') {
      await new Promise(resolve => setTimeout(resolve, 1000));
      runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    }

    // Get messages
    const messages = await openai.beta.threads.messages.list(thread.id);
    const latestMessage = messages.data[0];

    res.json({ 
      reply: latestMessage.content[0].text.value,
      threadId: thread.id 
    });

  } catch (error) {
    console.error('Error communicating with OpenAI:', error);
    res.status(500).json({ error: 'Failed to communicate with OpenAI' });
  }
});

module.exports = router;