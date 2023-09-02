import './App.css';
import React, { useState, useEffect } from 'react';
import SearchBar from './Components/SearchBar';
import SearchResults from './Components/SearchResults';
import Playlist from './Components/Playlist';
import {getProfile, getTracks} from './Services/api'; 
import { getSpotifyToken, getAccessCode } from './Auth/auth';
import Profile from './Components/Profile';
import { setCookie, getCookie, deleteCookie } from './Utilities/Cookies';
function App() {
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState('')
  const [next, setNext] = useState('')
  const [addedTracks, setAddedTracks] = useState([]);
  const [warning,setWarning] = useState(false);
  const [code, setCode] = useState('');
  const [token, setToken] = useState({});
  const [auth, setAuth] = useState(false);
  const [profile, setProfile] = useState({});
  const [frameSrc, setFrameSrc] = useState('')

  let accessCode
  const _code = getCookie('_code');
  const userToken = getCookie('userToken');
  //const user = getProfile(userToken)
  //get and set code
  useEffect(() => { 

    if (code){
      return
    }
    if (_code){
      return setCode(_code);
     }
    if (code === ''){
       accessCode = getAccessCode();
    }
    if (accessCode){
      setCookie('_code', accessCode);
       setCode(accessCode);
       console.log('access code is ' +accessCode)
    }
  },[code])
  //set token
  useEffect(() => {
    if (token.accessToken !== undefined){
      console.log('already got a token ' +token)
      setAuth(true)
      return
    }
    if (userToken !== undefined){
      console.log(' userToken is '+userToken)
      setAuth(true)
      return setToken((prev)=>{
        return {
          ...prev,
          accessToken: userToken,
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

  //set profile if user is authenticated
  useEffect(()=>{
    //make the async api call and which receives a promise and then set profile
    if (!auth || Object.keys(profile).length === 0){
      const user = getProfile(userToken).then(data=>{
        setProfile(data)
      })
    }

    
    const header = document.querySelector('header')
    auth ? header.style.height = '40vh': header.style.height = '100vh'
     
  },[auth])

  useEffect(() => {
    return () => {
      clearTimeout();
    };
  }, []);

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
      setSearch(searchTerm);
      setResults(data.items);
      setNext(data.next)
    //  console.log(data);
    });
  }

  const loadMore =()=>{
     
     if (next === null){
      console.log('no more tracks')
      return 'No More Tracks'
     }
    getTracks(search, token.accessToken, next ).then((data) => {
      //checking if api response returns an error
      if (!data.ok){
          //this will log user out and delete old token
          if(data.status === 401){
            setAuth(false)
            deleteCookie('userToken')
            deleteCookie('_code');
          }
      }
      setResults(data.items);
      setNext(data.next)
     // console.log(data);  
    })
}

  const addTrack = (track)=>{

    const trackExists = addedTracks.some(existingTrack => existingTrack.id === track.id);

    if (!trackExists) {
      setAddedTracks((prev)=>[...prev, track])
    } else {
      setWarning(true)
       setTimeout(()=>{
        setWarning(false)
      }, 3000)
      //clearInterval(timer);
      console.log('Track is already in the playlist');
    }
  }

  const removeTrack = (track)=>{

    setAddedTracks(prev => prev.filter(playListTrack => playListTrack.id !== track.id));

  }

  const removeAll = ()=>{
    setAddedTracks([])
  }

  const showPlayer = (track)=>{
    console.log(track)
    const frameUrl = `https://open.spotify.com/embed/track/${track.id}`
    setFrameSrc(frameUrl)
    document.getElementById('embed-iframe').style.display = 'block'

  }

  const hidePlayer = ()=>{
    document.getElementById('embed-iframe').style.display = 'none'
  }

  return (
    <div className="App">
        <header className="header">
        <h1 className="title">PlayMySong</h1>
            <Profile profile={profile} auth={auth}/>      
        </header>
        {auth && 
        <div className="container">

          <SearchBar token={token.accessToken} handleSearch={handleSearch} />
          {<div id="embed-iframe" onClick={hidePlayer}>
              <button className="close" onClick={hidePlayer} >x</button>
              <iframe className="embedPlayer" title="spotifyEmbed" src={frameSrc} width="500" height="550" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
          </div>}
            <div className="results-playlist">
               <SearchResults 
                  results={results} 
                  addTrack={addTrack} 
                  loadMore={loadMore}
                  showPlayer={showPlayer}
               />
              <Playlist profile={profile} auth={auth} addedTracks={addedTracks} warning={warning} removeTrack={removeTrack} token={token} removeAll={removeAll} />
            </div>
        </div>
        }  
       
    </div>
  );
}

export default App;
