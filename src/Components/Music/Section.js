import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";

function Section({ index, albums, handleAlbumClick }) {
  return (
    <div>
      <h2 style={{ cursor: "pointer" }} onClick={() => handleAlbumClick(index)}>
        Section {index + 1}
      </h2>
      <Grid container spacing={2}>
        {albums.map((album) => (
          <Grid item key={album._id} xs={12} sm={6} md={4} lg={3}>
            <Card
              className="album-card custom-card"
              style={{ backgroundColor: "#1d1c1c", cursor: "pointer" }}
              onClick={() => handleAlbumClick(album)}
            >
              <img
                src={album.image}
                alt={album.title}
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
              <CardContent>
                <div className="text-truncate">
                  <Typography
                    variant="h5"
                    component="div"
                    className="album-title"
                    style={{ color: "white", fontSize: "small" }}
                  >
                    {album.title}
                  </Typography>
                </div>
                <div className="text-truncate">
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    className="song-title"
                    style={{ color: "white", fontSize: "small" }}
                  >
                    {album.artists[0].name}
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Section;
