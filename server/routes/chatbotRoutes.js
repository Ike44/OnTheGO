const express = require('express');
const router = express.Router();
const axios = require('axios');
const OpenAI = require('openai');

const MAX_RESPONSE_LENGTH = 200; // Define the maximum length for the response text

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

router.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const apiKey = await fetchOpenAiApiKey();
    const openai = new OpenAI({ apiKey });

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: `You are Brenda, an AI assistant integrated into the OnTheGO urban mobility platform. Your role is to help users navigate the app and maximize its features. Provide clear, friendly, and professional guidance to users regarding their urban mobility needs. Keep your responses concise and ensure they do not exceed ${MAX_RESPONSE_LENGTH} characters.\n\nHere are some key areas you can assist with:\n\nTravel Planning: Help users plan trips by suggesting optimal routes, providing real-time navigation, and integrating transport options like public transit or car-sharing services.\nFeature Guidance: Explain how to use specific app features, such as location tracking, transport booking, and route customization.\nReal-Time Assistance: Provide updates about delays, weather, or disruptions that might impact travel plans.\nUser Support: Help with app-related questions, troubleshoot common issues, and direct users to further support if needed.\nLocal Recommendations: Suggest nearby points of interest or services like restaurants, gas stations, or parking spots.\n\nMaintain a polite and approachable tone, and adapt your responses to meet the user's needs. Be concise when possible, but always aim to provide thorough and actionable answers.` },
        { role: 'user', content: message }
      ],
      max_tokens: 150,
    });

    const reply = response.choices[0].message.content.trim();

    res.json({ reply });
  } catch (error) {
    console.error('Error communicating with OpenAI:', error);
    res.status(500).json({ error: 'Failed to communicate with OpenAI' });
  }
});

module.exports = router;