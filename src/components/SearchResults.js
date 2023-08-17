import React, { useState } from 'react';
//import axios from 'axios';

function SearchResults() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${query}`);
            setResults(response.data);
        } catch (err) {
            setError('Failed to fetch results. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search..."
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            {loading && <p>Loading...</p>}
            
            {error && <p>{error}</p>}

            <ul>
                {results.map(result => (
                    <li key={result.id}>{result.title}</li>
                ))}
            </ul>
        </div>
    );
}


export default SearchResults

