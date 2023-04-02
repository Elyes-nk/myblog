import React from "react";
import { useState } from "react";
import Link from "next/link";
import styles from "../login/login.module.scss";
import { useCreateUser } from "@/useRequest";
import Typewriter from "typewriter-effect";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { isLoading, refetch, isError, error, data } = useCreateUser(inputs);

  if (data) {
    Router.push("/");
  }

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    refetch({ throwOnError: false, cancelRefetch: true });
  };

  return (
    <div className={styles.auth}>
      <h1>Register</h1>
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
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit} disabled={isLoading}>
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
            "Register"
          )}
        </button>
        <span>
          Do you have an account?{" "}
          <Link href="/login" className={styles.link}>
            Login
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

export default Register;
