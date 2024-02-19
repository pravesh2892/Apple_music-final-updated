import React, { useState, useEffect, useRef } from "react";
import "../App.css";
import "./Sidebar.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SongsList from "../Music/SongsList";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

function Sidebar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSongList, setShowSongList] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const searchResultsRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const handleCloseSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/browse"); // Navigate to the "/browse" route by default if no route is defined
    }
  }, [navigate, location.pathname]);

  const handleSearch = () => {
    console.log("Search Term:", searchTerm);
    fetch(
      `https://academics.newtonschool.co/api/v1/music/song?search={"title":"${searchTerm}"}`,
      {
        headers: {
          projectId: "f104bi07c490",
        },
      }
    )
      .then((response) => response.json())
      .then((res) => {
        console.log("API Data:", res);
        setSearchResults(res.data);
        setShowSongList(true);
      })
      .catch((error) => console.error("Error fetching song data:", error));
    setShowSongList(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target)
      ) {
        // Click occurred outside the search results container
        setShowSongList(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside); // Cleanup the event listener
    };
  }, []);

  return (
    <>
      <div className="sidebarparent">
        <div className="hamburger-menu" onClick={handleToggleSidebar}>
          <MenuIcon style={{ color: "red" }} />
        </div>
        <div className="sidebarmaindiv">
          <div className="sidebarcontainer">
            <div className="sidebarlogo">
              <svg
                height="20"
                viewBox="0 0 83 20"
                width="83"
                xmlns="http://www.w3.org/2000/svg"
                className="logo"
                aria-hidden="true"
              >
                <path d="M34.752 19.746V6.243h-.088l-5.433 13.503h-2.074L21.711 6.243h-.087v13.503h-2.548V1.399h3.235l5.833 14.621h.1l5.82-14.62h3.248v18.347h-2.56zm16.649 0h-2.586v-2.263h-.062c-.725 1.602-2.061 2.504-4.072 2.504-2.86 0-4.61-1.894-4.61-4.958V6.37h2.698v8.125c0 2.034.95 3.127 2.81 3.127 1.95 0 3.124-1.373 3.124-3.458V6.37H51.4v13.376zm7.394-13.618c3.06 0 5.046 1.73 5.134 4.196h-2.536c-.15-1.296-1.087-2.11-2.598-2.11-1.462 0-2.436.724-2.436 1.793 0 .839.6 1.41 2.023 1.741l2.136.496c2.686.636 3.71 1.704 3.71 3.636 0 2.442-2.236 4.12-5.333 4.12-3.285 0-5.26-1.64-5.509-4.183h2.673c.25 1.398 1.187 2.085 2.836 2.085 1.623 0 2.623-.687 2.623-1.78 0-.865-.487-1.373-1.924-1.704l-2.136-.508c-2.498-.585-3.735-1.806-3.735-3.75 0-2.391 2.049-4.032 5.072-4.032zM66.1 2.836c0-.878.7-1.577 1.561-1.577.862 0 1.55.7 1.55 1.577 0 .864-.688 1.576-1.55 1.576a1.573 1.573 0 0 1-1.56-1.576zm.212 3.534h2.698v13.376h-2.698zm14.089 4.603c-.275-1.424-1.324-2.556-3.085-2.556-2.086 0-3.46 1.767-3.46 4.64 0 2.938 1.386 4.642 3.485 4.642 1.66 0 2.748-.928 3.06-2.48H83C82.713 18.067 80.477 20 77.317 20c-3.76 0-6.208-2.62-6.208-6.942 0-4.247 2.448-6.93 6.183-6.93 3.385 0 5.446 2.213 5.683 4.845h-2.573zM10.824 3.189c-.698.834-1.805 1.496-2.913 1.398-.145-1.128.41-2.33 1.036-3.065C9.644.662 10.848.05 11.835 0c.121 1.178-.336 2.33-1.01 3.19zm.999 1.619c.624.049 2.425.244 3.578 1.98-.096.074-2.137 1.272-2.113 3.79.024 3.01 2.593 4.012 2.617 4.037-.024.074-.407 1.419-1.344 2.812-.817 1.224-1.657 2.422-3.002 2.447-1.297.024-1.73-.783-3.218-.783-1.489 0-1.97.758-3.194.807-1.297.048-2.28-1.297-3.097-2.52C.368 14.908-.904 10.408.825 7.375c.84-1.516 2.377-2.47 4.034-2.495 1.273-.023 2.45.857 3.218.857.769 0 2.137-1.027 3.746-.93z"></path>
              </svg>
            </div>
            <form className="sidebarinput">
              <svg
                height="12"
                width="12"
                viewBox="0 0 16 16"
                className="search-svg"
                aria-hidden="true"
              >
                <path d="M11.87 10.835c.018.015.035.03.051.047l3.864 3.863a.735.735 0 1 1-1.04 1.04l-3.863-3.864a.744.744 0 0 1-.047-.051 6.667 6.667 0 1 1 1.035-1.035zM6.667 12a5.333 5.333 0 1 0 0-10.667 5.333 5.333 0 0 0 0 10.667z"></path>
              </svg>

              <input
                type="text"
                autoComplete="on"
                autoFocus="on"
                placeholder="Search"
                // ref={inputRef}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    console.log("Enter key pressed"); // Log when Enter key is pressed
                    handleSearch();
                  }
                }}
                style={{ backgroundColor: "white" }}
              />
            </form>
            {showSongList && (
              <div ref={searchResultsRef} className="song-list-overlay">
                <SongsList searchResults={searchResults} />
              </div>
            )}
            <div className="sidebardetails">
              <div className="details ">
                <svg
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  aria-hidden="true"
                >
                  <path
                    d="M12 20c4.376 0 8-3.631 8-8 0-4.376-3.631-8-8.008-8C7.624 4 4 7.624 4 12c0 4.369 3.631 8 8 8zm0-1.333A6.634 6.634 0 0 1 5.341 12a6.628 6.628 0 0 1 6.651-6.667A6.653 6.653 0 0 1 18.667 12 6.636 6.636 0 0 1 12 18.667zm-1.467-3.6 4.463-2.636a.483.483 0 0 0 0-.839L10.533 8.95c-.337-.204-.784-.047-.784.33v5.458c0 .377.416.55.784.33z"
                    fillOpacity=".95"
                  ></path>
                </svg>
                <NavLink
                  to="/ListenNow"
                  activeClassName="active "
                  className="sidebar-btn"
                >
                  <p>Listen Now</p>
                </NavLink>
              </div>
              <div className="details ">
                <svg
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  aria-hidden="true"
                >
                  <path
                    d="M9.92 11.354c.966 0 1.453-.487 1.453-1.49v-3.4c0-1.004-.487-1.483-1.453-1.483H6.452C5.487 4.981 5 5.46 5 6.464v3.4c0 1.003.487 1.49 1.452 1.49zm7.628 0c.965 0 1.452-.487 1.452-1.49v-3.4c0-1.004-.487-1.483-1.452-1.483h-3.46c-.974 0-1.46.479-1.46 1.483v3.4c0 1.003.486 1.49 1.46 1.49zm-7.65-1.073h-3.43c-.266 0-.396-.137-.396-.418v-3.4c0-.273.13-.41.396-.41h3.43c.265 0 .402.137.402.41v3.4c0 .281-.137.418-.403.418zm7.634 0h-3.43c-.273 0-.402-.137-.402-.418v-3.4c0-.273.129-.41.403-.41h3.43c.265 0 .395.137.395.41v3.4c0 .281-.13.418-.396.418zm-7.612 8.7c.966 0 1.453-.48 1.453-1.483v-3.407c0-.996-.487-1.483-1.453-1.483H6.452c-.965 0-1.452.487-1.452 1.483v3.407c0 1.004.487 1.483 1.452 1.483zm7.628 0c.965 0 1.452-.48 1.452-1.483v-3.407c0-.996-.487-1.483-1.452-1.483h-3.46c-.974 0-1.46.487-1.46 1.483v3.407c0 1.004.486 1.483 1.46 1.483zm-7.65-1.072h-3.43c-.266 0-.396-.137-.396-.41v-3.4c0-.282.13-.418.396-.418h3.43c.265 0 .402.136.402.418v3.4c0 .273-.137.41-.403.41zm7.634 0h-3.43c-.273 0-.402-.137-.402-.41v-3.4c0-.282.129-.418.403-.418h3.43c.265 0 .395.136.395.418v3.4c0 .273-.13.41-.396.41z"
                    fillOpacity=".95"
                  ></path>
                </svg>
                <NavLink
                  to="/browse"
                  activeClassName="active "
                  className="sidebar-btn"
                >
                  <p>Browse</p>
                </NavLink>
              </div>
              <div className="details ">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M19.359 18.57C21.033 16.818 22 14.461 22 11.89s-.967-4.93-2.641-6.68c-.276-.292-.653-.26-.868-.023-.222.246-.176.591.085.868 1.466 1.535 2.272 3.593 2.272 5.835 0 2.241-.806 4.3-2.272 5.835-.261.268-.307.621-.085.86.215.245.592.276.868-.016zm-13.85.014c.222-.238.176-.59-.085-.86-1.474-1.535-2.272-3.593-2.272-5.834 0-2.242.798-4.3 2.272-5.835.261-.277.307-.622.085-.868-.215-.238-.592-.269-.868.023C2.967 6.96 2 9.318 2 11.89s.967 4.929 2.641 6.68c.276.29.653.26.868.014zm1.957-1.873c.223-.253.162-.583-.1-.867-.951-1.068-1.473-2.45-1.473-3.954 0-1.505.522-2.887 1.474-3.954.26-.284.322-.614.1-.876-.23-.26-.622-.26-.891.039-1.175 1.274-1.827 2.963-1.827 4.79 0 1.82.652 3.517 1.827 4.784.269.3.66.307.89.038zm9.958-.038c1.175-1.267 1.827-2.964 1.827-4.783 0-1.828-.652-3.517-1.827-4.791-.269-.3-.66-.3-.89-.039-.23.262-.162.592.092.876.96 1.067 1.481 2.449 1.481 3.954 0 1.504-.522 2.886-1.481 3.954-.254.284-.323.614-.092.867.23.269.621.261.89-.038zm-8.061-1.966c.23-.26.13-.568-.092-.883-.415-.522-.63-1.197-.63-1.934 0-.737.215-1.413.63-1.943.222-.307.322-.614.092-.875s-.653-.261-.906.054a4.385 4.385 0 0 0-.968 2.764 4.38 4.38 0 0 0 .968 2.756c.253.322.675.322.906.061zm6.18-.061a4.38 4.38 0 0 0 .968-2.756 4.385 4.385 0 0 0-.968-2.764c-.253-.315-.675-.315-.906-.054-.23.261-.138.568.092.875.415.53.63 1.206.63 1.943 0 .737-.215 1.412-.63 1.934-.23.315-.322.622-.092.883s.653.261.906-.061zm-3.547-.967c.96 0 1.789-.814 1.789-1.797s-.83-1.789-1.789-1.789c-.96 0-1.781.806-1.781 1.789 0 .983.821 1.797 1.781 1.797z"></path>
                </svg>
                <NavLink
                  to="/Radio"
                  activeClassName="active "
                  className="sidebar-btn"
                >
                  <p>Radio</p>
                </NavLink>
              </div>
              <div className="details">
                <svg
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  aria-hidden="true"
                >
                  <FavoriteIcon />
                </svg>
                <NavLink
                  to="/favorites"
                  activeClassName="active "
                  className="sidebar-btn"
                >
                  <p>Favorites</p>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isMobileSidebarOpen && (
        <div className="mobile-sidebar">
        
          <div className="hamburger-menu" onClick={handleCloseSidebar}>
            <CloseIcon style={{ color: "red" }} />
          </div>
          <ul>
            <li>
              <NavLink to="/ListenNow" className="sidebar-btn-mobile">
                Listen Now
              </NavLink>
            </li>
            <li>
              <NavLink to="/browse" className="sidebar-btn-mobile">
                Browse
              </NavLink>
            </li>
            <li>
              <NavLink to="/Radio" className="sidebar-btn-mobile">
                Radio
              </NavLink>
            </li>
            <li>
              <NavLink to="/favorites" className="sidebar-btn-mobile">
                Favorites
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
export default Sidebar;