import React from 'react'
import { spotifyAuth } from '../Auth/auth'

function Profile(props) {

  return (
    <div className="profile">
            <img className="profile-img" src="/resources/images/demo-profile.jpg" alt="profile" />
            <p className='name'>Prince Amir</p>
            <button onClick={spotifyAuth}>Login to Spotify</button>
    </div>
  )
}

export default Profile