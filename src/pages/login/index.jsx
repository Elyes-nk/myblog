import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import styles from "./login.module.scss";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setError] = useState(null);

  // const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      // navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className={styles.auth}>
      <h1>Login</h1>
      <form>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Login</button>
        {err && <p>{err}</p>}
        <span>
          Don&apos;t you have an account?{" "}
          <Link href="/register" className={styles.link}>
            Register
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
