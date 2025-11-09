import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:7000/api/auth/register",
        formData
      );
      setMessage(res.data.msg || "Registration successful!");
      setFormData({ username: "", email: "", password: "" });
      navigate("/login");
    } catch (err) {
      setMessage(err.response?.data?.msg || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      }}
    >
      <div
        className="card shadow-lg p-4"
        style={{ width: "100%", maxWidth: "420px", borderRadius: "15px" }}
      >
        <h3
          className="text-center mb-4"
          style={{ color: "orangered", fontWeight: "bold" }}
        >
          Create Your Pizzeria Account 🍕
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Enter your name"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email Address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            className="btn w-100"
            style={{
              backgroundColor: "orangered",
              color: "white",
              fontWeight: "600",
              borderRadius: "8px",
            }}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {message && (
          <p
            className={`mt-3 text-center fw-semibold ${
              message.includes("failed") ? "text-danger" : "text-success"
            }`}
          >
            {message}
          </p>
        )}

        <p className="mt-3 text-center">
          Already have an account?{" "}
          <Link to="/login" style={{ color: "orangered", fontWeight: "600" }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
