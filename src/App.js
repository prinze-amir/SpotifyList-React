import './App.css';
import React, { useState, useEffect } from 'react';
import SearchBar from './Components/SearchBar';
import SearchResults from './Components/SearchResults';
import Playlist from './Components/Playlist';
import {getProfile, getTracks, getArtists} from './Services/api'; 
import { getSpotifyToken, getAccessCode } from './Auth/auth';
import Profile from './Components/Profile';
import { setCookie, getCookie, deleteCookie } from './Utilities/Cookies';

function App() {
  const [results, setResults] = useState([]);
  const [playlistName, setPlaylistName] = useState('New Playlist');
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [Loading, setLoading] = useState(false);
  const [code, setCode] = useState('');
  const [token, setToken] = useState({});
  const [profile, setProfile] = useState({});
  let accessCode
  // const _code = getCookie('_code');
  // console.log(_code)
  
  useEffect(() => { 
    
    if (code){
      console.log('checking is code is there because it is')
    }
    if (code === ''){
      console.log('checking if code is empty string code:' + code)
       accessCode = getAccessCode();

    }
    if (accessCode){
      setCookie('_code', accessCode);
       setCode(accessCode);
       console.log('access code is ' +accessCode)
       console.log( 'this is the cookie ' +getCookie('_code'))
       console.log('this is the code state '+ code)
    }
  },[code])

  useEffect(() => {
    console.log('this is code in another useEffect'+code)

    if (code !== ''){
      getSpotifyToken(code).then((data) => {
        console.log(data);
        console.log(`token.accessToken: ${token.accessToken}`)
     return setToken(data);
      });
    }
  }, [code])
  useEffect(()=>{
     setProfile(()=>getProfile(token))
    console.log('this is profile -'+profile)
  }, [token])





  

  const handleSearch = (searchTerm) => {
  getTracks(searchTerm, token.accessToken).then((data) => {
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
        <div className="container">
            <SearchBar token={token.accessToken} handleSearch={handleSearch}/>
            <div className="results-playlist">
              <SearchResults results={results}/>
              <Playlist />
            </div>
            
            <button onClick={getArtists} >Get Artitst</button>
        </div>
        
    </div>
  );
}

export default App;
