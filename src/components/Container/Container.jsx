import classNames from "classnames";
import React from "react";
import propTypes from "prop-types";
import styles from "./Container.module.scss";

export function Container({ children }) {
  return <div className={classNames(styles.container)}>{children}</div>;
}

Container.propTypes = {
  children: propTypes.oneOfType([
    propTypes.node,
    propTypes.arrayOf(propTypes.node),
  ]),
};
