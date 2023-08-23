import './App.css';
import React, { useState, useEffect } from 'react';
import SearchBar from './Components/SearchBar';
import SearchResults from './Components/SearchResults';
import Playlist from './Components/Playlist';
import {getProfile, getTracks, getArtists} from './Services/api'; 
import { getSpotifyToken, getAccessCode } from './Auth/auth';
import Profile from './Components/Profile';
import { setCookie, getCookie, deleteCookie } from './Utilities/Cookies';
import Login from './Components/Login'
function App() {
  const [results, setResults] = useState([]);
  const [playlistName, setPlaylistName] = useState('New Playlist');
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [Loading, setLoading] = useState(false);
  const [code, setCode] = useState('');
  const [token, setToken] = useState({});
  const [auth, setAuth] = useState(false);
  const [profile, setProfile] = useState({});
  let accessCode
  const _code = getCookie('_code');
  const userToken = getCookie('userToken');

  console.log('this is cookie code ' +_code)
  console.log('this is cookie token ' + userToken)
  
  useEffect(() => { 
    
    if (code){
      console.log('checking if code is there because it is = ' + code)
      return
    }
    if (_code){
      return setCode(_code);
     }
    if (code === ''){
      console.log('checking if code is empty string code:' + code)
       accessCode = getAccessCode();
    }
    if (accessCode){
      setCookie('_code', accessCode);
       setCode(accessCode);
       console.log('access code is ' +accessCode)
    }
  },[code])

  useEffect(() => {
    if (token.accessToken !== undefined){
      console.log('already got a token ' +token)
      setAuth(true)
      return
    }
    if (userToken !== undefined){
      console.log('wtf is the userToken '+userToken)
      setAuth(true)
      return setToken((prev)=>{
        return {
          ...prev,
          accessToken: 'bad token',
        }
      });
     }
    
    if (code !== ''){
      getSpotifyToken(code).then((data) => {
        
        if (data === 'invalid_grant'){
            console.log('The code was bad no token')
            console.log('bad code token is ' + token.accessToken)
            deleteCookie('_code')
        } 
        if (data.accessToken){
          setToken(data);
          setCookie('userToken',data.accessToken)
          setAuth(true)
          console.log('this is the data-' + data.scope);
         // console.log(`token.accessToken: ${data.accessToken}`)
        }
      })
    }
  }, [code])

  

  // useEffect(()=>{
  //    setProfile(()=>getProfile(token))
  //   console.log('this is profile -'+profile)
  // }, [token])


  const handleSearch = (searchTerm) => {
  getTracks(searchTerm, token.accessToken).then((data) => {
    //checking if api response returns an error
    if (!data.ok){
      console.log(data);//see response
        //this will log user out and delete old token
        if(data.status === 401){
          setAuth(false)
          deleteCookie('userToken')
          deleteCookie('_code');
        }
    }
    setResults(data);
    console.log(data);
  });
  }


  return (
    <div className="App">
        <header className="header">
            <Profile profile={profile} auth={auth}/>      
            <h1 className="title">Spotify ReactList</h1>
        </header>
        {auth && 
        <div className="container">
          <SearchBar token={token.accessToken} handleSearch={handleSearch}/>
            <div className="results-playlist">
               <SearchResults results={results}/>
              <Playlist auth={auth}/>
            </div>
        </div>
        }  { !auth &&
          <div className="container">
            <Login />
        </div>
        }
        
    </div>
  );
}

export default App;
