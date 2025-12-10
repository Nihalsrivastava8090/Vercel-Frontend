import { useState, useEffect } from "react";
import axios from "axios";

function Journal() {
  const [note, setNote] = useState("");
  const [emotion, setEmotion] = useState("");
  const [history, setHistory] = useState([]);

  // Load last detected emotion + history
  useEffect(() => {
    const lastEmotion = localStorage.getItem("latestEmotion");
    if (lastEmotion) setEmotion(lastEmotion);

    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("No token found, cannot fetch journal history");
        return;
      }

      const res = await axios.get("http://localhost:4000/api/journal/history", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHistory(res.data);
    } catch (error) {
      console.error("Error fetching journal history:", error.response?.data || error.message);
    }
  };

  const handleSubmit = async () => {
    if (!note.trim()) {
      alert("Please write something to save ✍️");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in. Please login again.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:4000/api/journal/add",
        { emotion: emotion || "neutral", note },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Journal saved:", res.data);
      alert("Journal saved successfully 🎉");
      setNote("");
      fetchHistory();
    } catch (error) {
      console.error("Error saving journal:", error.response?.data || error.message);
      alert(
        "Failed to save entry: " +
          (error.response?.data?.message || "Check console for more details")
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-10">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Daily Journal ✍️</h1>

      {/* Emotion (read-only) */}
      <input
        type="text"
        disabled
        className="p-3 rounded-lg w-full mb-4 text-gray-900 font-bold bg-gray-200 border border-gray-400"
        value={emotion}
        placeholder="Emotion not detected yet"
      />

      {/* Notes */}
      <textarea
        rows="4"
        className="p-3 rounded-lg w-full bg-white text-gray-800 border border-gray-400 focus:ring-2 focus:ring-indigo-500 outline-none"
        placeholder="Write your thoughts here..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      ></textarea>

      <button
        onClick={handleSubmit}
        className="mt-4 bg-indigo-600 hover:bg-indigo-700 py-3 px-6 rounded-lg text-white font-semibold shadow-md transition"
      >
        Save Entry
      </button>

      {/* History Section */}
      <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
        Journal History 📚
      </h2>

      <div className="space-y-4">
        {history.map((entry) => (
          <div
            key={entry._id}
            className="bg-white p-4 rounded-xl shadow-md border border-gray-300"
          >
            <p className="text-lg font-semibold text-indigo-600 capitalize">
              {entry.emotion}
            </p>
            <p className="text-gray-700 mt-1">{entry.note}</p>
            <p className="text-xs text-gray-500 mt-2">
              {new Date(entry.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
        {history.length === 0 && (
          <p className="text-gray-600 text-sm">
            No journal entries yet. Write your first one above 😊
          </p>
        )}
      </div>
    </div>
  );
}

export default Journal;
