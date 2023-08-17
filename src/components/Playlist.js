import React from 'react'
import { useState } from 'react'

function Playlist() {
    const handleClick = () => {
        console.log('playlistclick')
    }
  return (
    <div>
        Playlist
        <button  style={styles.button} className="Playlist-save" onClick={handleClick}>SAVE TO SPOTIFY</button>
    </div>

  )
}
const styles = {
    playlists: {
    
    },
    button: {
        padding:'15px',
        borderRadius:'15px',
    }
}
export default Playlist