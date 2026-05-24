import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContxt";

const Login = () => {
  const [inputs, setInputs] = useState({ username: "", password: "" });
  const [err, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) =>
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(inputs);
      navigate("/");
    } catch (err) {
      setError(err.response?.data || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: "linear-gradient(135deg, #0d9488 0%, #0f766e 30%, #134e4a 100%)" }}>
      {/* Decorative orbs */}
      <div className="pointer-events-none fixed top-[-10%] left-[5%] w-96 h-96 rounded-full opacity-30" style={{ background: "radial-gradient(circle, #99f6e4, transparent 70%)", filter: "blur(60px)" }} />
      <div className="pointer-events-none fixed bottom-[-5%] right-[10%] w-80 h-80 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #67e8f9, transparent 70%)", filter: "blur(60px)" }} />

      {/* Left branding panel */}
      <div className="hidden lg:flex flex-[0.85] flex-col justify-center pl-14 pr-6 py-12 text-white relative">
        <div className="space-y-6">
          <p className="text-4xl font-extrabold leading-snug max-w-sm drop-shadow-md">
            Ideas worth reading. Stories worth sharing.
          </p>
          <p className="text-sm opacity-80 leading-relaxed max-w-xs">
            A space for long-form writing on technology, science, art, cinema, design, and food.
          </p>
        </div>
      </div>

      {/* Right glass card */}
      <div className="flex flex-1 flex-col justify-center items-center px-6 py-12">
        <div
          className="w-full max-w-sm rounded-3xl p-8 md:p-10 space-y-8"
          style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.30)", boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}
        >
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold text-white">Sign in</h1>
            <p className="text-sm text-white/70">Welcome back — we missed you.</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-white/70 uppercase tracking-widest">Username</label>
                <input
                  required
                  type="text"
                  name="username"
                  autoComplete="username"
                  className="w-full px-4 py-3 rounded-xl outline-none transition-all text-white placeholder-white/40 focus:ring-2 focus:ring-white/40"
                  style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", backdropFilter: "blur(8px)" }}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-white/70 uppercase tracking-widest">Password</label>
                <input
                  required
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  className="w-full px-4 py-3 rounded-xl outline-none transition-all text-white placeholder-white/40 focus:ring-2 focus:ring-white/40"
                  style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", backdropFilter: "blur(8px)" }}
                  onChange={handleChange}
                />
              </div>
            </div>

            {err && (
              <div className="text-sm p-3 rounded-xl text-center font-medium text-red-200" style={{ background: "rgba(239,68,68,0.20)", border: "1px solid rgba(239,68,68,0.30)" }}>
                {err}
              </div>
            )}

            <button
              disabled={loading}
              className="w-full text-white py-3 rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center shadow-lg hover:shadow-xl hover:scale-[1.02]"
              style={{ background: "rgba(255,255,255,0.25)", border: "1px solid rgba(255,255,255,0.40)", backdropFilter: "blur(8px)" }}
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : "Sign in"}
            </button>
          </form>

          <p className="text-center text-sm text-white/70">
            Don't have an account?{" "}
            <Link to="/register" className="font-bold text-white hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
