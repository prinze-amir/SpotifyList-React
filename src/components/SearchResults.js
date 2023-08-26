import React, { useState } from 'react';
import TrackList from './TrackList';

function SearchResults(props) {
    const{results, addTrack, loadMore} = props;
   
    if (results === undefined) {
        return 
    }
    if (results !== undefined ){
        
    
        return (
            <div>
                {results.length >0 && 
                <div className="results">
                    <TrackList data={results} addTrack={addTrack} 
                    loadMore={loadMore}/>
                    <button className="loadMore" onClick={loadMore}>Load Please</button>
                </div>
    }
            </div>
        );
    }
}

export default SearchResults

