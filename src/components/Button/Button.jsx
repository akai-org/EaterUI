import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./Button.module.scss";

const typeToClass = {
  primary: styles.primary,
  secondary: styles.secondary,
  danger: styles.danger,
};



// type = "primary" | "secondary" | "danger"


export function Button({
  type = "primary",
  fullwidth = false,
  isDisabled = false,
  children,
} = {}) {
  
  

  //const mode = primary ? styles.primary : styles.secondary;

  return (
    <button
      type="button"
      disabled={isDisabled}
      fullw={fullwidth}
      className={[styles.button, typeToClass[type]].join(" ")}
      

    >

      {children}
    </button>
  );
}

Button.propTypes = {
  primary: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};
