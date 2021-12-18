import React from "react";
import propTypes from "prop-types";
import styles from "./ButtonGroup.module.scss";

export const ButtonGroup = ({ children }) => (
  <div className={styles.buttonGroup}>{children}</div>
);

ButtonGroup.propTypes = {
  children: propTypes.oneOfType([
    propTypes.node,
    propTypes.arrayOf(propTypes.node),
  ]),
};
