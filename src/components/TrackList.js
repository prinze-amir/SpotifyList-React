import React from 'react'
import Track from './Track'
function TrackList(props) {
  const {data} = props

  if (!data) {
    return <p>Loading</p>
  }

  return (
    <div>
      <h2>Tracks</h2>
      <ul>
      {data.map((track) => (  
        <li>
          <Track key={track.id} track={track} />
        </li>
      ))}
      </ul>
      
    </div>
  )
}

export default TrackList