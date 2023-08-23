const getTracks = async (searchTerm, token) => {
    console.log(token);
    console.log(searchTerm);


    const result = await fetch(`https://api.spotify.com/v1/search?q=${searchTerm}&type=track&limit=7`, { 
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token }
    });
    if (result.ok){
        const data = await result.json();
        console.log(data);
    return data.tracks.items;
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
    try {
        const result = await fetch('https://api.spotify.com/v1/me', {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token }
        });
        const data = await result.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        
    }

}



export {getProfile, getArtists, getTracks}

