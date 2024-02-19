import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar.js";
import Navbar from "./Navbar/Navbar.js";
import BrowsePage from "./BrowsePage/BrowsePage.js";
import MusicPlayerPage from "./Music/MusicPlayerPage.js";
import SongList from "./Music/SongList.js";
import SignIn from "./SignIn/SignIn.js";
import ListenNow from "./ListenNow/ListenNow.js";
import FavoriteSongsList from "./FavoriteSongsList/FavoriteSongsList.js";
import RandomAlbumGrid from "./RandomAlbumGrid/RandomAlbumGrid.js";
import Radio from "./Radio/Radio.js";
import Signup from "./Signup/Signup.js";
import TryItFree from "./tryItFree/TryItFree.js";

export default function App() {
  const [token, setToken] = useState(null);

  return (
    <div className="app-container">
      <Router>
        <Sidebar />
        <div className="main-content">
          <Navbar />
          <Routes>
            <Route path="/browse" element={<BrowsePage />} />
            <Route path="/music-player" element={<MusicPlayerPage />} />
            <Route path="/album" element={<SongList token={token} />} />
            <Route path="/signin" element={<SignIn onSignIn={setToken} />} />
            <Route path="/ListenNow" element={<ListenNow />} />
            {/* Add a new route for "Playlist on the Pulse" */}
            <Route path="/random-albums" element={<RandomAlbumGrid />} />
            {/* Add a new route for AlbumFetcher with a section number */}
            <Route path="/favorites" element={<FavoriteSongsList />} />
            <Route path="Radio" element={<Radio />} />
            <Route path="/signUp" element={<Signup />} />
            <Route path="/tryItFree" element={<TryItFree />} />
            <Route path="/Sidebar" element={<Sidebar />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}


