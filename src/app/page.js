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
const moveButton = (e) => {
  const padding = 100;

  const x = Math.random() * (window.innerWidth - padding);
  const y = Math.random() * (window.innerHeight - padding);

  const el = e.currentTarget;

  el.style.position = "fixed";
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;

  // ❌ IMPORTANT: remove transform (this is your bug)
  el.style.transform = "none";
};
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
          <h1 style={styles.title}>Сайн уу</h1>

          <p style={styles.text}>
            Би чамайг хэсэгхэн хором гаргаад энийг уншаасай гэж хүсэж байна.
          </p>

          {/* YES BUTTON */}
          <button
            style={styles.button}
            onClick={() => changeStep(1)}
          >
            Ok 💖
          </button>

          {/* NO BUTTON (RUNS AWAY) */}
          <button
  onClick={moveButton}
  onTouchStart={moveButton}
  style={{
    ...styles.buttonSecondary,
    position: "fixed",
    left: "50%",
    top: "65%",
    transform: "translate(-50%, -50%)", // only initial state
    transition: "0.15s",
    zIndex: 9999,
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
            Хамгийн түрүүнд ... Намайг үнэхээр уучлаарай.
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
      Захидлыг нээх 💌
    </button>

  </div>
)}

      {/* 💖 STEP 4 */}
      {step === 3 && (
  <div style={{ ...styles.center, opacity: fade ? 1 : 0, transition: "0.5s" }}>

    <div style={styles.paper}>
      <h2>Dear you,</h2>

      <p style={styles.typewriter}>
        Намайг блоклосон шийдвэрийг чинь ойлгож бас хүндэлж байгаа...<br /><br />

        Сүүлд болсон явдлыг зүйлүүдийг их бодлоо...<br /><br />

        Та яг юу сонссон, ямар байдлаар хүрснийг бүрэн мэдэхгүй ч зарим нь буруугаар хүрсэн байх...<br /><br />

        Ямар ч байсан бай, бидний хоорондох зүйл бусдын чихэнд хүрсэн нь миний буруу...<br />
        Би таныг гомдоох эсвэл итгэлийг тань хөсөрдүүлэхийг зориогүй ч ярьсан зүйлээ зөвтгөхгүй...<br /><br />
        Зүгээр л би өөрийнхөө бурууг ойлгож, уучлалт хүсэж байгаагаа хэлэх гэсэн юм...<br /><br />
        Та миний хувьд үнэхээр чухал хүн байсан, одоо ч гэсэн...<br /><br />
        Энэ хүртэл уншсанд баярлалаа бас уучлаарай 💌
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

    

    <p style={styles.text}>
      Та ямар ч шийдвэр гаргасан бай би хүндэлнээ.
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
    <h2>Баярлалаа ❤️</h2>

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
  minHeight: "100vh",
  width: "100%",
  background: "linear-gradient(135deg, #ff9a9e, #fad0c4, #fbc2eb)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "Arial",
  textAlign: "center",
  padding: "20px",
  overflow: "hidden",
  position: "relative",

  // MOBILE SAFETY
  boxSizing: "border-box",
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
  justifyContent: "center",
  gap: 14,
  position: "relative",
  width: "100%",
  maxWidth: 420,
},

  title: {
    fontSize: 40,
    color: "#d85c7a",
  },

  text: {
  fontSize: "16px",
  color: "#444",
  lineHeight: 1.5,
  padding: "0 10px",
},

typewriter: {
  fontSize: "18px",
  color: "#333",
  lineHeight: 1.6,
  padding: "0 10px",
},

  letter: {
    background: "white",
    padding: 25,
    borderRadius: 20,
    maxWidth: 500,
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  },

  button: {
  padding: "12px 20px",
  borderRadius: 12,
  border: "none",
  background: "#d85c7a",
  color: "white",
  cursor: "pointer",
  fontSize: "16px",
  minWidth: 140,
  touchAction: "manipulation",
},

buttonSecondary: {
  padding: "12px 20px",
  borderRadius: 12,
  border: "1px solid #d85c7a",
  background: "white",
  color: "#d85c7a",
  cursor: "pointer",
  fontSize: "16px",
  minWidth: 140,
  touchAction: "manipulation",
},
};