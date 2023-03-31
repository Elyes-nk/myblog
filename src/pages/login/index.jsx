import { useLogin } from "@/useRequest";
import Link from "next/link";
import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import styles from "./login.module.scss";
import Router from "next/router";
import Typewriter from "typewriter-effect";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const { setCurrentUser } = useContext(AuthContext);

  const { isLoading, refetch, isError, error, data, ...other } =
    useLogin(inputs);

  if (data) {
    localStorage.setItem("user", JSON.stringify(data));
    setCurrentUser(data);
    Router.push("/");
  }

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    refetch({ throwOnError: false, cancelRefetch: true });
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
          onChange={(e) => handleChange(e)}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={(e) => handleChange(e)}
        />
        <button onClick={(e) => handleSubmit(e)} disabled={isLoading}>
          {isLoading ? (
            <Typewriter
              options={{
                strings: ["Please wait.."],
                autoStart: true,
                loop: true,
                deleteSpeed: 50,
              }}
            />
          ) : (
            "Login"
          )}
        </button>

        <span>
          Don&apos;t you have an account?{" "}
          <Link href="/register" className={styles.link}>
            Register
          </Link>
        </span>
        {isError && (
          <React.Fragment>
            {error.response.errors.map((error, idx) => (
              <p key={idx}>{error.message}</p>
            ))}
          </React.Fragment>
        )}
      </form>
    </div>
  );
};

export default Login;
