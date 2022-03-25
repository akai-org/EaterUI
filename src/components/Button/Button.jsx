import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import classNames from "classnames";
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

export function LinkButton({
  type = "primary",
  fullwidth = false,
  isDisabled = false,
  children,
  onClick,
  href = "/",
}) {
  return (
    <Link to={href}>
      <Button
        type={type}
        fullwidth={fullwidth}
        isDisabled={isDisabled}
        onClick={onClick}
      >
        {children}
      </Button>
    </Link>
  );
}

const buttonPropTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  fullwidth: PropTypes.bool,
  variant: PropTypes.oneOf(["primary", "secondary", "danger"]),
  isDisabled: PropTypes.bool,
  className: PropTypes.string,
  type: PropTypes.string,
  to: PropTypes.string,
};

Button.propTypes = buttonPropTypes;

LinkButton.propTypes = {
  ...buttonPropTypes,
  href: PropTypes.string,
};
