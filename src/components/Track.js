import React from 'react'

function Track(props) {
  const {track} = props
  return (
    <div>
      <h2>{track.name}</h2>
      <p>{track.artists[0].name}</p>
      <p>{track.album.name}</p>
    </div>
  )
}

export default Track