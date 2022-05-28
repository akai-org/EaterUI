import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./Input.module.scss";

export const Input = React.forwardRef(
  ({ label, errorMessage, className, ...rest }, ref) => (
    <label className={classNames(styles.fieldWrapper, className)}>
      {label && <div>{label}</div>}
      <input
        ref={ref}
        {...rest}
        className={errorMessage ? styles.errorOutline : ""}
      />
      {errorMessage && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}
    </label>
  ),
);

export const Textarea = React.forwardRef(
  ({ label, errorMessage, className, ...rest }, ref) => (
    <label className={classNames(styles.fieldWrapper, className)}>
      <div>{label}</div>
      <textarea
        ref={ref}
        {...rest}
        className={errorMessage ? styles.errorOutline : ""}
      />
      {errorMessage && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}
    </label>
  ),
);

Input.displayName = "Input";
Textarea.displayName = "Textarea";

Input.propTypes = {
  label: PropTypes.string,
  errorMessage: PropTypes.string,
  className: PropTypes.string,
  rest: PropTypes.node,
  ref: PropTypes.node,
};

Textarea.propTypes = {
  label: PropTypes.string,
  errorMessage: PropTypes.string,
  className: PropTypes.string,
  rest: PropTypes.node,
  ref: PropTypes.node,
};
