import { useNavigate } from "react-router-dom";
import { Smile, BarChart3, NotebookPen, LayoutDashboard, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ParticlesBg from "../components/ParticlesBg";

function Home() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/home");
  };

  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col items-center px-6 py-4 overflow-hidden relative">

      {/* PARTICLES BACKGROUND */}
      <ParticlesBg />

      {/* Background Waves Animated */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#020617] via-[#0B1120] to-black">
        <div className="absolute w-[900px] h-[900px] bg-[#4C8BF5]/25 blur-[180px] rounded-full top-[-200px] left-[-200px] animate-slowMove"></div>
        <div className="absolute w-[700px] h-[700px] bg-fuchsia-600/20 blur-[180px] rounded-full bottom-[-100px] right-[-150px] animate-slowMove2"></div>
      </div>

      {/* NAVBAR (Fixed & Always on Top) */}
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-4 z-50 w-full max-w-7xl flex justify-between items-center p-5 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/10 shadow-xl"
      >
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-[#4C8BF5] to-[#2fafff] bg-clip-text text-transparent tracking-wider">
          EmotionCare AI
        </h1>

        <div className="flex gap-4 items-center">
          {!isLoggedIn ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="px-6 py-2 rounded-xl bg-[#4C8BF5] text-white font-semibold hover:bg-[#3973d8] transition shadow-lg"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/register")}
                className="px-6 py-2 rounded-xl border border-[#4C8BF5] text-[#4C8BF5] font-semibold hover:bg-white/5 transition"
              >
                Register
              </button>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition"
            >
              <LogOut size={20} /> Logout
            </button>
          )}
        </div>
      </motion.nav>

      {/* HERO SECTION - Below Navbar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mt-40 text-center max-w-4xl"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileInView={{
            x: [0, -10, 10, -10, 0],
            transition: { duration: 6, repeat: Infinity, repeatType: "mirror" }
          }}
          className="text-6xl font-extrabold leading-tight bg-gradient-to-r from-[#4C8BF5] via-[#7f8aff] to-[#0ff] bg-clip-text text-transparent drop-shadow-2xl"
        >
          Revolutionizing Mental Health Care <br />
          with <span className="typewriterText text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] to-[#0ff] font-extrabold"></span>
        </motion.h2>

        <p className="text-lg text-gray-300 font-medium mt-6">
          Real-time emotion tracking, intelligent analytics, guided journaling, & powerful AI recommendations.
        </p>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.96 }}
          className="mt-8 px-14 py-4 bg-gradient-to-r from-[#4C8BF5] to-[#00E0FF] text-black rounded-2xl text-lg font-bold animate-buttonPulse"
          onClick={() => navigate(isLoggedIn ? "/dashboard" : "/login")}
        >
          {isLoggedIn ? "Go to Dashboard 🚀" : "Get Started 🚀"}
        </motion.button>
      </motion.div>

      {/* FEATURE CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-20 max-w-6xl w-full">
        {[
          { icon: LayoutDashboard, text: "Dashboard", route: "/dashboard" },
          { icon: Smile, text: "Emotion Detector", route: "/emotion" },
          { icon: NotebookPen, text: "Journal", route: "/journal" },
          { icon: BarChart3, text: "Analytics", route: "/analytics" },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            whileHover={{ scale: 1.09 }}
            className="cursor-pointer bg-white/10 backdrop-blur-xl border border-white/20 p-7 rounded-2xl shadow-xl hover:shadow-[0_0_30px_#4C8BF5] transition flex flex-col items-center"
            onClick={() => navigate(item.route)}
          >
            <item.icon size={45} className="text-[#4C8BF5] mb-3" />
            <p className="font-semibold text-gray-200 text-lg">{item.text}</p>
          </motion.div>
        ))}
      </div>

      <footer className="mt-28 text-gray-400 text-sm mb-10">
        © 2025 EmotionCare AI — Built by Nihal with ❤️
      </footer>
    </div>
  );
}

export default Home;
