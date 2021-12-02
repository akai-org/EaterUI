import classNames from "classnames";
import React from "react";
import styles from "./Container.module.scss";

export function Container() {
  return <div className={classNames(styles.container)}>Test Content</div>;
}
