const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

router.get('/', async (req, res) => {
  try {
    const { query } = req.query;
    console.log("Incoming search query:", query);

    if (!query || query.trim() === '') {
      return res.status(400).json({ message: 'Query parameter is required.' });
    }

    const regex = new RegExp(query, 'i');

    const results = await Recipe.find({
      $or: [
        { name: regex },
        { cuisine: regex },
        { ingredients: regex } // ✅ simplified: works with array of strings
      ]
    });

    console.log(`Found ${results.length} results for query "${query}"`);
    res.json(results);
  } catch (err) {
    console.error('Server error in /api/recipes route:', err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
