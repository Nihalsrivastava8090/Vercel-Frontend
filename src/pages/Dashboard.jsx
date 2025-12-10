import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import EmotionDetector from "../components/EmotionDetector";

import { BarChart3, LogOut, Smile, Home, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    logout();
    navigate("/home");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#020617] via-[#0B1120] to-black text-white">

      {/* SIDEBAR */}
      <aside className="w-72 bg-white/10 backdrop-blur-2xl border-r border-white/10 shadow-2xl flex flex-col p-6">

        <h1 className="text-3xl font-extrabold mb-10 tracking-wide bg-gradient-to-r from-[#4C8BF5] to-[#00E0FF] bg-clip-text text-transparent">
          EmotionCare
        </h1>

        <nav className="flex flex-col gap-3">

          <button
            onClick={() => navigate("/home")}
            className="flex items-center gap-3 py-3 px-4 rounded-xl bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white transition font-medium"
          >
            <Home size={22} /> Home
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-3 py-3 px-4 rounded-xl bg-gradient-to-r from-[#4C8BF5] to-[#00E0FF] text-black font-semibold shadow-lg"
          >
            <Smile size={22} /> Dashboard
          </button>

          <button
            onClick={() => navigate("/journal")}
            className="flex items-center gap-3 py-3 px-4 rounded-xl bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white transition font-medium"
          >
            <BookOpen size={22} /> Journal
          </button>

          <button
            onClick={() => navigate("/analytics")}
            className="flex items-center gap-3 py-3 px-4 rounded-xl bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white transition font-medium"
          >
            <BarChart3 size={22} /> Analytics
          </button>

          <button
            onClick={() => navigate("/calendar")}
            className="flex items-center gap-3 py-3 px-4 rounded-xl bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white transition font-medium"
          >
            📅 Mood Calendar
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 py-3 px-4 rounded-xl bg-red-600/20 text-red-400 hover:bg-red-600/30 transition font-medium mt-10"
          >
            <LogOut size={22} /> Logout
          </button>
        </nav>

        <div className="mt-auto bg-white/10 border border-white/10 p-4 rounded-xl text-center">
          <p className="font-semibold text-white">{user?.name}</p>
          <p className="text-gray-400 text-sm">{user?.email}</p>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-10">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold mb-6 flex items-center gap-3"
        >
          <Smile className="text-[#4C8BF5]" /> Emotion Detector
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/10 backdrop-blur-2xl border border-white/10 shadow-xl rounded-3xl p-8"
        >
          <EmotionDetector />
        </motion.div>
      </main>
    </div>
  );
}

export default Dashboard;
