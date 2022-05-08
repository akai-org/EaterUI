import React, { useState } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import styles from "./Navbar.module.scss";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeNavbar = () => setIsOpen(false);

  const navItems = [
    { path: "/menu", text: "Twój jadłospis" },
    { path: "/recipes", text: "Przepisy" },
    { path: "/shopping-list", text: "Lista zakupów" },
    { path: "#", text: "Twój profil" },
  ];

  return (
    <nav role="navigation" aria-label="menu" className={styles.navbar}>
      <div
        className={cn(styles.menuList, {
          [styles.active]: isOpen,
        })}
      >
        <p>Menu</p>
        <ul>
          {navItems.map(({ path, text }) => (
            <li
              key={text}
              onClick={closeNavbar}
              className={styles.menuListItem}
            >
              <Link to={path}>{text}</Link>
            </li>
          ))}
        </ul>
      </div>
      <button
        className={styles.hamburgerButton}
        aria-controls="navigation"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
      >
        <span
          className={cn(styles.hamburger, {
            [styles.active]: isOpen,
          })}
        ></span>
      </button>
    </nav>
  );
};
