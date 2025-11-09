import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../../assets/PizzeriaLogo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // ✅ Check login status when component mounts or localStorage changes
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      // console.log(storedUser);
    }
  }, []);
  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    loadUser(); // initial load

    // Listen for localStorage changes
    window.addEventListener("storage", loadUser);

    return () => window.removeEventListener("storage", loadUser);
  }, []);

  // ✅ Logout user
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  // ✅ Protect routes — redirect to login if not logged in
  const handleProtectedNavigation = (path) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black px-4 py-2 shadow-sm">
      <div className="container-fluid">
        {/* ✅ Brand Section */}
        <div
          className="navbar-brand d-flex align-items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          <h3 className="mb-0 text-warning">Pizzeria</h3>
          <img
            src={logo}
            alt="Pizzeria Logo"
            style={{ width: "50px", height: "50px" }}
          />
        </div>

        {/* ✅ Navbar Links */}
        <div className="d-flex align-items-center gap-4 flex-wrap">
          <span
            className="text-decoration-none text-light text-opacity-75 cursor-pointer"
            onClick={() => handleProtectedNavigation("/orderpizza")}
            style={{ cursor: "pointer" }}
          >
            Order Pizza
          </span>

          <span
            className="text-decoration-none text-light text-opacity-75 cursor-pointer"
            onClick={() => handleProtectedNavigation("/buildpizza")}
            style={{ cursor: "pointer" }}
          >
            Build Ur Pizza
          </span>
        </div>

        {/* ✅ Right Side (Auth / Cart) */}
        <div className="d-flex align-items-center gap-3">
          {user ? (
            <>
              <button
                onClick={() => handleProtectedNavigation("/cart")}
                className="btn btn-warning text-dark fw-bold"
              >
                🛒 Cart
              </button>
              {/* 
              <span className="fw-semibold text-info">
                Hello, {user.username || "User"} 👋
              </span> */}

              <button
                onClick={handleLogout}
                className="btn btn-danger text-light fw-bold"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="btn btn-success text-light fw-bold"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate("/register")}
                className="btn btn-outline-light fw-bold"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>

      {/* ✅ Responsive Styling */}
      <style>{`
        @media (max-width: 768px) {
          nav {
            flex-direction: column;
            align-items: flex-start;
          }
          .d-flex.gap-4 {
            gap: 1rem;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
