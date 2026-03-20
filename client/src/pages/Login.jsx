import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // ✅ FIXED: added (e)
  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const loginHandler = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/Login", user, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      // ✅ FIXED: use res.data.success
      if (res.data.success) {
         toast.success(res.data.message);
        // console.log("Login success");
        navigate('/');
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.log("Error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <input
        type="text"
        className="py-2 px-3 m-2 border rounded"
        name="email"
        placeholder="Enter email"
        value={user.email}
        onChange={changeHandler}
      />

      <input
        type="password"
        name="password"
        placeholder="Enter password"
        value={user.password}
        onChange={changeHandler}
        className="py-2 px-3 m-2 border rounded"
      />

      <button
        onClick={loginHandler}
        className="bg-amber-400 text-black rounded m-2 py-2 px-4"
      >
        Login
      </button>
    </div>
  );
};

export default Login;
