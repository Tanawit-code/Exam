import { useEffect, useState } from "react";
import { getProfileApi } from "../services/authApi";
import { useNavigate } from "react-router-dom";

function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await getProfileApi(token);
        setUser(res.data.user);
      } catch (error) {
        alert("กรุณาล็อกอินใหม่");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div>
      <h2>Home</h2>
      {user ? (
        <>
          <p>ยินดีต้อนรับ: {user.name}</p>
          <p>Email: {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Home;