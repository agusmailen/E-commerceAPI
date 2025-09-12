import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './styles.css';

const SearchBar = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <form className="header-search" onSubmit={handleSearch}>
      <input
        type="text"
        className="header-search-input"
        placeholder="Buscar productos..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <button type="submit" className="header-search-btn">Buscar</button>
    </form>
  );
};

export default SearchBar;
