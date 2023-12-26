import React, { useEffect } from 'react'
import { useState } from 'react'
import { createNewPlaylist, getUserPlaylist, getPlaylistTracks, editUserPlaylist } from '../services/api';
import defaultImg from '../images/defaultPlaylistImage.png'
import Footer from './Footer';

function Playlist(props) {
    const [currentPlaylist, setCurrentPlaylist] = useState({})
    const [playlistName, setPlaylistName] = useState('');
    const [deletedTracks, setDeletedTracks] = useState([])
    const [playlistNameEdit, setPlaylistNameEdit] = useState('');
    const [showNewList, setShowNewList] = useState(false);
    const [editingList, setEditingList] = useState(false);
    const [message, setMessage] = useState('')
    const [addedPlaylist, setAddedPlaylist] = useState(false)//consider removing this
    const [userPlaylists, setUserPlaylists] = useState([]);
    const [playlistTracks, setPlaylistTracks] = useState([])
    const {addedTracks, warning, removeTrack, removeAll, token, profile} = props
     //this will refresh my list list after adding newly created playlist
     useEffect(()=>{
        
        getUserPlaylist(token.accessToken).then(lists=>{
            setUserPlaylists(lists.items)
            console.dir(userPlaylists)
        })
       

},[])
    const handleClick = () => {
        setShowNewList(true)
            setEditingList(false)
    }

    const handleSave = () =>{
        
        const tracks = addedTracks.map(track=>(track.uri))
        if (tracks.length === 0){
            setMessage('Please add tracks')
            setTimeout(()=>{
             setMessage('')
           }, 3000)            
           return 
        }
        if (playlistName === ''){
            setMessage('Enter playlist name')
            setTimeout(()=>{
             setMessage('')
           }, 3000)            
           return 
        }
        // make the new playlist object
        const playlist = {
            name:playlistName,
            tracks:tracks
        }
        const user = profile.id

         createNewPlaylist(playlist, user, token.accessToken).then(data=>{
            console.log(data)
            if (data.playlistData){
                setAddedPlaylist(true)
                setPlaylistName('')
                removeAll()
                setShowNewList(false)
            }
            getUserPlaylist(token.accessToken).then(lists=>{
                setUserPlaylists(lists.items)
               // console.dir(userPlaylists)
            })
        })
    }
    const handleSaveEdits = ()=>{
        
        const newTracks = addedTracks.map(track=>(track.uri))
        const oldTracks = playlistTracks.map(track=>(track.track.uri))
       
        console.log(`all new - `+newTracks)     
        console.log(`all old - `+oldTracks)     
       
        if (playlistNameEdit === ''){
            setMessage('Enter playlist name')
            setTimeout(()=>{
             setMessage('')
           }, 3000)            
           return 
        }
        // make the new playlist object
        const playlist = {
            name:playlistNameEdit,
            tracks: newTracks,
            id: currentPlaylist.id,
            snapshot: currentPlaylist.snapshot_id,
            deletedTracks:deletedTracks
        }
       
        editUserPlaylist(playlist, token.accessToken).then(data=>{
            console.log(data)
            if (data.success){
                setAddedPlaylist(true)
                removeAll()
                setEditingList(false)
                getUserPlaylist(token.accessToken).then(lists=>{
                    setUserPlaylists(lists.items)
                    console.dir(userPlaylists)
                })

            }

        })
    }
    const editPlaylist = (index)=>{
        console.log(userPlaylists[index])
        setShowNewList(false)
        setEditingList(true)
        setCurrentPlaylist(userPlaylists[index])
        getPlaylistTracks(token.accessToken, userPlaylists[index].id ).then(data=>{
          
            setPlaylistTracks(data)
            setPlaylistNameEdit(userPlaylists[index].name)
          //  console.log(playlistTracks)
        })
    }
    const removeOldTrack = (track)=>{
        console.log(track)
        setDeletedTracks((prev)=>{
            return [
                ...prev,
                {uri:track.track.uri}
            ]
        })
        console.log(deletedTracks)
        setPlaylistTracks(prev => prev.filter(item => item.track.id !== track.track.id));
    }
    const showList = () =>{
        const list = document.getElementById('myplaylists')
        list.style.display = 'block'
        document.location.href = '#myplaylists';
    }
   

  return (
    <div className="playlist-main">
    <div className="playlists-container">
      <div id="myplaylists" className="myPlaylists">
        {
          userPlaylists &&  userPlaylists.map((list,index)=>(
                <div className="playlist" key={'div-'+list.id} onClick={()=>editPlaylist(index)}>
                    <img key={'img-'+list.id} src={list.images[1] ? list.images[0].url:defaultImg} alt='playlist-img' />
                <h2 key={'h2-'+list.id}>{list.name}</h2>
                <p key={'span'+list.id}>{list.tracks.total} Songs</p>
                </div>
            ))
        }
       
        </div>
        <button className="button-playlist" onClick={handleClick}>Create New Playlist</button>
        { showNewList&&
            <div id="newList" className="newPlaylists">
                <input name='playlistName' value={playlistName} placeholder="enter playlist name" onChange={(e) => setPlaylistName(e.target.value)} />
                
                {addedTracks && <div className="new-list">
                    <ul>
                    {addedTracks.map((track) => (  
                        <li className="list-item" key={track.id}>
                        {track.name}
                        <button style={styles.remove} onClick={()=>removeTrack(track)}>X</button>
                        </li>
                    ))}
                    </ul>
                    {warning ? <p className='warning'>track already exists!</p>: <span></span>}
                </div>}
                <span style={{color:'red'}}>{message}</span>
                 <button  style={styles.button} className="playlist-save" onClick={handleSave}>SAVE</button>
            </div>  
        }    
        { editingList &&
            <div id="editList" className="newPlaylists">
                <input name='playlistName' value={playlistNameEdit} placeholder="edit playlist name" onChange={(e) => setPlaylistNameEdit(e.target.value)} />
                
                {playlistTracks && <div className="new-list">
                    <ul>
                    {playlistTracks.map((track) => (  
                        <li className="list-item" key={track.track.id}>
                        {track.track.name}
                        <button style={styles.remove} key={`button-${track.track.id}`} onClick={()=>removeOldTrack(track)}>X</button>
                        </li>
                    ))}
                    {addedTracks.map((track) => (  
                        <li className="list-item" key={`edit-add-${track.id}`}>
                        {track.name}
                        <button style={styles.remove} key={`edit-add-button-${track.id}`} onClick={()=>removeTrack(track)}>X</button>
                        </li>
                    ))}
                    </ul>
                    {warning ? <p className='warning'>track already exists!</p>: <span></span>}
                </div>}
                <span style={{color:'red'}}>{message}</span>
                 <button  style={styles.button} className="playlist-save" onClick={handleSaveEdits}>SAVE</button>
            </div>  
        }    
       
    </div>
    <Footer showList={showList} newList={handleClick}/>

    </div>

  )
}
const styles = {
    playlists: {
    
    },
    remove:{
        backgroundColor: 'black',
        border: 'none',
        cursor: 'pointer',
        color: '#fff',
        padding:'3px 6px',
    },
    button: {
        padding:'10px',
        borderRadius:'15px',
        border:'none',
        width:'auto'
    }
}
export default Playlist