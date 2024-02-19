import React, { useState, useEffect } from "react";
import "./RandomAlbumGrid.css";
import SongList from "../Music/SongList";
import { Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function RandomAlbumGrid() { // initializes state used to manage and update the state of a component.
  const [randomAlbums, setRandomAlbums] = useState([]); 
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const navigate = useNavigate();

  useEffect(() => { // useEffect to fetch random albums on component mount(mount means that the code inside the useEffect function will be executed after the component has been initially rendered in the DOM.)
    fetch("https://academics.newtonschool.co/api/v1/music/album?limit=300", {
      headers: {
        projectId: "f104bi07c490",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        const allAlbums = res.data; //Once the response is received, the JSON data is extracted, representing all the albums.

        const albumSections = []; //The albums are organized into sections, each containing 25 albums.
        for (let i = 0; i < allAlbums.length; i += 25) {
          albumSections.push(allAlbums.slice(i, i + 25));
        }
        const randomSection = Math.floor(Math.random() * albumSections.length); //A random section is chosen to ensure a different set of albums is displayed each time the component renders.
        const albumsToShow = albumSections[randomSection];
        setRandomAlbums(albumsToShow); //The selected albums from the random section are stored in the randomAlbums state using the setRandomAlbums function. This triggers a re-render, updating the UI to show the chosen albums.
      })
      .catch((error) => console.error("Error fetching random albums:", error));
  }, []); // Empty dependency array means, it runs once, after the initial render

  const handleAlbumClick = (album) => {
    setSelectedAlbum(album);
    // Navigate to the "/album" route and pass the selected album as state
    navigate("/album", { state: { album } });
  };

  return (
    <div className="random-album-grid">
      <div className="album-grid">
        {randomAlbums.map((album, index) => (
          <div
            className="album"
            key={album.id}
            onClick={() => handleAlbumClick(album)}
          >
            <Card
              className="album-card2 custom-card"
              style={{ backgroundColor: "#1d1c1c" }}
            >
              <img
                src={album.image}
                alt={album.title}
                className="album-image2"
              />
              <CardContent>
                <div className="text-truncate">
                  <Typography
                    variant="h5"
                    component="div"
                    className="album-title"
                    style={{ fontSize: "13px" }}
                  >
                    {album.title}
                  </Typography>
                </div>
                <div className="text-truncate">
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    className="artist-name"
                  >
                    {album.artists[0].name}
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {selectedAlbum && <SongList album={selectedAlbum} />}
    </div>
  );
}

export default RandomAlbumGrid;
