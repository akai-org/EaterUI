import React from "react";
import PropTypes from "prop-types";
import styles from "./Checkbox.module.scss";

export function Checkbox({ name, checked } = {}) {
  return (
    <input
      className={styles.checkbox}
      type="checkbox"
      name={name}
      checked={checked}
    />
  );
}

Checkbox.propTypes = {
  name: PropTypes.string,
  checked: PropTypes.bool,
};
