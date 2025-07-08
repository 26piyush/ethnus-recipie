.container {
  padding: 20px;
  text-align: center;
}

.recipe-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.recipe-card {
  background: #fffdfc;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 16px;
  text-align: left;
  transition: all 0.3s ease;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  height: 250px;
  position: relative;
}

.recipe-card.expanded {
  height: auto;
  background: #fff7f2;
}

.recipe-card h3 {
  margin-top: 0;
}

.recipe-card button {
  margin-top: 10px;
  background: #007bff;
  color: white;
  border: none;
  padding: 6px 12px;
  cursor: pointer;
  border-radius: 6px;
}

.recipe-card .description {
  margin-top: 10px;
  background: #f3f3f3;
  padding: 10px;
  border-radius: 6px;
  font-size: 0.95em;
  line-height: 1.5;
}
