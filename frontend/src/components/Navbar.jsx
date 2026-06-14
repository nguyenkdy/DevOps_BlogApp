import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const doLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav>
      {/* Left side */}
      <div className="flex gap-2">
        <span style={{ color: "#ffffff", fontWeight: "600" }}>
          Welcome, {user?.name}
        </span>

        <Link to="/">Home1</Link>
        <Link to="/article/new">New Article</Link>
        <Link to="/account">My Account</Link>
      </div>

      {/* Right side */}
      <button onClick={doLogout}>Logout</button>
    </nav>
  );
}
