import React from 'react'
import { spotifyAuth } from '../Auth/auth'

function Login() {
  return (
    <div className="login">
        <h1>Login to your services</h1>
        <button className="button spotify" onClick={spotifyAuth}>Spotify</button>
    </div>
  )
}

export default Login