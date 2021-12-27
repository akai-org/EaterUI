import React from "react";
import PropTypes from "prop-types";
import styles from "./Input.module.scss";

export const Input = React.forwardRef(
  ({ label, errorMessage, ...rest }, ref) => (
    <label className={styles.fieldWrapper}>
      {!label && <div>{label}</div>}
      <input
        ref={ref}
        {...rest}
        className={errorMessage ? styles.errorOutline : ""}
      />
      <div className={styles.errorMessage}>{errorMessage}</div>
    </label>
  ),
);

export const Textarea = React.forwardRef(
  ({ label, errorMessage, ...rest }, ref) => (
    <label className={styles.fieldWrapper}>
      <div>{label}</div>
      <textarea
        ref={ref}
        {...rest}
        className={errorMessage ? styles.errorOutline : ""}
      />
      <div className={styles.errorMessage}>{errorMessage}</div>
    </label>
  ),
);

Input.displayName = "Input";
Textarea.displayName = "Textarea";

Input.propTypes = {
  label: PropTypes.string,
  errorMessage: PropTypes.string,
  rest: PropTypes.node,
  ref: PropTypes.node,
};

Textarea.propTypes = {
  label: PropTypes.string,
  errorMessage: PropTypes.string,
  rest: PropTypes.node,
  ref: PropTypes.node,
};
