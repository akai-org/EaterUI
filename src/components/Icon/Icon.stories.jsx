import PropTypes from "prop-types";
import React from "react";
import styles from "./Icon.module.scss";

export function Icon({ name, color = "7BB9FA" }) {
  return (
    <span
      className={styles.checkbox}
      type="checkbox"
      name={name}
      color={color}
    ></span>
  );
}

Icon.PropTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
};
