import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await login(formData.email, formData.password);

    if (result.success) {
      navigate("/dashboard");
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f7f4ed] text-[#1c1c1c] flex flex-col font-['Hanken_Grotesk',ui-sans-serif,system-ui,sans-serif] antialiased">
      {/* Wordmark Header */}
      <header className="w-full border-b border-[#eceae4]/60">
        <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-6">
          <Link
            to="/"
            className="text-[16px] font-semibold tracking-[-0.2px] hover:opacity-80 transition-opacity"
          >
            Campus Resource
          </Link>
          <Link
            to="/"
            className="text-[14px] text-[#5f5f5d] hover:text-[#1c1c1c] transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* 12-column composition */}
      <main className="flex w-full flex-1 items-center">
        <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-y-10 px-6 py-12 md:grid-cols-12 md:gap-6 md:py-8">
          {/* Form : columns 2-6 */}
          <section className="w-full md:col-start-2 md:col-span-5">
            <h1 className="text-[36px] font-semibold leading-[1.1] tracking-[-0.9px]">
              Log in to Campus Resource
            </h1>

            <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="mb-2 block text-[14px] leading-[1.5]" htmlFor="email">
                  Email
                </label>
                <input
                  autocomplete="email"
                  className="w-full rounded-[6px] border border-[#eceae4] bg-[#f7f4ed] px-4 py-2.5 text-[15px] leading-[1.5] text-[#1c1c1c] placeholder-[#5f5f5d] outline-none focus:border-[#1c1c1c] focus:ring-1 focus:ring-[#1c1c1c] transition-all"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="student@university.edu"
                  type="email"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-[14px] leading-[1.5]" htmlFor="password">
                  Password
                </label>
                <input
                  autocomplete="current-password"
                  className="w-full rounded-[6px] border border-[#eceae4] bg-[#f7f4ed] px-4 py-2.5 text-[15px] leading-[1.5] text-[#1c1c1c] placeholder-[#5f5f5d] outline-none focus:border-[#1c1c1c] focus:ring-1 focus:ring-[#1c1c1c] transition-all"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  type="password"
                  required
                />
              </div>

              <button
                className="btn-inset mt-3 w-full cursor-pointer rounded-[6px] bg-[#1c1c1c] px-4 py-2.5 text-[15px] font-medium leading-[1.5] text-[#fcfbf8] disabled:opacity-50"
                type="submit"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Log in"}
              </button>
            </form>

            <p className="mt-5 text-[14px] leading-[1.5] text-[#5f5f5d]">
              Don’t have an account?{" "}
              <Link
                className="text-[#1c1c1c] font-medium underline decoration-[rgba(28,28,28,0.4)] underline-offset-2 hover:decoration-[#1c1c1c]"
                to="/register"
              >
                Register here
              </Link>
            </p>

            {/* Error state */}
            {error && (
              <div
                className="mt-6 flex items-start gap-3 rounded-[8px] border-[1.5px] border-[#1c1c1c] bg-[#fcfbf8] p-4"
                role="alert"
              >
                <span className="mt-[2px] text-[18px] leading-none text-[#1c1c1c]">
                  <i className="ti ti-alert-circle"></i>
                </span>
                <div>
                  <p className="text-[14px] font-semibold leading-[1.4]">
                    Couldn’t log in
                  </p>
                  <p className="mt-1 text-[13px] leading-[1.4] text-[rgba(28,28,28,0.82)]">
                    {error}
                  </p>
                </div>
              </div>
            )}
          </section>

          {/* Circulation line : column 7 (decorative) */}
          <div
            aria-hidden="true"
            className="hidden self-stretch justify-center py-16 md:col-start-7 md:col-span-1 md:flex"
          >
            <div className="relative w-px bg-[#eceae4]">
              <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1c1c1c]"></span>
            </div>
          </div>

          {/* Documentary photograph : columns 8-12 */}
          <figure className="hidden md:col-start-8 md:col-span-5 md:block">
            <img
              alt="Two university students exchanging an item on campus"
              className="h-[520px] w-full rounded-[14px] border border-[#eceae4] object-cover object-center shadow-sm"
              src="https://images.pexels.com/photos/37071199/pexels-photo-37071199.jpeg?auto=compress&cs=tinysrgb&w=900&q=80"
              decoding="async"
              loading="lazy"
            />
          </figure>
        </div>
      </main>
    </div>
  );
};

export default Login;
