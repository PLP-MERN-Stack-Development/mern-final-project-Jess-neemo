// controllers/resourceController.js
import Resource from '../models/Resource.js';

export const getResources = async (req, res) => {
  try {
    const { type } = req.query;
    const filter = type ? { type } : {};
    const resources = await Resource.find(filter);
    res.json(resources);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};