import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import {
  PlayArrow,
  Pause,
  Favorite,
  FavoriteBorder,
} from "@mui/icons-material";

function DisplaySongs({ album }) {
  const [isPlaying, setIsPlaying] = useState(
    Array(album.songs.length).fill(false)
  );
  const [audioElements, setAudioElements] = useState(
    Array(album.songs.length).fill(null)
  );

  // Function to toggle play/pause for a song
  const togglePlay = (index) => {
    setIsPlaying((prevIsPlaying) => {
      const newIsPlaying = [...prevIsPlaying];
      newIsPlaying[index] = !newIsPlaying[index];

      if (newIsPlaying[index]) {
        audioElements[index].play();
      } else {
        audioElements[index].pause();
      }

      return newIsPlaying;
    });
  };

  return (
    <TableContainer component={Card}>
      <Table>
        <TableHead>
          <TableRow>
            {/* <TableCell>Song</TableCell>
            <TableCell>Actions</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {album.songs.map((song, index) => (
            <TableRow key={song._id}>
              <TableCell>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={song.thumbnail}
                    alt={song.title}
                    style={{
                      width: "40px",
                      height: "40px",
                      marginRight: "10px",
                    }}
                  />
                  <div>{song.title}</div>
                </div>
              </TableCell>
              <TableCell>
                <IconButton onClick={() => togglePlay(index)}>
                  {isPlaying[index] ? <Pause /> : <PlayArrow />}
                </IconButton>
                <audio
                  ref={(audio) => (audioElements[index] = audio)}
                  src={song.audio_url}
                  preload="auto"
                ></audio>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DisplaySongs;
