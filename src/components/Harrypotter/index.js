import { useEffect, useState } from "react";

import "./index.css"

const Harrypotter = () => {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const defaultImage = "https://via.placeholder.com/150"; // Placeholder for missing images

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://hp-api.onrender.com/api/characters');
      const data = await response.json();
      setCharacters(data);
      setFilteredCharacters(data); // Initialize filtered characters
      console.log("Harry Potter component is rendering...");
    };
    fetchData();
  }, []);

  // Filter characters based on search term
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = characters.filter((character) =>
      character.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredCharacters(filtered);
  };

  return (
    <div className="container">
      <h1>Harry Potter API</h1>
      <p>Welcome to the Harry Potter API!</p>
      <input
        type="text"
        placeholder="Search for a character..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />
      <div className="character-list">
        {filteredCharacters.map((character) => (
          <div key={character.name} className="character-card">
            <h2>{character.name}</h2>
            <img src={character.image || defaultImage} alt={character.name} />
            <p>House: {character.house || "Unknown"}</p>
            <p>Species: {character.species}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Harrypotter;
