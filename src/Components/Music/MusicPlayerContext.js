import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const MusicPlayerContext = createContext();

export function MusicPlayerProvider({ children }) {
  const [currentSong, setCurrentSong] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [indexSong, setIndexSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);


  const audioRef = useRef(new Audio());

  useEffect(() => {
    if (currentSong) {
      audioRef.current.src = currentSong.audio_url;
      if (isPlaying) {
        audioRef.current.play();
      }
    } else {
      audioRef.current.pause();
    }
  }, [currentSong, isPlaying]);

  const playSong = (song, songList) => {
    console.log('Playing song:', song);
    console.log('Playlist:', songList);
    setCurrentSong(song);
    setPlaylist(songList);
    setIndexSong(songList.findIndex((item) => item._id === song._id));
    setIsPlaying(true);
  };

  const playNextSong = () => {
    const nextIndex = (indexSong + 1) % playlist.length;
    console.log('Playing next song:', playlist[nextIndex]);
    setCurrentSong(playlist[nextIndex]);
    setIndexSong(nextIndex);
  };

  const playPreviousSong = () => {
    const prevIndex = (indexSong - 1 + playlist.length) % playlist.length;
    console.log('Playing previous song:', playlist[prevIndex]);
    setCurrentSong(playlist[prevIndex]);
    setIndexSong(prevIndex);
  };

  const togglePlayPause = () => {
    console.log('Before toggle, isPlaying:', isPlaying);
    setIsPlaying(!isPlaying);
    console.log('After toggle, isPlaying:', !isPlaying);
  };

  return (
    <MusicPlayerContext.Provider value={{ currentSong, setCurrentSong, playlist, indexSong, setIndexSong, isPlaying, playSong, togglePlayPause, playNextSong, playPreviousSong }}>
      {children}
    </MusicPlayerContext.Provider>
  );
}

export function useMusicPlayer() {
  return useContext(MusicPlayerContext);
}