import React, { useState } from 'react';
function SearchBar(props) {

    const [searchTerm, setSearchTerm] = useState('');
    const {handleSearch} = props;

    const handleInputChange = (e) => {
      setSearchTerm(e.target.value);
    }
  
    const handleClick = () => {
      console.log('Searching for:', searchTerm);
      handleSearch(searchTerm);
      document.location.href = '#tracklist';
    }
  
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleClick();
        }
    }
    
    return (
      <div id="search" style={styles.searchContainer}>
        <div style={styles.searchBarContainer}>
        <input id="searchInput"
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          placeholder="Search music, podcasts..."
          style={styles.searchInput}
        />
        <button onClick={handleClick} style={styles.searchButton}>
          <i className="fas fa-search"></i>
        </button>
      </div>

      </div>
      
    );
  }
  
const styles = {
    searchContainer: {
      padding: '20px 0',
      display: 'flex',
      justifyContent: 'center',

    },
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
