const clientId = process.env.REACT_APP_CLIENT_ID;
const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
<<<<<<< HEAD
let redirectURI = window.location.origin + '/';
=======
const redirectURI = window.location.origin + '/';
>>>>>>> main

console.log(redirectURI)

export {clientId, clientSecret, redirectURI}