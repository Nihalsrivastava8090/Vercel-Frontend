import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";

function MoodCalendar() {
  const [history, setHistory] = useState([]);
  const [value, setValue] = useState(new Date());
  const [selectedDayRecords, setSelectedDayRecords] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/emotion/history", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setHistory(res.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const emotionEmoji = {
    happy: "😊",
    sad: "😢",
    angry: "😡",
    neutral: "😐",
    fear: "😨",
    surprise: "😲",
    disgust: "🤢",
  };

  const getEmojiByDate = (date) => {
    const dateStr = date.toISOString().split("T")[0];
    const entry = history.find((e) => e.createdAt.startsWith(dateStr));
    return entry ? emotionEmoji[entry.emotion] || "🙂" : "";
  };

  const onDayClick = (date) => {
    const dateStr = date.toISOString().split("T")[0];
    const records = history.filter((e) => e.createdAt.startsWith(dateStr));
    setSelectedDayRecords(records);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center flex-col p-10">
      <h1 className="text-4xl font-bold mb-6">Mood Calendar 📅</h1>

      <div className="bg-white/10 p-6 rounded-2xl shadow-xl backdrop-blur-xl">
        <Calendar
          onChange={setValue}
          value={value}
          onClickDay={onDayClick}
          tileContent={({ date }) => (
            <span className="text-xl">{getEmojiByDate(date)}</span>
          )}
          className="rounded-xl p-3 text-black font-semibold"
        />
      </div>

      {/* ===== MODAL POPUP ===== */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center p-4">
          <div className="bg-gray-800 p-6 rounded-xl w-[90%] max-w-lg shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Emotion Details 📝</h2>

            {selectedDayRecords.length > 0 ? (
              selectedDayRecords.map((record, i) => (
                <div
                  key={i}
                  className="bg-gray-700 p-4 rounded-lg mb-3 border border-gray-600"
                >
                  <p className="text-lg font-semibold">
                    Emotion: <span className="text-[#00E0FF]">{record.emotion}</span>
                  </p>
                  <p className="text-sm text-gray-300">
                    Time: {new Date(record.createdAt).toLocaleTimeString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-300">No emotion recorded on this date.</p>
            )}

            <button
              onClick={() => setShowModal(false)}
              className="mt-4 px-5 py-2 bg-red-500 rounded-lg w-full font-semibold hover:bg-red-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MoodCalendar;
