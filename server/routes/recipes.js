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

    // ✅ Safe regex creation
    let regex;
    try {
      regex = new RegExp(query, 'i');
    } catch (err) {
      console.error('Invalid regex pattern:', err);
      return res.status(400).json({ message: 'Invalid query format.' });
    }

    const results = await Recipe.find({
      $or: [
        { name: regex },
        { cuisine: regex },
        { ingredients: { $elemMatch: { $regex: regex, $options: 'i' } } }
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
