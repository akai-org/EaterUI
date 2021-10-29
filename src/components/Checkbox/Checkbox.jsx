import React from "react";
import PropTypes from "prop-types";
import styles from "./Checkbox.module.scss";
import { color } from "@storybook/addon-knobs";

export function Checkbox({value, name} = {}) {
  return <input type="checkbox" name={name} value={value}/>
}

Checkbox.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  onClick: PropTypes.func,
};
