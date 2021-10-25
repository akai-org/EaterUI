import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./Button.module.scss";

const sizeToClass = {
  small: styles.small,
  medium: styles.medium,
  large: styles.large,
};

export function Button({
  primary = true,
  size = "medium",
  children,
  ...props
} = {}) {
  const mode = primary ? styles.primary : styles.secondary;

  return (
    <button
      type="button"
      className={classNames(styles.button, sizeToClass[size], mode)}
      {...props}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  primary: PropTypes.bool,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};
