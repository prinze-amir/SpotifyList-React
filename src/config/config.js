const clientId = process.env.REACT_APP_CLIENT_ID;
const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
const redirectURI = window.location.origin +'/SpotifyList-React/';
console.log(redirectURI)

export {clientId, clientSecret, redirectURI}