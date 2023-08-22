import React from 'react'
import { useState } from 'react'

function Playlist() {
    const [playlistName, setPlaylistName] = useState('')
    const handleClick = () => {
        console.log('playlistclick')
    }
  return (
    <div className="playlists">
        <button>Create New Playlist</button>
        <input value={playlistName} placeholder="playlist name" onChange={(e) => setPlaylistName(e.target.value)} />
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