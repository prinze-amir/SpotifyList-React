import logo from './logo.svg';
import './App.css';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Playlist from './components/Playlist';
import TrackList from './components/TrackList';
import Track from './components/Track';
import token from './services/api'; 

function App() {
  return (
    <div className="App">
        <img src={logo} className="App-logo" alt="logo" />       
        <SearchBar />
        <SearchResults />
        <Playlist />
        <TrackList />
        <Track />
  
    </div>
  );
}

export default App;
