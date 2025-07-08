import React, { useState } from 'react';
import axios from 'axios';

function RecipeSearch() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);

  const search = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/recipes?query=${query}`);
      setRecipes(res.data);
    } catch (err) {
      console.error("Error fetching recipes", err);
    }
  };

  return (
    <div>
      <h1>Recipe Finder</h1>
      <input
        type="text"
        value={query}
        placeholder="Enter ingredient or cuisine pls:"
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={search}>Search</button>
      <div>
        {recipes.map((r, i) => (
          <div key={i} className="recipe">
            <h3>{r.name}</h3>
            <p><strong>Cuisine:</strong> {r.cuisine}</p>
            <p><strong>Ingredients:</strong> {r.ingredients.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeSearch;
