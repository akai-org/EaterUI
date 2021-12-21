import React from "react";
import propTypes from "prop-types";
import classNames from "classnames";
import styles from "./ButtonGroup.module.scss";

export const ButtonGroup = ({ children, className }) => (
  <div className={classNames(styles.buttonGroup, className)}>{children}</div>
);

ButtonGroup.propTypes = {
  children: propTypes.oneOfType([
    propTypes.node,
    propTypes.arrayOf(propTypes.node),
  ]),
  className: propTypes.string,
};
