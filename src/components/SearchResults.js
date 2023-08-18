import React, { useState } from 'react';
import TrackList from './TrackList';

function SearchResults(props) {
    const{results} = props;
    const [loading, setLoading] = useState(false);

    return (
        <div>
            <div>
                <h2>Search Results</h2>
            </div>

            {loading && <p>Loading...</p>}
            
            <TrackList data={results} />
        </div>
    );
}


export default SearchResults

