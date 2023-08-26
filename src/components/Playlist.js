import React, { useEffect } from 'react'
import { useState } from 'react'
import { getUserPlaylist } from '../Services/api';

function Playlist(props) {
    const [playlistName, setPlaylistName] = useState('');
    const [show, setShow] = useState(false);
    const [playlists, setPlaylists] = useState([]);
    const {playlistTracks, warning, removeTrack, token} = props

    const handleClick = () => {
        console.log('playlistclick')
        setShow(true)
    }
    const handleSave = () =>{

    }
    useEffect(()=>{
        if(token){

            getUserPlaylist(token.accessToken).then(lists=>{
                setPlaylists(lists.items)
                console.dir(playlists)
            })
        }
        
    }, [])

  return (
    <div className="playlists">
        <h2>My Playlists</h2>
      <div className="myPlaylists">
        {
          playlists &&  playlists.map(list=>(
                <div className="playlist" key={'div-'+list.id}>
                    <img key={'img-'+list.id} src={list.images[1].url} alt='playlist-img' />
                <h2 key={'h2-'+list.id}>{list.name}</h2>
                <p key={'span'+list.id}>{list.tracks.total} Songs</p>
                </div>
            ))
        }
       
        </div>
        <button className="button-playlist" onClick={handleClick}>Create New Playlist</button>
        { show &&
            <div className="playlists">
                <input value={playlistName} placeholder="enter playlist name" onChange={(e) => setPlaylistName(e.target.value)} />
                
                {playlistTracks && <div className="new-list">
                    <ul>
                    {playlistTracks.map((track) => (  
                        <li className="list-item" key={track.id}>
                        {track.name}
                        <button styles={styles.remove} onClick={()=>removeTrack(track)}>X</button>
                        </li>
                    ))}
                    </ul>
                    {warning ? <p className='warning'>track already exists!</p>: <span></span>}
                </div>}
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