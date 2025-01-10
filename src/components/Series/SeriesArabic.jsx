import React, { useEffect, useState } from "react";
import data from "../../../db.json"; // تأكد من المسار الصحيح للملف
import { Link } from "react-router-dom";
import "./SeriesArabic.css";

export default function SeriesArabic() {
  const [series, setSeries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (data) {
      setSeries(data.arabic_series);  // تأكد أن 'arabic_series' موجود في db.json
    } else {
      setError("There was an error loading the series data.");
    }
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!series.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="series-container">
      <h1 className="page-title">المسلسلات العربية</h1>
      <div className="series-list">
        {series.map((serie) => (
          <div className="series-card" key={serie.id}>
            <Link to={`/series/arabic/${serie.id}/episodes`} className="series-link">
              <div
                className="series-image"
                style={{
                  backgroundImage: `url(${serie.img})`, // تأكد أن 'img' في db.json هو المسار الصحيح
                }}
              ></div>
            </Link>
            <div className="series-info">
              <h2 className="series-title">{serie.title}</h2>
              <p className="series-description">{serie.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
