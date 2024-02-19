import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMusicPlayer } from "../Music/MusicPlayerContext";
import "./Navbar.css";

function Navbar() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0); //This state variable will keep track of the index of the currently playing song in the playlist.
  const [currentTime, setCurrentTime] = useState(0); // This state variable will keep track of the current playback time of the audio.
  const audioRef = useRef(); // hold a reference to the audio element. This is useful for controlling and interacting with the audio playback.
  const durationLimit = 20; // the maximum duration a song can play (20 seconds).
  const {
    currentSong,
    isPlaying,
    playlist,
    playNextSong,
    playPreviousSong,
    togglePlayPause,
    playSong,
  } = useMusicPlayer(); // a custom hook that provides various values and functions related to music playback. The destructuring syntax is used to extract specific values and functions.
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSongBoxDropdownOpen, setIsSongBoxDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); //: Retrieves the authentication token from local storage.

  const toggleSongBoxDropdown = () => {
    setIsSongBoxDropdownOpen(!isSongBoxDropdownOpen);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); 
  };

  useEffect(() => {
    const audio = audioRef.current;
    const updateProgress = () => {
      const current = audio.currentTime;
      setCurrentTime(Math.floor(current));
    };
    const setInitialData = () => {
      audio.addEventListener("timeupdate", updateProgress);
    };

    if (currentSong) {
      audio.src = currentSong.audio_url; ///Remind to edit
      if (isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
      setInitialData();
    }
    return () => {
      if (audio) {
        audio.removeEventListener("timeupdate", updateProgress);
      }
    };
  }, [currentSong, isPlaying]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleSongIconClick = (album, songIndex) => {
    setCurrentSongIndex(songIndex);
  };

  return (
    <>
      <div className="navbarcontainer">
        <div className="navbarthreedivs">
          <div className="playstopicons">
            <button className="prevbtn" onClick={playPreviousSong}>
              <svg
                width="32"
                height="31"
                viewBox="0 0 32 28"
                rotate={180}
                transform="translate(-10)"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.14 20.68c.365 0 .672-.107 1.038-.323l8.508-4.997c.623-.365.938-.814.938-1.37 0-.564-.307-.988-.938-1.361l-8.508-4.997c-.366-.216-.68-.324-1.046-.324-.73 0-1.337.556-1.337 1.569v4.773c-.108-.399-.406-.73-.904-1.021L7.382 7.632c-.357-.216-.672-.324-1.037-.324-.73 0-1.345.556-1.345 1.569v10.235c0 1.013.614 1.569 1.345 1.569.365 0 .68-.108 1.037-.324l8.509-4.997c.49-.29.796-.631.904-1.038v4.79c0 1.013.615 1.569 1.345 1.569z"
                  fill="#000"
                  fillRule="nonzero"
                ></path>
              </svg>
            </button>
            <button
              className={isPlaying ? "pausebtn" : "playbtn"}
              onClick={togglePlayPause}
            >
              {isPlaying ? (
                <svg
                  width="32"
                  height="28"
                  viewBox="0 0 32 28"
                  transform="translate(10)"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.293 22.772c.955 0 1.436-.481 1.436-1.436V6.677c0-.98-.481-1.427-1.436-1.427h-2.457c-.954 0-1.436.473-1.436 1.427v14.66c-.008.954.473 1.435 1.436 1.435h2.457zm7.87 0c.954 0 1.427-.481 1.427-1.436V6.677c0-.98-.473-1.427-1.428-1.427h-2.465c-.955 0-1.428.473-1.428 1.427v14.66c0 .954.473 1.435 1.428 1.435h2.465z"
                    fill="#000"
                    fill-rule="nonzero"
                  ></path>
                </svg>
              ) : (
                <svg
                  width="32"
                  height="28"
                  viewBox="0 0 32 28"
                  transform="translate(10)"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.345 23.287c.415 0 .763-.15 1.22-.407l12.742-7.404c.838-.481 1.178-.855 1.178-1.46 0-.599-.34-.972-1.178-1.462L11.565 5.158c-.457-.265-.805-.407-1.22-.407-.789 0-1.345.606-1.345 1.57V21.71c0 .971.556 1.577 1.345 1.577z"
                    fillRule="nonzero"
                  ></path>
                </svg>
              )}
            </button>
            <button className="forwardbtn" onClick={playNextSong}>
              <svg
                width="32"
                height="28"
                viewBox="0 0 32 28"
                transform="translate(10)"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.14 20.68c.365 0 .672-.107 1.038-.323l8.508-4.997c.623-.365.938-.814.938-1.37 0-.564-.307-.988-.938-1.361l-8.508-4.997c-.366-.216-.68-.324-1.046-.324-.73 0-1.337.556-1.337 1.569v4.773c-.108-.399-.406-.73-.904-1.021L7.382 7.632c-.357-.216-.672-.324-1.037-.324-.73 0-1.345.556-1.345 1.569v10.235c0 1.013.614 1.569 1.345 1.569.365 0 .68-.108 1.037-.324l8.509-4.997c.49-.29.796-.631.904-1.038v4.79c0 1.013.615 1.569 1.345 1.569z"
                  fill="#000"
                  fillRule="nonzero"
                ></path>
              </svg>
            </button>
          </div>

          <div className="songnamediv">
            {currentSong ? (
              <>
                <div
                  className="songicon"
                  onClick={() =>
                    handleSongIconClick("Album Name", currentSongIndex)
                  }
                >
                  <Link to="/music-player">
                    <button className="song-icon-button">
                      <img
                        src={currentSong.thumbnail}
                        alt={currentSong.title}
                        width="42"
                        height="43"
                        style={{
                          marginLeft: "-1px",
                          marginTop: "0px",
                          borderRadius: "5px",
                        }}
                      />
                    </button>
                  </Link>
                </div>
                <div className="song-title-name">
                  <div className="song-title">
                    <span>{currentSong && currentSong.title}</span>
                  </div>
                  <div className="artist-name">
                    <span>
                      {currentSong &&
                        currentSong.artist &&
                        currentSong.artist.name}
                    </span>
                  </div>

                  <div className="audio-bar">
                    <div>
                      <span>{formatTime(currentTime)}</span>
                      <progress value={currentTime} max={durationLimit} />
                    </div>
                    <audio ref={audioRef} />
                  </div>
                </div>
                <div class="lcd__badge-platter">PREVIEW</div>
              </>
            ) : (
              <div className="appleicon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="24"
                  version="1.1"
                  viewBox="0 0 20 24"
                >
                  <path
                    fill="black"
                    fill-rule="nonzero"
                    stroke="none"
                    stroke-width="1"
                    d="M14.5498331,5.79055576 L14.8667346,5.79824073 C15.6519271,5.85753895 17.9167852,6.09354452 19.3663083,8.18658259 C19.2454992,8.2761902 16.6786385,9.72115188 16.7091378,12.7589876 C16.7390911,16.3870553 19.9696682,17.5970079 20,17.6265086 C19.9696682,17.7155832 19.487499,19.3381578 18.3096405,21.0185738 C17.2829229,22.4941235 16.2256873,23.9394547 14.5345925,23.9689736 C12.9038728,23.9984743 12.3599697,23.0246181 10.4887983,23.0246181 C8.61624942,23.0246181 8.01243658,23.9394547 6.47193668,23.9984743 C4.84148068,24.056773 3.60409403,22.4336653 2.57735781,20.9595512 C0.463094554,17.9799264 -1.13731196,12.5531248 1.03685791,8.89465382 C2.09390733,7.06587112 4.02671959,5.91602544 6.10974825,5.88615523 C7.71015477,5.85753895 9.18984525,6.91939744 10.1566562,6.91939744 C11.1229398,6.91939744 12.8433271,5.68057112 14.8667346,5.79824073 Z M14.882569,-1.50990331e-14 C15.034318,1.42063421 14.4589476,2.81085604 13.6110595,3.84623659 C12.7325883,4.85257077 11.3405768,5.6504798 9.94727779,5.53248307 C9.76560653,4.17140151 10.4624841,2.72297789 11.2498451,1.83563692 C12.1267465,0.799444643 13.6413789,0.0602553239 14.882569,-1.50990331e-14 Z"
                  ></path>
                </svg>
              </div>
            )}
          </div>

          <div className="volumesigndiv">
            <div className="volumediv">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                style={{ transform: "translateX(70px)" }}
                onClick={toggleSongBoxDropdown}
              >
                <path
                  fill="black"
                  d="M2.634 5.537a.906.906 0 1 0 0-1.813.906.906 0 1 0 0 1.813zm3.192-.325h9.865a.576.576 0 0 0 .585-.578.578.578 0 0 0-.585-.585H5.826a.574.574 0 0 0-.585.585c0 .325.253.578.585.578zM2.634 9.906c.506 0 .91-.404.91-.91a.906.906 0 0 0-.91-.91.906.906 0 0 0-.91.91c0 .506.405.91.91.91zm3.192-.325h9.865a.582.582 0 1 0 0-1.162H5.826a.572.572 0 0 0-.585.577c0 .325.253.585.585.585zm-3.192 4.694a.91.91 0 1 0-.001-1.82.91.91 0 0 0 0 1.82zm3.192-.332h9.865a.576.576 0 0 0 .585-.577.578.578 0 0 0-.585-.585H5.826a.574.574 0 0 0-.585.585c0 .324.253.577.585.577z"
                ></path>
              </svg>
              {isSongBoxDropdownOpen && (
                <div
                  className={`volume-dropdown ${
                    isSongBoxDropdownOpen ? "open" : ""
                  }`}
                >
                  <h3 className="svelte-1gncjsm">Up Next</h3>
                  <img
                    style={{ width: "85%", paddingTop: "110px" }}
                    src="https://goaexcise.gov.in/images/ComingSoon.gif"
                    alt="commingsoon"
                  />
                </div>
              )}
            </div>
            {token ? (
              <div className="userlogo" onClick={toggleDropdown}>
                <svg
                  viewBox="0 0 28 28"
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon"
                  data-testid="account-menu-fallback-icon"
                  aria-hidden="true"
                  height="22"
                  width="22"
                >
                  <path
                    fill="#d60017"
                    d="M14.007 28C6.299 28 0 21.703 0 14S6.299 0 14.007 0C21.7 0 28 6.297 28 14s-6.299 14-13.993 14zm0-9.392c4.253 0 7.49 1.514 8.805 3.216 1.815-2.08 2.899-4.81 2.899-7.824 0-6.54-5.12-11.784-11.704-11.784C7.41 2.216 2.289 7.46 2.289 14c0 3.014 1.084 5.743 2.9 7.824 1.313-1.702 4.55-3.216 8.818-3.216zm-.014-2.297c-2.6-.027-4.646-2.19-4.646-5.095-.014-2.73 2.059-4.986 4.646-4.986 2.601 0 4.647 2.256 4.647 4.986 0 2.906-2.032 5.122-4.647 5.095z"
                  ></path>
                </svg>
                {isDropdownOpen && (
                  <ul className="dropdown-menu">
                    <Link to="/tryItFree" className="link-no-underline">
                      <li className="dropdown-item">
                        <div className="item-content">
                          Help
                          <div className="icon">
                            <svg
                              viewBox="0 0 64 64"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                              height="15"
                              width="15"
                            >
                              <path d="M32.32 61.417c16.075 0 29.08-13.032 29.08-29.164 0-16.103-13.005-29.135-29.08-29.135C16.215 3.117 3.238 16.15 3.238 32.253c0 16.132 12.977 29.164 29.082 29.164zm0-5.672c-13.033 0-23.243-10.515-23.243-23.492 0-12.95 10.21-23.463 23.243-23.463 13.032 0 23.213 10.515 23.213 23.463 0 12.977-10.183 23.492-23.213 23.492zm-.665-17.985c1.522 0 2.517-.885 2.6-2.02v-.333c.083-1.437 1.08-2.379 2.878-3.54 2.74-1.8 4.484-3.377 4.484-6.585 0-4.594-4.15-7.222-9.077-7.222-4.758 0-7.967 2.13-8.827 4.732-.166.496-.276.966-.276 1.466 0 1.327 1.051 2.185 2.325 2.185 1.605 0 1.991-.83 2.821-1.8.887-1.355 2.075-2.156 3.709-2.156 2.185 0 3.596 1.245 3.596 3.071 0 1.715-1.161 2.6-3.486 4.234-1.964 1.355-3.404 2.793-3.404 5.256v.305c0 1.577.942 2.407 2.657 2.407zm-.027 8.495c1.77 0 3.237-1.3 3.237-3.043 0-1.772-1.438-3.045-3.237-3.045-1.826 0-3.266 1.3-3.266 3.045 0 1.715 1.466 3.043 3.266 3.043z"></path>
                            </svg>
                          </div>
                        </div>
                      </li>
                    </Link>
                    <hr />
                    <Link to="/tryItFree" className="link-no-underline">
                      <li className="dropdown-item">
                        <div className="item-content">
                          Settings
                          <div className="icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill-rule="evenodd"
                              stroke-linejoin="round"
                              stroke-miterlimit="2"
                              clip-rule="evenodd"
                              viewBox="0 0 16 16"
                              aria-hidden="true"
                              height="15"
                              width="15"
                            >
                              <path
                                fill-rule="nonzero"
                                d="M7.996 14.847c.173 0 .332-.014.505-.028l.388.734c.084.18.27.277.485.242.2-.034.34-.187.367-.394l.118-.818c.325-.09.637-.208.949-.34l.602.541a.45.45 0 0 0 .548.07c.18-.105.25-.291.215-.5l-.174-.81c.277-.19.537-.406.776-.644l.755.319c.194.083.388.035.533-.138a.427.427 0 0 0 .035-.534l-.437-.707c.193-.274.36-.567.5-.873l.824.042a.436.436 0 0 0 .45-.304.455.455 0 0 0-.152-.52l-.651-.513c.082-.311.152-.65.179-.997l.776-.25c.208-.062.333-.221.333-.429 0-.214-.125-.367-.333-.436l-.776-.25a5.922 5.922 0 0 0-.18-.996l.644-.514a.437.437 0 0 0 .16-.512.444.444 0 0 0-.45-.305l-.825.035a6.832 6.832 0 0 0-.498-.88l.436-.7a.417.417 0 0 0-.035-.519.44.44 0 0 0-.533-.145l-.755.312a7.631 7.631 0 0 0-.776-.645l.174-.803c.034-.208-.042-.402-.215-.499-.194-.104-.395-.083-.548.07l-.602.533a9.72 9.72 0 0 0-.948-.34l-.118-.81a.45.45 0 0 0-.374-.395C9.16.17 8.973.26 8.89.432l-.388.735c-.173-.007-.333-.021-.506-.021s-.332.014-.506.02L7.103.433C7.013.26 6.833.17 6.618.197a.443.443 0 0 0-.367.395l-.118.81a8.58 8.58 0 0 0-.949.34l-.603-.534c-.159-.152-.353-.173-.554-.069-.173.097-.242.29-.208.506l.174.796a7.664 7.664 0 0 0-.776.645l-.755-.312c-.2-.076-.388-.035-.54.145a.438.438 0 0 0-.035.52l.436.699c-.185.28-.35.575-.491.88L1 4.983a.456.456 0 0 0-.45.305.447.447 0 0 0 .16.513l.643.512c-.076.325-.145.65-.173.997l-.782.25a.434.434 0 0 0-.32.436c0 .207.119.367.32.43l.782.256c.028.339.09.678.173.99l-.644.512a.469.469 0 0 0-.16.52c.064.191.25.317.451.305l.832-.042c.145.312.304.603.491.873l-.437.707a.447.447 0 0 0 .036.533c.152.173.34.221.54.138l.748-.319c.242.236.504.452.783.644l-.174.811c-.034.208.035.395.215.499a.448.448 0 0 0 .54-.063l.61-.547c.305.132.623.25.949.34l.118.817c.028.207.166.36.367.402a.455.455 0 0 0 .485-.25l.387-.734c.174.014.333.028.506.028ZM9.81 7.449c-.347-.894-1.04-1.378-1.857-1.378-.152 0-.303.018-.45.055L5.634 2.92a5.542 5.542 0 0 1 2.361-.52c2.924 0 5.223 2.197 5.493 5.05H9.811Zm-7.329.547c0-1.849.852-3.484 2.196-4.502l1.884 3.22c-.367.41-.533.846-.533 1.303 0 .444.159.852.533 1.274L4.63 12.464c-1.317-1.026-2.148-2.64-2.148-4.468Zm4.648.014c0-.464.395-.824.838-.824a.83.83 0 0 1 .845.824.847.847 0 0 1-.845.839.85.85 0 0 1-.838-.84Zm.866 5.59c-.873 0-1.697-.2-2.417-.554L7.497 9.9c.2.049.34.062.457.062.825 0 1.517-.499 1.857-1.413h3.677c-.27 2.847-2.57 5.05-5.492 5.05Z"
                              ></path>
                            </svg>
                          </div>
                        </div>
                      </li>
                    </Link>
                    <hr />
                    <li className="dropdown-item">
                      <div
                        className="item-content"
                        style={{ color: "red" }}
                        onClick={handleLogout}
                      >
                        Sign Out
                        <div className="icon"></div>
                      </div>
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              // If the user is not authenticated, show the Sign-in button
              <div className="signdiv">
                <Link to="/signin">
                  <button>
                    <svg
                      height="11"
                      viewBox="0 0 10 11"
                      width="10"
                      className="auth-icon"
                    >
                      <path d="M5 5.295c-1.296 0-2.385-1.176-2.385-2.678C2.61 1.152 3.716 0 5 0c1.29 0 2.39 1.128 2.39 2.611C7.39 4.12 6.297 5.295 5 5.295zM1.314 11C.337 11 0 10.698 0 10.144c0-1.55 1.929-3.685 5-3.685 3.065 0 5 2.135 5 3.685 0 .554-.337.856-1.314.856z"></path>
                    </svg>
                    Sign in
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default Navbar;
