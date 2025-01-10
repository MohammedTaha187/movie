import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import data from "../../../db.json"; 
import './Episodes.css';

export default function Episodes() {
  const { id } = useParams();
  const [series, setSeries] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    const selectedSeries = id.includes('turkish') 
      ? data.turkish_series.find(series => series.id === id.replace('turkish_', ''))
      : data.arabic_series.find(series => series.id === id.replace('arabic_', ''));

    if (selectedSeries) {
      setSeries(selectedSeries);
    } else {
      setError("سلسلة غير موجودة.");
    }
  }, [id]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!series) {
    return <div>تحميل...</div>;
  }

  return (
    <div className="episodes-container">
      <h1 className="series-title">{series.title}</h1>
      <h2 className="series-description">{series.description}</h2>
      <div className="seasons-container">
        {series.seasons.map((season, index) => (
          <div key={index} className="season">
            <h3>الموسم {season.season_number}</h3>
            <div className="episodes-list">
              {season.episodes.map((episode) => (
                <div className="episode-card" key={episode.episode_number}>
                  <Link
                    to={`/watch/${id.includes('turkish') ? 'turkish' : 'arabic'}/${id}/episode/${season.season_number}/${episode.episode_number}`}
                    className="series-link"
                  >
                    <img
                      src={episode.img || "/images/default-image.jpg"}
                      alt={episode.title}
                    />
                  </Link>
                  <p className="episode-number text-bg-dark">الحلقة {episode.episode_number}</p> 
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
