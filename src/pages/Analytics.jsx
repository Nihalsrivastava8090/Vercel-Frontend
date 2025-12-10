import { useEffect, useState } from "react";
import axios from "axios";
import { Pie, Line } from "react-chartjs-2";
import "chart.js/auto";

function Analytics() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/emotion/history", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setHistory(res.data);
    } catch (err) {
      console.log("Error fetching history:", err);
    }
  };

  const emotionCounts = history.reduce((acc, item) => {
    acc[item.emotion] = (acc[item.emotion] || 0) + 1;
    return acc;
  }, {});

  const pieData = {
    labels: Object.keys(emotionCounts),
    datasets: [
      {
        data: Object.values(emotionCounts),
        backgroundColor: ["#4C8BF5", "#FF6384", "#36A2EB", "#FFCE56", "#8884D8"],
      },
    ],
  };

  const lineData = {
    labels: history.map((h) => new Date(h.createdAt).toLocaleDateString()),
    datasets: [
      {
        label: "Emotion Timeline",
        data: history.map((h) => (emotionCounts[h.emotion] || 1)),
        borderColor: "#4C8BF5",
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="min-h-screen p-10 bg-gray-900 text-white">
      <h1 className="text-4xl font-extrabold text-center mb-10">Emotion Analytics 📊</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-white/10 backdrop-blur-xl p-6 rounded-xl shadow-xl">
          <h2 className="text-2xl font-bold mb-4 text-center">Emotion Distribution</h2>
          <Pie data={pieData} />
        </div>

        <div className="bg-white/10 backdrop-blur-xl p-6 rounded-xl shadow-xl">
          <h2 className="text-2xl font-bold mb-4 text-center">Emotion Trend Over Time</h2>
          <Line data={lineData} />
        </div>
      </div>
    </div>
  );
}

export default Analytics;
