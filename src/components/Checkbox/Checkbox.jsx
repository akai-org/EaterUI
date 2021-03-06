import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./Checkbox.module.scss";

export function Checkbox({
  name,
  checked,
  className,
  onChange,
  isDisabled = false,
} = {}) {
  return (
    <input
      className={classNames(styles.checkbox, className)}
      type="checkbox"
      name={name}
      checked={checked}
      onChange={onChange}
      disabled={isDisabled}
    />
  );
}

Checkbox.propTypes = {
  name: PropTypes.string,
  checked: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
  isDisabled: PropTypes.bool,
};
