import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
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
  onClick: PropTypes.func.isRequired,
  fullwidth: PropTypes.bool,
  type: PropTypes.oneOf(["primary", "secondary", "danger"]),
  isDisabled: PropTypes.bool,
};

Button.propTypes = buttonPropTypes;

LinkButton.propTypes = {
  ...buttonPropTypes,
  href: PropTypes.string,
};
