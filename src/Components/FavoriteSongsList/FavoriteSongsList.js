import React, { useState, useEffect } from "react";
import "./FavoriteSongsList.css";
import { useMusicPlayer } from "../Music/MusicPlayerContext";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

const FavoriteSongsList = () => {
  const [favorites, setFavorites] = useState([]);

  const { playSong, togglePlayPause, currentSong, isPlaying } =
    useMusicPlayer();

  useEffect(() => {
    const fetchFavorites = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          "https://academics.newtonschool.co/api/v1/music/favorites/like",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              projectID: "f104bi07c490",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("data", data);
          setFavorites(data.data);
        } else {
          console.error("Failed to fetch favorites");
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, []);

  const handlePlaySong = (song) => {
    if (currentSong && song._id === currentSong._id && isPlaying) {
      togglePlayPause();
    } else {
      playSong(song, favorites.songs);
    }
  };

  const filterUniqueSongs = (songs) => {
    const uniqueSongs = [];
    const uniqueSongIds = new Set();

    if (songs && Array.isArray(songs)) {
      songs.forEach((song) => {
        if (!uniqueSongIds.has(song._id)) {
          uniqueSongIds.add(song._id);
          uniqueSongs.push(song);
        }
      });
    }

    return uniqueSongs;
  };

  const uniqueSongs = filterUniqueSongs(favorites.songs);

  return (
    <div style={{ marginTop: "4rem" }}>
      <h2>Liked Songs</h2>
      <table>
        <tbody>
          {uniqueSongs.map((song, index) => (
            <tr className="trclass" key={song.id}>
              <td className="tdclass">
                <img
                  src={song.thumbnail}
                  alt={song.title}
                  style={{ width: "40px", height: "40px", marginRight: "10px" }}
                />
                <div
                  className="playbutton"
                  onClick={() => handlePlaySong(song)}
                >
                  {currentSong && song._id === currentSong._id && isPlaying ? (
                    <PauseIcon />
                  ) : (
                    <PlayArrowIcon />
                  )}
                </div>
                {song.title}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FavoriteSongsList;
