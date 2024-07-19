import React, { useState } from 'react';
import ProfileInfo from './ProfileInfo';
import { useNavigate } from 'react-router-dom';
import Searchbar from './SearchBar';

const Navbar = ({ userInfo, onSearchEntry, handleClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearchEntry(searchQuery.trim());
    }
  };

  const onClearSearch = () => {
    setSearchQuery('');
    handleClearSearch();
  };

  return (
    <div className="grid grid-cols-3 items-center p-4 bg-gray-100">
      {/* Vit Logo */}
      <div className="flex justify-start">
        <div className="w-[250px]">
          <img src="../../src/assets/Logo.png" alt="VIT Logo" />
        </div>
      </div>

      {/* Searchbar */}
      <div className="flex justify-center">
        <Searchbar
          value={searchQuery}
          onChange={({ target }) => setSearchQuery(target.value)}
          handleSearch={handleSearch}
          onClearSearch={onClearSearch}
        />
      </div>

      {/* ProfileInfo */}
      <div className="flex justify-end">
        <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
      </div>
    </div>
  );
};

export default Navbar;
