"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [accepted, setAccepted] = useState(false);
  const [noPos, setNoPos] = useState({ x: 120, y: 300 });
  const [hearts, setHearts] = useState([]);

  // Floating hearts generator
  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prev) => [
        ...prev,
        {
          id: Math.random(),
          left: Math.random() * 100,
          size: Math.random() * 20 + 10,
        },
      ]);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  const moveNoButton = () => {
    const x = Math.random() * (window.innerWidth - 120);
    const y = Math.random() * (window.innerHeight - 200);
    setNoPos({ x, y });
  };

  return (
    <main
      style={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(180deg, #ff9a9e, #fad0c4, #fbc2eb)",
        fontFamily: "Arial",
        position: "relative",
        textAlign: "center",
      }}
    >
      {/* 💕 FLOATING HEARTS */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          style={{
            position: "absolute",
            left: `${heart.left}%`,
            bottom: "-20px",
            fontSize: `${heart.size}px`,
            animation: "floatUp 6s linear forwards",
          }}
        >
          💖
        </div>
      ))}

      {!accepted ? (
        <>
          {/* TITLE */}
          <h1
            style={{
              color: "white",
              fontSize: "34px",
              textShadow: "0 2px 10px rgba(0,0,0,0.3)",
            }}
          >
            I’m Really Sorry 💌
          </h1>

          <p style={{ color: "white", marginTop: 10 }}>
            I made something for you...
          </p>

          {/* YES BUTTON */}
          <button
            onClick={() => setAccepted(true)}
            style={{
              marginTop: 30,
              padding: "14px 30px",
              fontSize: "18px",
              borderRadius: 20,
              border: "none",
              background: "white",
              color: "#ff4d6d",
              fontWeight: "bold",
              boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
            }}
          >
            Yes 💖
          </button>

          {/* NO BUTTON (RUNS AWAY) */}
          <button
            onMouseEnter={moveNoButton}
            onClick={moveNoButton}
            style={{
              position: "absolute",
              left: noPos.x,
              top: noPos.y,
              padding: "12px 22px",
              fontSize: "16px",
              borderRadius: 15,
              border: "none",
              background: "#ff4d6d",
              color: "white",
              transition: "0.3s",
              boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
            }}
          >
            No ❌
          </button>
        </>
      ) : (
        /* 💌 CINEMATIC LETTER */
        <div
          style={{
            background: "rgba(255,255,255,0.9)",
            padding: "25px",
            borderRadius: "20px",
            maxWidth: "85%",
            boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
            animation: "fadeIn 1.5s ease",
          }}
        >
          <h2>💖 A Letter For You</h2>

          <p style={{ marginTop: 15, fontSize: 16, lineHeight: 1.6 }}>
            I’m really sorry for everything I did.
            <br /><br />
            I know I made mistakes, but I truly care about you.
            <br /><br />
            If you can forgive me, I promise I’ll do better 💌
          </p>

          <p style={{ marginTop: 20, fontWeight: "bold" }}>
            — from my heart
          </p>
        </div>
      )}

      {/* ANIMATIONS */}
      <style jsx>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(-110vh);
            opacity: 0;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </main>
  );
}