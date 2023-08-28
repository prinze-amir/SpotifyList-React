import React from 'react'
import Track from './Track'
import './track.css'

function TrackList(props) {
  const {data, addTrack, showPlayer} = props

 
  if (!data) {
    return <p>Loading</p>
  }

  return (
    <div className="tracklist">
      <ul className="result-list">
      {data.map((track) => (  
        <li className="list-item" key={track.id}>
          <Track key={track.id} track={track} addTrack={addTrack} showPlayer={showPlayer} />
        </li>
      ))}
      </ul>

    </div>
  )
}

export default TrackList