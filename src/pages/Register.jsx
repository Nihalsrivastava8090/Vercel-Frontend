import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { MdEmail, MdLock, MdPerson } from "react-icons/md";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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
      await axios.post("http://localhost:4000/api/auth/register", formData);

      alert("Account Created Successfully 🎉");
      setLoading(false);
      navigate("/login");
    } catch (err) {
      setLoading(false);
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-[#28243D] px-4">
      <div className="bg-[#1E1A2B] rounded-3xl shadow-2xl w-11/12 md:w-10/12 lg:w-8/12 xl:w-7/12 flex flex-col md:flex-row overflow-hidden">

        {/* LEFT IMAGE PANEL */}
        <div className="hidden md:flex md:w-1/2 bg-black items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800"
            alt="desert"
            className="w-full h-full object-cover opacity-80"
          />
        </div>

        {/* RIGHT FORM PANEL */}
        <div className="w-full md:w-1/2 p-10 text-white">
          <h2 className="text-3xl md:text-4xl font-semibold mb-3">
            Create an account
          </h2>

          <p className="text-sm text-gray-300 mb-8">
            Already have an account?
            <Link to="/login" className="text-purple-400 font-semibold ml-1 hover:underline">
              Log in
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="relative">
              <MdPerson className="absolute left-3 top-3 text-gray-500 text-xl" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="w-full pl-12 p-3 bg-[#2B263A] border border-gray-700 rounded-md
                focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-200"
                onChange={handleChange}
                required
              />
            </div>

            <div className="relative">
              <MdEmail className="absolute left-3 top-3 text-gray-500 text-xl" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full pl-12 p-3 bg-[#2B263A] border border-gray-700 rounded-md
                focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-200"
                onChange={handleChange}
                required
              />
            </div>

            <div className="relative">
              <MdLock className="absolute left-3 top-3 text-gray-500 text-xl" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full pl-12 p-3 bg-[#2B263A] border border-gray-700 rounded-md
                focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-200"
                onChange={handleChange}
                required
              />
            </div>

            {/* TERMS CHECKBOX */}
            <div className="flex items-center gap-2">
              <input type="checkbox" required className="w-4 h-4" />
              <span className="text-sm text-gray-300">
                I agree to the{" "}
                <a href="#" className="text-purple-400 hover:underline">
                  Terms & Conditions
                </a>
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-md text-white font-semibold transition disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create account"}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default Register;
