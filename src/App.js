import logo from './logo.svg';
import './App.css';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Playlist from './components/Playlist';
import TrackList from './components/TrackList';
import Track from './components/Track';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
       
        <SearchBar />
      <SearchResults />
      <Playlist />
      <TrackList />
      <Track />
      </header>
      
  
    </div>
  );
}

export default App;
