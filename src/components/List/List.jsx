import React from "react";
import propTypes from "prop-types";
import classNames from "classnames";
import styles from "./List.module.scss";

function mapToItem(arr) {
  return arr.map((el, index) => <li key={index}>{el}</li>);
}

export function List({ content, className, ...props }) {
  return (
    <ul className={classNames(styles.list, className)} {...props}>
      {mapToItem(content)}
    </ul>
  );
}

List.propTypes = {
  content: propTypes.array,
  className: propTypes.string,
};
