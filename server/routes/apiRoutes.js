const express = require('express');
const router = express.Router();
const Api = require('../models/api');
const { OAuth2Client } = require('google-auth-library');

// Endpoint to get the Google API key
router.get('/google-api-key', async (req, res) => {
  try {
    const api = await Api.findOne({ name: 'GOOGLE_API_KEY' });
    if (!api) {
      return res.status(404).json({ message: 'API key not found' });
    }
    res.json({ key: api.key });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/google-client-id', async (req, res) => {
  try {
    const api = await Api.findOne({ name: 'GOOGLE_CLIENT_ID' });
    if (!api) {
      return res.status(404).json({ message: 'Client Id not found' });
    }
    res.json({ key: api.key });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/google-client-secret', async (req, res) => {
  try {
    const api = await Api.findOne({ name: 'GOOGLE_CLIENT_SECRET' });
    if (!api) {
      return res.status(404).json({ message: 'Client Secret not found' });
    }
    res.json({ key: api.key });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Verify Google ID token
router.post('/auth/google/verify', async (req, res) => {
  try {
    const { credential } = req.body;
    
    // Get client ID from database
    const clientIdDoc = await Api.findOne({ name: 'GOOGLE_CLIENT_ID' });
    if (!clientIdDoc) {
      return res.status(500).json({ message: 'Client ID not found' });
    }
    
    const client = new OAuth2Client(clientIdDoc.key);
    
    // Verify the token without an audience
    const ticket = await client.verifyIdToken({
      idToken: credential,
    });
    
    const payload = ticket.getPayload();
    
    // Now, you should verify the payload after and if the audience exists.
    if (!payload.aud || !payload.aud.includes(clientIdDoc.key)) {
      return res.status(401).json({
        verified: false,
        message: 'Missmatch client ID',
      });
    }
    
    res.json({
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
      sub: payload.sub // This is the Google user ID
    });
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ 
      message: 'Invalid or Exired Token: Verify the expiration, and usage of ' + error.message
    });
  }
});

module.exports = router;
