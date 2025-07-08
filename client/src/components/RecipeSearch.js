import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css'; // Ensure you have this

function RecipeSearch() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null); // which card is open

  const API_BASE_URL = "https://ethnus-recipie.onrender.com";

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/recipes`);
        setRecipes(res.data);
        setAllRecipes(res.data);
      } catch (err) {
        console.error("Error fetching all recipes", err);
      }
    };

    fetchAll();
  }, []);

  const search = async () => {
    if (query.trim() === '') {
      setRecipes(allRecipes);
      return;
    }

    try {
      const res = await axios.get(`${API_BASE_URL}/api/recipes?query=${query}`);
      setRecipes(res.data);
    } catch (err) {
      console.error("Error searching recipes", err);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setRecipes(allRecipes);
  };

  return (
    <div className="container">
      <h1>Recipe Finder</h1>
      <input
        type="text"
        value={query}
        placeholder="Enter ingredient or cuisine"
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={search}>Search</button>
      <button onClick={clearSearch} style={{ marginLeft: '10px' }}>Clear</button>

      <div className="grid">
        {recipes.map((r, i) => (
          <div key={i} className="card">
            <h3>{r.name}</h3>
            <p><strong>Cuisine:</strong> {r.cuisine}</p>
            <p><strong>Ingredients:</strong> {r.ingredients.join(', ')}</p>
            <button onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}>
              {expandedIndex === i ? 'Hide Details' : 'View Details'}
            </button>

            {expandedIndex === i && r.description && (
              <p className="description"><strong>Description:</strong> {r.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeSearch;
