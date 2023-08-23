import React from 'react'
import { spotifyAuth } from '../Auth/auth'

function Profile(props) {
  const {profile, auth} = props
if (auth){
  return (
    <div className="profile">
            
            <img className="profile-img" src="/resources/images/demo-profile.jpg" alt="profile" />
            <p className='name'>Prince Amir</p>
    </div>
  )
}
return (
  <div className="profile">
          <button className="button" onClick={spotifyAuth}>Login to Spotify</button>
  </div>
)
}

export default Profile