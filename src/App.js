// src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const UNSPLASH_ACCESS_KEY = "qT2xcpYOXth_hJOUVZ6ELdjPRjTiJVyx_aVjqQ8oLA8";

const timeOfDayQueries = ["morning", "afternoon", "evening", "night"];

function App() {
  const [currentWallpaper, setCurrentWallpaper] = useState("");
  const [timeOfDay, setTimeOfDay] = useState("");

  useEffect(() => {
    updateWallpaperBasedOnTime();
  }, []);

  const updateWallpaperBasedOnTime = async () => {
    const hour = new Date().getHours();
    let query;
    if (hour >= 6 && hour < 12) {
      query = timeOfDayQueries[0];
      setTimeOfDay("Morning");
    } else if (hour >= 12 && hour < 18) {
      query = timeOfDayQueries[1];
      setTimeOfDay("Afternoon");
    } else if (hour >= 18 && hour < 21) {
      query = timeOfDayQueries[2];
      setTimeOfDay("Evening");
    } else {
      query = timeOfDayQueries[3];
      setTimeOfDay("Night");
    }
    await fetchWallpaper(query);
  };

  const fetchWallpaper = async (query) => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/photos/random?query=${query}&client_id=${UNSPLASH_ACCESS_KEY}`
      );
      setCurrentWallpaper(response.data.urls.regular);
    } catch (error) {
      console.error("Error fetching wallpaper:", error);
    }
  };

  const changeWallpaper = async () => {
    const currentIndex = timeOfDayQueries.indexOf(timeOfDay.toLowerCase());
    const nextIndex = (currentIndex + 1) % timeOfDayQueries.length;
    const nextQuery = timeOfDayQueries[nextIndex];
    await fetchWallpaper(nextQuery);
  };

  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${currentWallpaper})`,
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <div className="content">
        <h1>Good {timeOfDay}!</h1>
        <button onClick={changeWallpaper}>Change Wallpaper</button>
      </div>
    </div>
  );
}

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>Wallpaper Changer</h2>
    </nav>
  );
};

export default App;
