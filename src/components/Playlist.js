import React from 'react'
import { useState } from 'react'

function Playlist(props) {
    const [playlistName, setPlaylistName] = useState('')
    const [show, setShow] = useState(false);
    const handleClick = () => {
        console.log('playlistclick')
        setShow(true)
    }
    const handleSave = () =>{

    }
  return (
    <div className="playlists">
        <button className="button-playlist" onClick={handleClick}>Create New Playlist</button>
        { show &&
            <div className="playlists">
                <input value={playlistName} placeholder="enter playlist name" onChange={(e) => setPlaylistName(e.target.value)} />
                <div className="empty">

                </div>
                 <button  style={styles.button} className="Playlist-save" onClick={handleSave}>SAVE TO SPOTIFY</button>

            </div>
                
        }    
       
    </div>

  )
}
const styles = {
    playlists: {
    
    },
    button: {
        padding:'10px',
        borderRadius:'15px',
        border:'none',
        width:'auto'
    }
}
export default Playlist