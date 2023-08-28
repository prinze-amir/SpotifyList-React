const getTracks = async (searchTerm, token, next=null) => {
    
    let url  = `https://api.spotify.com/v1/search?q=${searchTerm}&type=track&limit=5`

    if (next){
         url  = next
    }
    const result = await fetch(url, { 
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token }
    });
    if (result.ok){
        const data = await result.json();
        console.log(data);
    return data.tracks;
    } else {
        console.log(result)
        return result
    }
     
}
const getPlaylistTracks = async (token, playlistId) => {
    
    let url  = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`

    const result = await fetch(url, { 
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token }
    });
    if (result.ok){
        const data = await result.json();
        console.log(data);
    return data.items;
    } else {
        console.log(result)
        return result
    }
     
}

const getUserPlaylist = async (token)=>{
    const url = `https://api.spotify.com/v1/me/playlists`

    const result = await fetch(url, {
            method: 'GET',
            headers: {'Authorization':'Bearer ' + token}
    })

    if (result.ok){
        const data = await result.json();
      //  console.dir(data);
    return data;
    } else {
        console.log(result)
        return result
    }

}

const createNewPlaylist = async (playlist, user_id, token )=>{

    const playlistUrl = `https://api.spotify.com/v1/users/${user_id}/playlists`

    const {name, tracks} = playlist

    // Step 1: Create a new playlist
    const playlistResponse = await fetch(playlistUrl, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name
        })
    });

    if (!playlistResponse.ok) {
        throw new Error('Failed to create playlist');
    }

    const playlistData = await playlistResponse.json();
    const playlistId = playlistData.id;
    const addTracksUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`

    // Step 2: Add tracks to the newly created playlist
    const addTracksResponse = await fetch( addTracksUrl, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            uris: tracks
        })
    });

        if (!addTracksResponse.ok) {
            throw new Error('Failed to add tracks to playlist');
        }
        const addTrackData = await addTracksResponse.json();

        const success = {
            playlistData,
            addTrackData
        }
        console.log('Playlist created and populated successfully');
        return success
}

const editUserPlaylist = async (playlist, token )=>{
    const {name, tracks, id, snapshot, deletedTracks} = playlist
    const url = `https://api.spotify.com/v1/playlists/${id}`
    const tracksUrl =`https://api.spotify.com/v1/playlists/${id}/tracks`
    let deleteData
    let trackData
    // Step 2: Add tracks to the newly created playlist
    const updateName = await fetch( url, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            public: true,
            collaborative: false,
          //  description:'test'
        })
    });

    if (!updateName.ok) {
        throw new Error('Failed to update playlist');
    }
    //const data = await updateName.json(); causing error
    if (deletedTracks.length > 0){
        const deleteTracks = await fetch(tracksUrl, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tracks:deletedTracks,
                snapshot_id:snapshot
            })
        })
        if(!deleteTracks.ok){
            throw new Error('Failed to delete tracks');
    
        }
         deleteData = await deleteTracks.json();
    }
   if (tracks.length > 0 ){
    const updateTracks = await fetch( tracksUrl, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
                uris: tracks,
                position: 0
        })
    });
    if (!updateName.ok) {
        throw new Error('Failed to update playlist tracks');
    }
     trackData = await updateTracks.json();
   }
    
    console.log(trackData)
    console.log('Playlist updated successfully');
    const success = {
        detailData:updateName,
        trackData,
        deleteData,
        success:true
    }

    return success
}


const getArtists = async (searchTerm, token) => {
    
    // try {
    //     const result = await fetch(`https://api.spotify.com/artists/0TnOYISbd1XYRBk9myaseg`, {
    //         method: 'GET',
    //         headers: { 'Authorization' : 'Bearer ' + token }
    //     });
    //     const data = await result.json();
    //     console.log(data);
    //     return data;

    // } catch (error) {
    //     console.log(error);
    // }
}


const getProfile = async (token) => {
        const result = await fetch('https://api.spotify.com/v1/me', {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token }
        });
        if (result.ok){
            const data = await result.json();
        return data;
        } else {
            console.log(result)
        return result
        }
       

}



export {getProfile, getArtists, getTracks, getUserPlaylist, createNewPlaylist, getPlaylistTracks, editUserPlaylist}

