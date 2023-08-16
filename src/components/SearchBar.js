import React, { useState } from 'react';

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e) => {
      setSearchTerm(e.target.value);
    }
  
    const handleSearch = () => {
      console.log('Searching for:', searchTerm);
      // Implement your search logic here
    }
  
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }
    
    return (
      <div style={styles.searchBarContainer}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          placeholder="Search music, podcasts..."
          style={styles.searchInput}
        />
        <button onClick={handleSearch} style={styles.searchButton}>
          <i className="fas fa-search"></i>
        </button>
      </div>
    );
  }
  
const styles = {
    searchBarContainer: {
      display: 'flex',
      width:'350px',
      flexDirection: 'row',
      alignItems: 'center',
      border: '1px solid #ccc',
      borderRadius: '24px',
      overflow: 'hidden',
    },
    searchInput: {
      flex: 1,
      padding: '10px',
      border: 'none',
      outline: 'none',
    },
    searchButton: {
      padding: '10px 15px',
      background: '#f5f5f5',
      border: 'none',
      cursor: 'pointer',
    },
  };
export default SearchBar
