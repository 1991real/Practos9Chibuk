import React, { useState, useEffect } from "react";
import parse from "html-react-parser";

export default function Games() {
  const [games, setGames] = useState([]);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8081/games")
      .then((res) => res.json())
      .then((data) => setGames(data))
      .catch((err) => console.error("Failed to load games:", err));
  }, []);

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  const handleDownload = (fileName) => {
    window.location.href = `http://localhost:8081/files/download/${fileName}`;
  };

  return (
    <div
      style={{
        backgroundColor: "#f3f4f61c",
        minHeight: "100vh",
        position: "relative",
        padding: "20px",
        width:"90vw",
        left:"2vw",
        userSelect: "none",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#f6f6f6ff" }}>
        Games
      </h1>

      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {games.map((game) => (
          <div
            key={game.id}
            onClick={() => toggleExpand(game.id)}
            style={{
              backgroundColor: "#ffffff3e",
              marginBottom: "15px",
              padding: "15px 20px",
              borderRadius: "10px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              cursor: "pointer",
              transition: "all 0.2s ease",
              border: expanded === game.id ? "2px solid #3b82f6" : "2px solid transparent",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#f9fafb50")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#ffffff3e")
            }
          >
            <div style={{ fontSize: "18px", fontWeight: "600", color: "#2a2a2aff" }}>
              {parse(game.title)}
            </div>

            {expanded === game.id && (
              <div
                style={{
                  marginTop: "10px",
                  fontSize: "16px",
                  color: "#fdfdfdff",
                  animation: "fadeIn 0.3s ease",
                }}
              >
                {parse(game.description)}

                <div style={{ marginTop: "15px" }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(game.fileName);
                    }}
                    style={{
                      backgroundColor: "#3b82f6",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      padding: "10px 15px",
                      fontSize: "15px",
                      cursor: "pointer",
                      transition: "background-color 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#2563eb")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "#3b82f6")
                    }
                  >
                    ⬇ Download
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
