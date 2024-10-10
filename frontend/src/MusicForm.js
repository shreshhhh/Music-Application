import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MusicForm = ({ fetchSongs, selectedSong, setSelectedSong }) => {
  const [formData, setFormData] = useState({
    songname: '',
    artist: '',
    album: '',
    genre: ''
  });

  useEffect(() => {
    if (selectedSong) {
      setFormData(selectedSong); 
    } else {
      setFormData({
        songname: '',
        artist: '',
        album: '',
        genre: ''
      });
    }
  }, [selectedSong]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedSong) {
      axios.put(`http://localhost:3001/music/${selectedSong.id}`, formData)
        .then(() => {
          fetchSongs();
          setSelectedSong(null); 
        })
        .catch(err => console.error(err));
    } else {
      axios.post('http://localhost:3001/music', formData)
        .then(() => {
          fetchSongs();
          setFormData({ songname: '', artist: '', album: '', genre: '' }); 
        })
        .catch(err => console.error(err));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="songname"
        placeholder="Song Name"
        value={formData.songname}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="artist"
        placeholder="Artist"
        value={formData.artist}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="album"
        placeholder="Album"
        value={formData.album}
        onChange={handleChange}
      />
      <input
        type="text"
        name="genre"
        placeholder="Genre"
        value={formData.genre}
        onChange={handleChange}
      />
      <div style={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
        <button type="submit">
          {selectedSong ? 'Update Song' : 'Add Song'}
        </button>
        {selectedSong && (
          <button 
            type="button" 
            onClick={() => setSelectedSong(null)} 
            style={{ backgroundColor: '#dc3545', marginTop: '5px' }}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default MusicForm;