import axios from "./axios";
import requests from "./requests";
import React, { useEffect, useState } from "react";
import './Banner.css'
const baseURL = "https://image.tmdb.org/t/p/original";
function Banner() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(requests.fetchNetflixOriginals);
      setMovies(
        response.data.results[
          Math.floor(Math.random() * response.data.results.length - 1)
        ]
      );
      return response;
    }
    fetchData();
  }, []);
  const truncate = (str ,n) => {
        return str?.length > n ? str.substr(0,n-1) + "..." : str; 
  }
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${baseURL}${movies?.backdrop_path})`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">{movies?.title || movies?.name || movies?.original_name}</h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">{truncate(movies?.overview,150)}</h1>
      </div>    
      <div className="banner--fadeBottom"></div>
    </header>
  );
}

export default Banner;
