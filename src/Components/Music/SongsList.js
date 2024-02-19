import React from "react";
import { useMusicPlayer } from "../Music/MusicPlayerContext";
import "./SongsList.css";

function SongsList({ searchResults }) {
  const { currentSong, isPlaying, playSong, togglePlayPause } =
    useMusicPlayer();

  const results = searchResults ?? [];

  const handlePlayPause = (song) => {
    if (currentSong && currentSong._id === song._id) {
      togglePlayPause();
    } else {
      playSong(song, results);
    }
  };

  return (
    <div className="song-list-overlay">
      <div className="songs-list">
        {results.length === 0 ? (
          <p>No songs found</p>
        ) : (
          <ul>
            {results.map((song) => (
              <li key={song.id} onClick={() => handlePlayPause(song)}>
                <img
                  src={song.thumbnail}
                  alt={song.title}
                  className="song-thumbnail"
                />
                <span style={{ fontSize: "13px" }}>{song.title}</span>
                {currentSong && currentSong._id === song._id && (
                  <span className="play-pause-icon">
                    {isPlaying ? (
                      <i
                        className="fa fa-pause-circle"
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePlayPause();
                        }}
                      ></i>
                    ) : (
                      <i
                        className="fa fa-play-circle"
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePlayPause();
                        }}
                      ></i>
                    )}
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SongsList;
