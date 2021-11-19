import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./Button.module.scss";

const typeToClass = {
  primary: styles.primary,
  secondary: styles.secondary,
  danger: styles.danger,
};

export function Button({
  type = "primary",
  fullwidth = false,
  isDisabled = false,
  children,
  onClick,
} = {}) {
  return (
    <button
      type="button"
      disabled={isDisabled}
      className={classNames(styles.button, typeToClass[type], {
        [styles.fullw]: fullwidth,
      })}


        
      
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  fullwidth: PropTypes.bool,
  type: PropTypes.oneOf(["primary", "secondary", "danger"]),
  isDisabled: PropTypes.bool,
};
