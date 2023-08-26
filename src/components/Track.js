import React from 'react'
import './track.css'

function Track(props) {
  const {track, addTrack} = props

  // const addTrack = () => {
  //   console.log('Add track:', track.name)
    
  // }

  return (
    <div className="track">
      <div className="track-header">
      <h3 className="track-title">{track.name}</h3>
      <img src={track.album.images[2].url} alt="album-cover"/>
      </div>
      
      <div className="track-details"> 
        <p>By: {track.artists[0].name} </p>
        <p> Album: <em>{track.album.name}</em></p>
        <button onClick={()=>{addTrack(track)}}>+</button>
      </div>
      <audio controls name="media"><source src={track.preview_url} type="audio/mpeg"/></audio>      
    </div>
  )
}

export default Track