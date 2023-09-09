import React from 'react'
import { spotifyAuth } from '../Auth/auth'
import defaultImageSrc from '../images/demo-profile.jpg'

function Profile(props) {
  const {profile, auth} = props
  const images = profile.images
  let imageSrc

  images ? imageSrc = images[1].url : imageSrc = defaultImageSrc

if (auth){
  return (
    <div className="profile">
            
            <img className="profile-img" src={imageSrc} alt="profile" />
            <p className='name'>{profile.display_name}</p>
    </div>
  )
}
return (
  <div className="profile">
          <button className="login-button" onClick={spotifyAuth}>Login to Spotify</button>
  </div>
)
}

export default Profile