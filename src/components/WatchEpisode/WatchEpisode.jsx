import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "./WatchEpisode.css";

export default function WatchEpisode() {
  const { type, id, season_number, episode_number } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    let endpoint = type === "arabic"
      ? `http://localhost:5001/arabic_series/${id}`
      : `http://localhost:5001/turkish_series/${id}`;

    axios
      .get(endpoint)
      .then((response) => {
        const seriesData = response.data;
        const season = seriesData.seasons.find((season) => season.season_number === parseInt(season_number));
        const episode = season.episodes.find((ep) => ep.episode_number === parseInt(episode_number));
        
        setItem({ seriesData, season, episode });
      })
      .catch((error) => {
        setError("There was an error fetching the data.");
        console.error(error);
      });
  }, [type, id, season_number, episode_number]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!item) {
    return <div className="loading-message">جارِ التحميل...</div>;
  }

  const { seriesData, season, episode } = item;

  return (
    <div className="watch-episode-container">
      <div
        className="episode-header"
        style={{
          backgroundImage: `url(http://localhost:5001${episode.img || "/images/default-image.jpg"})`,
        }}
      >
        <div className="overlay"></div>
        <div className="episode-title">
          <h1>{episode.title}</h1>
          <p>الحلقة {episode.episode_number}</p>
        </div>
      </div>

      <div className="episode-content">
        <div className="video-container">
          <video ref={videoRef} key={episode_number} controls>
            <source src={`http://localhost:5001${episode.video_url}`} type="video/mp4" />
            متصفحك لا يدعم علامة الفيديو.
          </video>
        </div>

        <div className="episode-info">
          <p>{episode.description}</p>
        </div>

        <div className="other-episodes">
          <h3>باقي الحلقات</h3>
          <div className="episodes-cards">
            {season.episodes
              .filter((ep) => ep.episode_number !== episode.episode_number)
              .map((ep) => (
                <div className="episode-card" key={ep.episode_number}>
                  <Link to={`/watch/${type}/${id}/episode/${season_number}/${ep.episode_number}`}>
                    <img
                      src={`http://localhost:5001${ep.img || "/images/default-image.jpg"}`}
                      alt={ep.title}
                      className="episode-image"
                    />
                  </Link>
                  <div className="episode-info">
                    <h4>الحلقة {ep.episode_number}</h4>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
