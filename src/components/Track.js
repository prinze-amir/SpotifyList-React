import React from 'react'
import './track.css'

function Track(props) {
  const {track} = props

  const addTrack = (track) => {
    console.log('Add track:', track.name)
    
  }

  return (
    <div className="track">
      <h3 className="track-title">{track.name}</h3>
      <div className="track-details"> 
        <p>By: {track.artists[0].name} </p>
        <p> Album: <em>{track.album.name}</em></p>
        <button onClick={addTrack}>+</button>
      </div>
      
    </div>
  )
}

export default Track