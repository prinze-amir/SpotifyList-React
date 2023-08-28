import React from 'react'
import './track.css'

function Track(props) {
  const {track, addTrack, showPlayer} = props

  return (
    <div className="track">
      <div className="track-header">
      <h3 className="track-title">{track.name}</h3>
      <img src={track.album.images[1].url} alt="album-cover"/>
      </div>
      
      <div className="track-details"> 
        <p>By: {track.artists[0].name} </p>
        <p> Album: <em>{track.album.name}</em></p>
        <button className="trackAdd" onClick={()=>{addTrack(track)}}>+</button>
      </div>
     
      {/* <audio controls name="media"><source src={track.preview_url} type="audio/mpeg"/></audio> */}
            <button className="playSong" aria-label="play song" onClick={()=>showPlayer(track)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
            </svg>
            </button>
    </div>
  )
}

export default Track