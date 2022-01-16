import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Link } from "react-router-dom";
import styles from "./Button.module.scss";

const variantToClass = {
  primary: styles.primary,
  secondary: styles.secondary,
  danger: styles.danger,
};

export function Button({
  variant = "primary",
  fullwidth = false,
  isDisabled = false,
  children,
  onClick,
  className,
  type,
  to,
} = {}) {
  if (to)
    return (
      <Link
        className={classNames(
          styles.button,
          variantToClass[variant],
          className,
          {
            [styles.fullw]: fullwidth,
          },
        )}
        to={to}
        onClick={onClick}
      >
        {children}
      </Link>
    );

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={classNames(styles.button, variantToClass[variant], className, {
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
  onClick: PropTypes.func,
  fullwidth: PropTypes.bool,
  variant: PropTypes.oneOf(["primary", "secondary", "danger"]),
  isDisabled: PropTypes.bool,
  className: PropTypes.string,
  type: PropTypes.string,
  to: PropTypes.string,
};
