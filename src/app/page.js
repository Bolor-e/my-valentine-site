"use client";

import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";

export default function Home() {
  const [step, setStep] = useState(0);
  const [fade, setFade] = useState(true);
  const [petals, setPetals] = useState([]);

  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  // 🎬 smooth transition helper
  const changeStep = (nextStep) => {
    setFade(false);

    setTimeout(() => {
      setStep(nextStep);
      setFade(true);
    }, 300);
  };

  useEffect(() => {
  console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
}, []);

  // 🌸 floating petals generator
  useEffect(() => {
    const interval = setInterval(() => {
      setPetals((prev) => [
        ...prev,
        {
          id: Math.random(),
          left: Math.random() * 100,
          size: Math.random() * 18 + 10,
          duration: Math.random() * 5 + 6,
        },
      ]);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <main style={styles.container}>

      {/* 🌸 PETALS */}
      {petals.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.left}%`,
            bottom: "-20px",
            fontSize: p.size,
            animation: `floatUp ${p.duration}s linear forwards`,
            pointerEvents: "none",
          }}
        >
          🌸
        </div>
      ))}

      {/* 🌸 STEP 1 */}
      {step === 0 && (
        <div style={{ ...styles.center, opacity: fade ? 1 : 0, transition: "0.5s" }}>
          <h1 style={styles.title}>Hi</h1>

          <p style={styles.text}>
            Before anything else... I just want a moment of your time
          </p>

          {/* YES BUTTON */}
          <button
            style={styles.button}
            onClick={() => changeStep(1)}
          >
            Yes 💖
          </button>

          {/* NO BUTTON (RUNS AWAY) */}
          <button
  onMouseEnter={(e) => {
    const x = Math.random() * (window.innerWidth - 120);
    const y = Math.random() * (window.innerHeight - 120);

    e.currentTarget.style.position = "absolute";
    e.currentTarget.style.left = `${x}px`;
    e.currentTarget.style.top = `${y}px`;
  }}

  onClick={(e) => {
    const x = Math.random() * (window.innerWidth - 120);
    const y = Math.random() * (window.innerHeight - 120);

    e.currentTarget.style.position = "absolute";
    e.currentTarget.style.left = `${x}px`;
    e.currentTarget.style.top = `${y}px`;
  }}

  style={{
    ...styles.buttonSecondary,
    position: "absolute",
    left: "60%",
    top: "60%",
    transition: "0.15s",
    zIndex: 10
  }}
>
  No ❌
</button>
        </div>
      )}

      {/* 💌 STEP 2 */}
      {step === 1 && (
        <div style={{ ...styles.center, opacity: fade ? 1 : 0, transition: "0.5s" }}>
          <p style={styles.typewriter}>
            Before anything else... I’m sorry.
          </p>

          <button style={styles.button} onClick={() => changeStep(2)}>
            Read more
          </button>
        </div>
      )}

      {/* 📩 STEP 3 */}
      {step === 2 && (
  <div style={{ ...styles.center, opacity: fade ? 1 : 0, transition: "0.5s" }}>

    {/* 📩 envelope */}
    <div style={styles.envelope}>✉️</div>

    <p style={styles.text}>
      You have something to open...
    </p>

    <button
      style={styles.button}
      onClick={() => changeStep(3)}
    >
      Open letter 💌
    </button>

  </div>
)}

      {/* 💖 STEP 4 */}
      {step === 3 && (
  <div style={{ ...styles.center, opacity: fade ? 1 : 0, transition: "0.5s" }}>

    <div style={styles.paper}>
      <h2>Dear you,</h2>

      <p style={styles.typewriter}>
        I don’t expect anything from you...<br /><br />

        I just wanted to say I’m truly sorry.<br /><br />

        I understand if I hurt you, and I take responsibility for it.<br /><br />

        I’m not asking you to forget anything.<br />
        I just wanted you to know I regret how things went.<br /><br />

        Thank you for reading this 💌
      </p>

    </div>

    <button
      style={styles.button}
      onClick={() => changeStep(4)}
    >
      Continue
    </button>

  </div>
)}
{step === 4 && (
  <div style={{ ...styles.center, opacity: fade ? 1 : 0, transition: "0.5s" }}>

    <h2>Thank you for reading</h2>

    <p style={styles.text}>
      Whatever you feel, I respect it.
    </p>

    <div style={{ display: "flex", gap: 10 }}>
      <button
  disabled={loading || done}
  onClick={async () => {
    setLoading(true);

    const { error } = await supabase
      .from("responses")
      .insert([{ choice: "understand" }]);

    console.log("Error:", error);

    setLoading(false);
    setDone(true);

    if (!error) {
      changeStep(5);
    }
  }}
  style={{
    ...styles.button,
    opacity: loading || done ? 0.6 : 1,
    cursor: loading || done ? "not-allowed" : "pointer",
  }}
>
  {loading ? "Saving..." : "❤️ I understand"}
</button>

      <button
  disabled={loading || done}
  onClick={async () => {
    setLoading(true);

    const { error } = await supabase
      .from("responses")
      .insert([{ choice: "need_time" }]);

    console.log("Error:", error);

    setLoading(false);
    setDone(true);

    if (!error) {
      changeStep(5);
    }
  }}
  style={{
    ...styles.buttonSecondary,
    opacity: loading || done ? 0.6 : 1,
    cursor: loading || done ? "not-allowed" : "pointer",
  }}
>
  {loading ? "Saving..." : "🤍 I need time"}
</button>
    </div>

  </div>
)}

{step === 5 && (
  <div style={{ ...styles.center, animation: "fadeIn 0.8s ease-in-out" }}>
    <h2>Thank you ❤️</h2>

    <p style={styles.text}>
      Your response has been received.
    </p>

    <p style={{ fontSize: 14, opacity: 0.7 }}>
      You may close this page now.
    </p>
  </div>
)}

      {/* 🌸 ANIMATIONS */}
      <style jsx>{`
        @keyframes floatUp {
          0% {
            transform: translateY(100vh);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translateY(-120vh);
            opacity: 0;
          }
        }
        @keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}
      `}</style>

    </main>
  );
}

const styles = {
  container: {
    height: "100vh",
    width: "100vw",
    background: "linear-gradient(180deg, #ff9a9e, #fad0c4, #fbc2eb)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial",
    textAlign: "center",
    padding: 20,
    overflow: "hidden",
    position: "relative",
  },
    envelope: {
  fontSize: 60,
  animation: "float 3s ease-in-out infinite",
  filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.2))",
},

  paper: {
    background: "white",
    padding: 30,
    borderRadius: 20,
    maxWidth: 500,
    boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
    animation: "fadeIn 0.8s ease-in-out"
  },

  center: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 15,
    position: "relative",
  },

  title: {
    fontSize: 40,
    color: "#d85c7a",
  },

  text: {
    fontSize: 18,
    color: "#444",
  },

  typewriter: {
    fontSize: 22,
    color: "#333",
  },

  letter: {
    background: "white",
    padding: 25,
    borderRadius: 20,
    maxWidth: 500,
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  },

  button: {
    padding: "10px 18px",
    borderRadius: 12,
    border: "none",
    background: "#d85c7a",
    color: "white",
    cursor: "pointer",
  },

  buttonSecondary: {
    padding: "10px 18px",
    borderRadius: 12,
    border: "1px solid #d85c7a",
    background: "white",
    color: "#d85c7a",
    cursor: "pointer",
  },
};