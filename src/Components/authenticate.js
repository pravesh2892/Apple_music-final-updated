export const addSongToFavorites = async (route, songId) => {
  const token = getToken();
  try {
    const response = await fetch(
      "https://academics.newtonschool.co/api/v1" + route,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          projectID: "f104bi07c490",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ songId: songId }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to add song to favorites");
    }

    console.log("Song added to favorites successfully");
  } catch (error) {
    console.error("Error adding song to favorites:", error);
  }
};

export const removeSongFromFavorites = async (route, songId) => {
  const token = getToken();
  try {
    const response = await fetch(
      "https://academics.newtonschool.co/api/v1" + route,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          projectID: "f104bi07c490",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ songId: songId }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to remove song from favorites");
    }

    console.log("Song removed from favorites successfully");
  } catch (error) {
    console.error("Error removing song from favorites:", error);
  }
};

const getToken = () => {
  const accessToken = localStorage.getItem("token");

  return accessToken;
};
