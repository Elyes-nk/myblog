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
            ART
          </Link>
          <Link
            className={styles.link}
            href={{ pathname: "/", query: { cat: "science" } }}
          >
            SCIENCE
          </Link>
          <Link
            className={styles.link}
            href={{ pathname: "/", query: { cat: "technology" } }}
          >
            TECHNOLOGY
          </Link>
          <Link
            className={styles.link}
            href={{ pathname: "/", query: { cat: "cinema" } }}
          >
            CINEMA
          </Link>
          <Link
            className={styles.link}
            href={{ pathname: "/", query: { cat: "design" } }}
          >
            DESIGN
          </Link>

          <Link
            className={styles.link}
            href={{ pathname: "/", query: { cat: "food" } }}
          >
            FOOD
          </Link>

          {currentUser ? (
            <>
              <Link
                className={styles.link}
                href={{ pathname: "/", query: { myposts: true } }}
              >
                MY POSTS
              </Link>
              <span className={styles.write} onClick={logout}>
                Logout
              </span>
            </>
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
