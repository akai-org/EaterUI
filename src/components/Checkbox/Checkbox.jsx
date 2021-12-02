import React from "react";
import PropTypes from "prop-types";
import styles from "./Checkbox.module.scss";
import classNames from "classnames";

export function Checkbox({ name, checked, className } = {}) {
  return (
    <input
      className={classNames(styles.checkbox, className)}
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
