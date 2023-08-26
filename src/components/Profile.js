import { useEffect, useState } from 'react'
import React from 'react'
import { spotifyAuth } from '../Auth/auth'

function Profile(props) {
  const {profile, auth} = props
  const images = profile.images
  const defaultImageSrc = "/resources/images/demo-profile.jpg"
  let imageSrc

  images ? imageSrc = images[1].url : imageSrc = defaultImageSrc
  console.log(profile)

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
          <button className="button" onClick={spotifyAuth}>Login to Spotify</button>
  </div>
)
}

export default Profile