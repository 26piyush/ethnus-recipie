import React, { useState, useEffect } from "react";
import "./styles.css";

const RecipeSearch = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCard, setExpandedCard] = useState(null);

  // Simulated fetch from MongoDB (replace with real API call)
  useEffect(() => {
    const fetchRecipes = async () => {
      // Replace with real fetch call to MongoDB backend
      const data = [
        {
          name: "Pav Bhaji",
          cuisine: "Indian",
          ingredients: "potato, peas, tomato, butter, pav bread",
          description: "A spicy blend of vegetables served with buttered pav."
        },
        {
          name: "Butter Chicken",
          cuisine: "Indian",
          ingredients: "chicken, tomato puree, butter, cream, garam masala",
          description: "Creamy tomato-based curry with tender chicken pieces."
        },
        {
          name: "Vegetable Biryani",
          cuisine: "Indian",
          ingredients: "basmati rice, carrot, peas, yogurt, spices",
          description: "Aromatic rice dish with vegetables and spices."
        }
      ];
      setRecipes(data);
    };
    fetchRecipes();
  }, []);

  const handleToggle = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  const handleClear = () => {
    setSearchTerm("");
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.ingredients.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Recipe Finder</h1>
      <input
        type="text"
        placeholder="Search recipes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={() => setSearchTerm(searchTerm)}>Search</button>
      <button onClick={handleClear}>Clear</button>

      <div className="recipe-grid">
        {filteredRecipes.map((recipe, index) => (
          <div
            key={index}
            className={`recipe-card ${expandedCard === index ? "expanded" : ""}`}
            onClick={() => handleToggle(index)}
          >
            <h3>{recipe.name}</h3>
            <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
            <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
            {expandedCard === index && (
              <div className="description">
                <strong>Description:</strong> {recipe.description}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeSearch;
