import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import data from "../../../db.json"; 
import "./Watch.css";

export default function Watch() {
  const { type, id } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let itemData = null;

    
    if (type === "movie") {
      if (id.startsWith("foreign-")) {
        itemData = data.moviesforeign.find((movie) => movie.id === id);
      } else {
        itemData = data.moviesarabic.find((movie) => movie.id === id);
      }
    } else if (type === "series") {
      if (id.includes("turkish")) {
        itemData = data.turkish_series.find((serie) => serie.id === id);
      } else {
        itemData = data.arabic_series.find((serie) => serie.id === id);
      }
    }

    if (itemData) {
      setItem(itemData); 
    } else {
      setError("لم يتم العثور على العنصر.");
    }
  }, [type, id, data]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!item) {
    return <div>تحميل...</div>;
  }

  return (
    <div className="watch-container">
      <div
        className="movie-header"
        style={{
          backgroundImage: `url(${item.img})`, 
        }}
      >
        <div className="overlay"></div>
        <div className="movie-title">
          <h1>{item.title}</h1>
          <p>{item.description}</p>
        </div>
      </div>

      <div className="movie-content">
        {type === "movie" && item.video_url && (
          <div className="video-container">
            <video controls>
              <source src={item.video_url} type="video/mp4" />
              متصفحك لا يدعم وسم الفيديو.
            </video>
          </div>
        )}
      </div>
    </div>
  );
}
