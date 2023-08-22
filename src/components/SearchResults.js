import React, { useState } from 'react';
import TrackList from './TrackList';

function SearchResults(props) {
    const{results} = props;
    const [loading, setLoading] = useState(false);

    return (
        <div>
            <div className="results">

            {loading && <p>Loading...</p>}
            
            <TrackList data={results} />
            </div>

        </div>
    );
}


export default SearchResults

