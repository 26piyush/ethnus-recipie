import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RecipeSearch() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);

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
    <div>
      <h1>Recipe Finder</h1>
      <input
        type="text"
        value={query}
        placeholder="Enter ingredient or cuisine"
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={search}>Search</button>
      <button onClick={clearSearch} style={{ marginLeft: '10px' }}>Clear</button>
      
      <div style={{ marginTop: '20px' }}>
        {recipes.length === 0 ? (
          <p>No recipes found.</p>
        ) : (
          recipes.map((r, i) => (
            <div key={i} className="recipe" style={{ border: '1px solid #ccc', marginBottom: '10px', padding: '10px' }}>
              <h3>{r.name}</h3>
              <p><strong>Cuisine:</strong> {r.cuisine}</p>
              <p><strong>Ingredients:</strong> {r.ingredients.join(', ')}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default RecipeSearch;
