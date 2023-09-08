import {clientId, clientSecret, redirectURI} from '../config/config.js'
import { setCookie, deleteCookie, getCookie } from '../Utilities/Cookies.js'; 

const spotifyAuth = async () => {
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);
  setCookie('verifier', verifier)
  const CLIENT_ID = clientId;
  const REDIRECT_URI = redirectURI;
  const SCOPES = ['playlist-modify-public', 'playlist-modify-private', 'user-read-private', 'user-read-email', 'user-library-read', 'user-library-modify', 'user-top-read',  'streaming'];


const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES.join(' '))}&response_type=code&show_dialog=true&code_challenge_method=S256&code_challenge=${challenge}`;
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
} else {
  console.log('No authorization code found in the URL');
  return undefined
}
}

const getSpotifyToken = async (code) => {
      const verifier = getCookie('verifier')
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
        },
        body: `grant_type=authorization_code&code=${code}&redirect_uri=${encodeURIComponent(redirectURI)}&code_verifier=${verifier}`,
      });
      if (response.ok) {
      
        const data = await response.json();
        return {
          scope: data.scope,
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

function generateCodeVerifier(length) {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
}
export  {spotifyAuth, getSpotifyToken, getAccessCode}