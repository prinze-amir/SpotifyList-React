const clientId = process.env.REACT_APP_CLIENT_ID;
const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
let redirectURI = window.location.origin + '/';

console.log(redirectURI)

export {clientId, clientSecret, redirectURI}