import React, { useState, useEffect } from "react";
import parse from "html-react-parser";

export default function News() {
  const [news, setNews] = useState([]);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8081/news")
      .then((res) => res.json())
      .then((data) => setNews(data))
      .catch((err) => console.error("Failed to load news:", err));
  }, []);

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <div
      style={{
        userSelect: "none",
        position: "relative",
        backgroundColor: "#f3f4f61c",
        minHeight: "100vh",
        width:"90vw",
        left:"2vw",
        padding: "20px",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#f6f6f6ff" }}>
        News
      </h1>

      <div style={{ maxWidth: "800px", margin: "0 auto"  }}>
        {news.map((item) => (
          <div
            key={item.id}
            onClick={() => toggleExpand(item.id)}
            style={{
              backgroundColor: "#ffffff3e",
              marginBottom: "15px",
              padding: "15px 20px",
              borderRadius: "10px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              cursor: "pointer",
              transition: "all 0.2s ease",
              border: expanded === item.id ? "2px solid #3b82f6" : "2px solid transparent",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#f9fafb50")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#ffffff3e")
            }
          >
            <div style={{ fontSize: "18px", fontWeight: "600", color: "#2a2a2aff" }}>
              {parse(item.title)}
            </div>

            {expanded === item.id && (
              <div
                style={{
                  marginTop: "10px",
                  fontSize: "16px",
                  color: "#fdfdfdff",
                  animation: "fadeIn 0.3s ease",
                }}
              >
                {parse(item.description)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
