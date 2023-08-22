import {clientId, clientSecret, redirectURI} from '../config.js'

const spotifyAuth = () => {
const CLIENT_ID = clientId;
const REDIRECT_URI = redirectURI;
const SCOPES = ['playlist-modify-public', 'playlist-modify-private', 'user-read-private', 'user-read-email', 'user-library-read', 'user-library-modify', 'user-top-read'];

const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES.join(' '))}&response_type=code&show_dialog=true`;

// Redirect the user to this URL
window.location.href = authUrl;
}

const getAccessCode  =() => {
  // Extract the code from the URL
const urlParams = new URLSearchParams(window.location.search);
const authorizationCode = urlParams.get('code');

// If there's a code, set it in state (and possibly initiate the token fetch)
if (authorizationCode) {
  return authorizationCode
  // You can also initiate your fetchTokens function here
  // fetchTokens(authorizationCode).then(...)
  //console.log(`code: ${code}`)

} else {
  console.error('No authorization code found in the URL');
  return undefined
}
}

const getSpotifyToken = async (code) => {
    
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
        },
        body: `grant_type=authorization_code&code=${code}&redirect_uri=${encodeURIComponent(redirectURI)}`,
      });
      if (response.ok) {
      
        const data = await response.json();
        return {
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
          expiresIn: data.expires_in,
        };      
      } else {
        const data = await response.json();

        console.log(data.error);
        return data.error
      }
   
        
}

export  {spotifyAuth, getSpotifyToken, getAccessCode}