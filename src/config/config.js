const clientId = process.env.REACT_APP_CLIENT_ID;
const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
const redirectURI = window.location.href
// const ENV = process.env;
// console.dir(ENV)
// if (ENV.NODE_ENV === 'development'){
//     redirectURI = 'http://localhost:3000/'
// } else {
//     redirectURI = 'https://prinze-amir.github.io/SpotifyList-React/'
// }
console.log(redirectURI)

export {clientId, clientSecret, redirectURI}