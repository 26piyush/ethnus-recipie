const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

router.get('/', async (req, res) => {
  try {
    const { query } = req.query;
    const regex = new RegExp(query, 'i');
    const results = await Recipe.find({
      $or: [
        { name: regex },
        { cuisine: regex },
        { ingredients: { $in: [regex] } }
      ]
    });
    res.json(results);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
