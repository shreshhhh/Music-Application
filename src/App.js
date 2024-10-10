import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MusicForm from './MusicForm';
import MusicList from './MusicList';
import './index.css';
import Footer from './Footer';

const App = () => {
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);

  const fetchSongs = () => {
    axios.get('http://localhost:3001/music')
      .then(res => setSongs(res.data.music))
      .catch(err => console.error(err));
  };

  const deleteSong = (id) => {
    axios.delete(`http://localhost:3001/music/${id}`)
      .then(() => fetchSongs()) 
      .catch(err => console.error(err));
  };

  const editSong = (song) => {
    setSelectedSong(song);
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <div>
      <h1>Music Library</h1>
      <MusicForm 
        fetchSongs={fetchSongs} 
        selectedSong={selectedSong} 
        setSelectedSong={setSelectedSong} 
      />
      <MusicList 
        songs={songs} 
        deleteSong={deleteSong} 
        editSong={editSong} 
      />
      <Footer/>
    </div>
  );
};

export default App;


