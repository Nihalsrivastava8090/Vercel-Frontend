import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";

const EmotionDetector = () => {
  const videoRef = useRef(null);
  const [emotion, setEmotion] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const enableCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        setErrorMsg("Camera access denied. Please allow webcam permission.");
      }
    };
    enableCamera();
  }, []);

  const saveEmotion = async (emotion) => {
    try {
      await axios.post(
        "http://localhost:4000/api/emotion/save",
        { emotion, confidence: 1 },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
    } catch (err) {}
  };

  const captureImage = async () => {
    setLoading(true);

    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 300;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, 400, 300);

    canvas.toBlob(async (blob) => {
      if (!blob) {
        setEmotion("Capture failed");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("image", blob, "frame.jpg");

      try {
        const res = await fetch("http://localhost:5000/api/emotion/detect", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        setEmotion(data.emotion);
        saveEmotion(data.emotion);
      } catch (error) {
        setEmotion("server error");
      }

      setLoading(false);
    }, "image/jpeg");
  };

  const suggestionsFor = (emo) => {
    const e = emo.toLowerCase();
    switch (true) {
      case e.includes("happy"):
        return ["Write 3 things you’re grateful for", "Share your happiness with someone!", "Capture this moment ❤️"];
      case e.includes("sad"):
        return ["Listen to calming music", "Talk to someone you trust", "Go for a slow 10 min walk"];
      case e.includes("angry"):
        return ["Try deep breathing (4-4-4 technique)", "Pause before reacting", "Write down what you feel"];
      case e.includes("neutral"):
        return ["Stretch your body for 2 minutes", "Drink water", "Set a simple goal for today"];
      default:
        return ["Rest your eyes", "Check in with your body & mind", "Talk to someone if needed"];
    }
  };

  const tips = suggestionsFor(emotion);

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-[#020617] via-[#0B1120] to-black px-6 py-10 text-white overflow-hidden">
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-3xl bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8"
      >

        <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-[#4C8BF5] to-[#00E0FF] bg-clip-text text-transparent mb-6">
          Emotion Detector 🎭
        </h1>

        <div className="flex flex-col items-center">
          <video
            ref={videoRef}
            autoPlay
            className="rounded-2xl border border-white/20 shadow-[0_0_25px_#4C8BF5] w-[380px] mb-5"
          />

          {errorMsg && <p className="text-red-400 text-sm mb-3">{errorMsg}</p>}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={captureImage}
            disabled={loading}
            className="flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-[#4C8BF5] to-[#00E0FF] rounded-xl text-black font-bold shadow-[0_0_35px_#4C8BF5] hover:shadow-[0_0_60px_#4C8BF5] transition disabled:opacity-60"
          >
            <Camera size={22} />
            {loading ? "Analyzing..." : "Capture & Detect Emotion"}
          </motion.button>

          {emotion && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="w-full mt-8 bg-white/10 rounded-2xl p-6 border border-white/10 shadow-xl"
            >
              <p className="text-xl font-bold mb-3">
                Detected Emotion: <span className="text-[#00E0FF] capitalize">{emotion}</span>
              </p>

              <ul className="ml-5 list-disc text-sm text-gray-300 space-y-1">
                {tips.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>

              <p className="text-[12px] text-gray-400 mt-4">
                *These are supportive suggestions, not medical guidance. Reach out if you need help 💙
              </p>
            </motion.div>
          )}

        </div>
      </motion.div>
    </div>
  );
};

export default EmotionDetector;
