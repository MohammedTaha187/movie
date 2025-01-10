import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import data from "../../../db.json"; 
import "./WatchEpisode.css";

export default function WatchEpisode() {
  const { type, id, season_number, episode_number } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let seriesData = null;

    
    if (type === "arabic") {
      seriesData = data.arabic_series.find((serie) => serie.id === id);
    } else if (type === "turkish") {
      seriesData = data.turkish_series.find((serie) => serie.id === id);
    }

    if (seriesData) {
      
      const season = seriesData.seasons.find(
        (season) => season.season_number === parseInt(season_number)
      );
      const episode = season?.episodes.find(
        (ep) => ep.episode_number === parseInt(episode_number)
      );

      if (episode) {
        setItem({ seriesData, season, episode });
      } else {
        setError("لم يتم العثور على الحلقة.");
      }
    } else {
      setError("لم يتم العثور على السلسلة.");
    }
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
          backgroundImage: `url(${episode.img || "/images/default-image.jpg"})`,
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
          <video key={episode_number} controls>
            <source src={episode.video_url} type="video/mp4" />
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
                      src={ep.img || "/images/default-image.jpg"}
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
