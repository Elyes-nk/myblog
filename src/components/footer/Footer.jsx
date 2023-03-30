import Image from "next/image";
import React from "react";
import Logo from "../../img/logo.png";
import styles from "./footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Image className={styles.logo} src={Logo} alt="" />
      <span>
        Made with ❤️ and <b>React.js ⚡</b>
      </span>
    </footer>
  );
};

export default Footer;
