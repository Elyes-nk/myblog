import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import Logo from "../../img/logo.png";
import styles from "./navbar.module.scss";

const Navbar = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const logout = useCallback(() => {
    localStorage.setItem("user", null);
    setCurrentUser(null);
  }, [setCurrentUser]);

  return (
    <div className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/">
          <Image className={styles.logo} src={Logo} alt="" />
        </Link>
        <div className={styles.links}>
          <Link
            className={styles.link}
            href={{ pathname: "/", query: { cat: "art" } }}
          >
            <h6>ART</h6>
          </Link>
          <Link
            className={styles.link}
            href={{ pathname: "/", query: { cat: "science" } }}
          >
            <h6>SCIENCE</h6>
          </Link>
          <Link
            className={styles.link}
            href={{ pathname: "/", query: { cat: "technology" } }}
          >
            <h6>TECHNOLOGY</h6>
          </Link>
          <Link
            className={styles.link}
            href={{ pathname: "/", query: { cat: "cinema" } }}
          >
            <h6>CINEMA</h6>
          </Link>
          <Link
            className={styles.link}
            href={{ pathname: "/", query: { cat: "design" } }}
          >
            <h6>DESIGN</h6>
          </Link>
          <Link
            className={styles.link}
            href={{ pathname: "/", query: { cat: "food" } }}
          >
            <h6>FOOD</h6>
          </Link>
          {currentUser ? (
            <span className={styles.write} onClick={logout}>
              Logout
            </span>
          ) : (
            <Link className={styles.link} href="/login">
              <span className={styles.write}>Login</span>
            </Link>
          )}
          <span className={styles.write}>
            <Link className={styles.link} href="/write">
              Write
            </Link>
          </span>
          <span>{currentUser?.username}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
