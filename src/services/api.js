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

const getUserPlaylist = async (token)=>{
    const url = `https://api.spotify.com/v1/me/playlists`

    const result = await fetch(url, {
            method: 'GET',
            headers: {'Authorization':'Bearer ' + token}
    })

    if (result.ok){
        const data = await result.json();
        console.dir(data);
    return data;
    } else {
        console.log(result)
        return result
    }

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
            console.dir(data)
        console.log('this is the profile data-'+data);
        return data;
        } else {
            console.log(result)
        return result
        }
       

}



export {getProfile, getArtists, getTracks, getUserPlaylist}

