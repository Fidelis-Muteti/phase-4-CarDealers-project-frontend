import { useState } from "react";

function Search({ onSearchChange }) {
  const [searchTerm, setSearchTerm] = useState("");

  function handleChange(event) {
    const value = event.target.value;
    setSearchTerm(value);
    onSearchChange(value);
  }

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search cars..."
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
}

export default Search;
