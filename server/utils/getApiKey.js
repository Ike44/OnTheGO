const Api = require('../models/api');

const getApiKey = async (name) => {
  try {
    const api = await Api.findOne({ name });
    if (!api) {
      throw new Error(`API key for ${name} not found`);
    }
    return api.key;
  } catch (err) {
    console.error('Error retrieving API key:', err);
    throw err;
  }
};

module.exports = getApiKey;