import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { MdEmail, MdLock } from "react-icons/md";
import { motion } from "framer-motion";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:4000/api/auth/login",
        formData
      );

      login(res.data.user, res.data.token);
      navigate("/home");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#0A0F1E] via-[#0B1120] to-[#020617] text-white px-4">

      {/* MAIN CARD 2 COLUMNS */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-white/10 backdrop-blur-lg border border-white/10 shadow-2xl rounded-3xl w-full max-w-6xl h-auto md:h-[550px] flex overflow-hidden"
      >

        {/* LEFT FORM SECTION */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-4xl font-extrabold mb-2">Welcome Back 👋</h2>
          <p className="text-gray-300 text-sm mb-8">
            Sign in to access your dashboard and continue improving your emotional wellbeing.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <MdEmail className="absolute left-3 top-3 text-gray-400 text-xl" />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full pl-12 p-3 bg-white/5 border border-white/20 rounded-xl text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4C8BF5]"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="relative">
              <MdLock className="absolute left-3 top-3 text-gray-400 text-xl" />
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="w-full pl-12 p-3 bg-white/5 border border-white/20 rounded-xl text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4C8BF5]"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="text-right">
              <button
                type="button"
                className="text-sm text-[#4C8BF5] hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full py-3 bg-[#4C8BF5] hover:bg-[#3b73d8] text-white rounded-xl font-semibold shadow-lg transition disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </motion.button>
          </form>

          <p className="text-center mt-6 text-gray-400">
            Don’t have an account?
            <Link to="/register" className="text-[#4C8BF5] font-semibold ml-1 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>

        {/* RIGHT SIDE MESSAGE PANEL */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-[#122840] to-[#0A1B2F] p-12 text-white flex-col justify-center">
          <h1 className="text-3xl font-bold mb-6">
            Revolutionize Mental Health with <span className="text-[#4C8BF5]">AI</span>
          </h1>
          <p className="text-sm opacity-80 leading-relaxed mb-6">
            “EmotionCare AI transforms emotional tracking, making insights clearer, powerful,
            and improving real mental wellbeing outcomes.”
          </p>

          <div>
            <p className="text-sm font-semibold">Dr. Michael Carter</p>
            <p className="text-xs opacity-70">AI Emotional Health Specialist</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
