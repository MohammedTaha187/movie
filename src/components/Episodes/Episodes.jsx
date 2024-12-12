import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import './Episodes.css';

export default function Episodes() {
  const { id } = useParams();
  const [series, setSeries] = useState(null);
  const [error, setError] = useState(null);

  const BASE_URL = "https://fb10b4b0-baad-476b-995c-8303930d406d-00-dres0smrwl7g.spock.replit.dev";

  useEffect(() => {
    const endpoint = id.includes('turkish') 
      ? `${BASE_URL}/turkish_series/${id.replace('turkish_', '')}`
      : `${BASE_URL}/arabic_series/${id.replace('arabic_', '')}`; 
  
    axios
      .get(endpoint)
      .then((response) => {
        const selectedSeries = response.data;
        if (selectedSeries) {
          setSeries(selectedSeries);
        } else {
          setError("سلسلة غير موجودة.");
        }
      })
      .catch((error) => {
        setError("حدث خطأ أثناء جلب السلسلة.");
        console.error(error);
      });
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
                    src={`${BASE_URL}${episode.img || "/images/default-image.jpg"}`}
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
