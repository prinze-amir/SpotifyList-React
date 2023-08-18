import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useState } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Playlist from './components/Playlist';
import {getProfile, getTracks, token, getArtists} from './services/api'; 
import Profile from './components/Profile';

function App() {
 
  const [results, setResults] = useState([]);
  const [playlistName, setPlaylistName] = useState('New Playlist');
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [Loading, setLoading] = useState(false);
  const profile = getProfile();

  const handleSearch = (searchTerm) => {
  getTracks(searchTerm).then((data) => {
    setResults(data);
    console.log(data);
  });
  }


  return (
    <div className="App">
        <header className="header">
            <Profile profile={profile}/>      
            <h1 className="title">Spotify ReactList</h1>
        </header>
        <SearchBar token={token} handleSearch={handleSearch}/>
        <SearchResults results={results}/>
        <Playlist />
        <button onClick={getArtists} >Get Artitst</button>
    </div>
  );
}

export default App;
