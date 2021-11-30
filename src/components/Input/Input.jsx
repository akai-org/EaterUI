import React from "react";
import PropTypes from "prop-types";
import styles from "./Input.module.scss";

export const Input = React.forwardRef(
  ({ label, errorMessage, ...rest }, ref) => {
    return (
      <label>
        <div>{label}</div>
        <input
          ref={ref}
          {...rest}
          className={errorMessage ? styles["error-outline"] : ""}
        />
        <div className={styles["error-message"]}>{errorMessage}</div>
      </label>
    );
  },
);

Input.propTypes = {
  label: PropTypes.string,
  errorMessage: PropTypes.string,
  rest: PropTypes.node,
  ref: PropTypes.node,
};
