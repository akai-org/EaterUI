import React, { useState } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import styles from "./Navbar.module.scss";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeNavbar = () => setIsOpen(false);

  return (
    <nav role="navigation" aria-label="menu" className={styles.navbar}>
      <ul
        className={cn(styles.menuList, {
          [`${styles.menuList}-active`]: isOpen,
        })}
      >
        <li onClick={closeNavbar} className={styles.menuListItem}>
          <Link to="/menu">Twój jadłospis</Link>
        </li>
        <li onClick={closeNavbar} className={styles.menuListItem}>
          <Link to="/recipes">Przepisy</Link>
        </li>
        <li onClick={closeNavbar} className={styles.menuListItem}>
          <Link to="/shopping-list">Lista zakupów</Link>
        </li>
        <li onClick={closeNavbar} className={styles.menuListItem}>
          <Link to="/recipes">Twój profil</Link>
        </li>
      </ul>
      <button
        className={styles.hamburgerButton}
        aria-controls="navigation"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
      >
        <span
          className={cn(styles.hamburger, {
            [`${styles.hamburger}-active`]: isOpen,
          })}
        ></span>
      </button>
    </nav>
  );
};
