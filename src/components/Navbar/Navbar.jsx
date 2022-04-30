import React, { useState } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import styles from "./Navbar.module.scss";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav role="navigation" aria-label="menu" className={styles.navbar}>
      <ul className={cn(styles.MenuList, { [styles.active]: isOpen })}>
        <li onClick={() => setIsOpen(false)} className={styles.MenuListItem}>
          <Link to="/menu">Twój jadłospis</Link>
        </li>
        <li onClick={() => setIsOpen(false)} className={styles.MenuListItem}>
          <Link to="/recipes">Przepisy</Link>
        </li>
        <li onClick={() => setIsOpen(false)} className={styles.MenuListItem}>
          <Link to="/shopping-list">Lista zakupów</Link>
        </li>
        <li onClick={() => setIsOpen(false)} className={styles.MenuListItem}>
          <Link to="/recipes">Twój profil</Link>
        </li>
      </ul>
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
