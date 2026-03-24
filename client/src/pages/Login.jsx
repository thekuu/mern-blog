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
    <div className="min-h-screen flex">
      <div
        className="hidden lg:flex flex-1 flex-col justify-between p-16 text-white"
        style={{ backgroundColor: "#008080" }}
      >
        <div className="text-2xl font-black tracking-tight">thekey.</div>
        <div className="space-y-6">
          <p className="text-4xl font-extrabold leading-snug max-w-sm">
            Ideas worth reading. Stories worth sharing.
          </p>
          <p className="text-sm opacity-70 leading-relaxed max-w-xs">
            A curated space for long-form writing on technology, science, art,
            cinema, design, and food.
          </p>
        </div>
        <p className="text-xs opacity-50">© {new Date().getFullYear()} thekey. All rights reserved.</p>
      </div>

      <div className="flex flex-1 flex-col justify-center items-center px-8 py-16 bg-white">
        <div className="w-full max-w-sm space-y-10">
          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold text-gray-900">Sign in</h1>
            <p className="text-sm text-gray-500">
              Welcome back — we missed you.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  Username
                </label>
                <input
                  required
                  type="text"
                  name="username"
                  autoComplete="username"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-teal focus:border-transparent outline-none transition-all text-gray-900"
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  Password
                </label>
                <input
                  required
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-teal focus:border-transparent outline-none transition-all text-gray-900"
                  onChange={handleChange}
                />
              </div>
            </div>

            {err && (
              <div className="bg-red-50 border border-red-100 text-red-500 text-sm p-3 rounded-xl text-center font-medium">
                {err}
              </div>
            )}

            <button
              disabled={loading}
              style={{ backgroundColor: "#008080" }}
              className="w-full text-white py-3 rounded-xl font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : "Sign in"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link to="/register" className="font-bold hover:underline" style={{ color: "#008080" }}>
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
