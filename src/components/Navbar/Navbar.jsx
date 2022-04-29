import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.scss";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav role="navigation" aria-label="menu" className={styles.navbar}>
      {isOpen && (
        <ul className={styles.MenuList}>
          <li className={styles.MenuListItem}>
            <Link to="/recipes">Recipies</Link>
          </li>
          <li>
            <Link to="/home">Home</Link>
          </li>
        </ul>
      )}
      <button
        className={styles.hamburgerButton}
        aria-controls="navigation"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
      >
        <span className={styles.hamburger}></span>
      </button>
    </nav>
  );
};
