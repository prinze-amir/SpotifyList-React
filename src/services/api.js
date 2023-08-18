import { useEffect, useState } from 'react';
import {clientId, clientSecret} from '../config.js'
//const redirectUri = 'http://localhost:3000/';

    // const [token, setToken] = useState('');

    // useEffect(() => {

    //     const getToken = async () => {

    //         const result = await fetch('https://accounts.spotify.com/api/token', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type' : 'application/x-www-form-urlencoded',
    //                 'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
    //             },
    //             body: 'grant_type=client_credentials'
    //         });
        
    //         const data = await result.json();
    //         console.log(data);
    //         return data.access_token;
    //     }
    //     setToken(getToken());

    //     const intervealID = setInterval(() => {
    //         setToken(getToken());
    //     }   , 1000 * 60 * 60 );

    //     return () => clearInterval(intervealID);

    // }, []);

const getToken = async () => {

    const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });

    const data = await result.json();
    console.log(data);
    return data.access_token;
    
}

const token = await getToken();

const getArtists = async (searchTerm) => {
    
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

const getTracks = async (searchTerm) => {

    try {
        const result = await fetch(`https://api.spotify.com/v1/search?q=${searchTerm}&type=track`, { 
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token }
        });
        const data = await result.json();
        console.log(data);
        return data.tracks.items;
    } catch (error) {
        console.log(error);
    }
     
}


const getProfile = async () => {
    // try {
    //     const result = await fetch('https://api.spotify.com/v1/me', {
    //        // method: 'GET',
    //         headers: { 'Authorization' : 'Bearer ' + token }
    //     });
    //     const data = await result.json();
    //     console.log(data);
    //     return data;
    // } catch (error) {
    //     console.log(error);
        
    // }

}
    

export {getProfile, getArtists, getTracks, token}

