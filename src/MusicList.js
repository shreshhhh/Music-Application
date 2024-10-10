import React from 'react';
import './index.css';

const MusicItem = ({ song, deleteSong, editSong }) => (
  <div>
    <h3>{song.songname}</h3>
    <p>Artist: {song.artist}</p>
    <p>Album: {song.album || 'N/A'}</p>
    <p>Genre: {song.genre || 'N/A'}</p>
    <button onClick={() => editSong(song)}>Edit</button>
    <button onClick={() => deleteSong(song.id)}>Delete</button>
  </div>
);

const MusicList = ({ songs, deleteSong, editSong }) => (
  <div className="music-list">
    {songs.map((song) => (
      <MusicItem
        key={song.id}
        song={song}
        deleteSong={deleteSong}
        editSong={editSong}
      />
    ))}
  </div>
);

export default MusicList;
