import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./Checkbox.module.scss";

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
  className: PropTypes.string,
};
