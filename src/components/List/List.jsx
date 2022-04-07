import React from "react";
import propTypes from "prop-types";
import classNames from "classnames";
import styles from "./List.module.scss";

function mapToItem(arr) {
  return arr.map((el, index) => <li key={index}>{el}</li>);
}

export function List({ ordered = false, content, className, ...props }) {
  return (
    <>
      {ordered ? (
        <ol className={classNames(styles.list, className)} {...props}>
          {mapToItem(content)}
        </ol>
      ) : (
        <ul className={classNames(styles.list, className)} {...props}>
          {mapToItem(content)}
        </ul>
      )}
    </>
  );
}

List.propTypes = {
  ordered: propTypes.bool,
  content: propTypes.array,
  className: propTypes.string,
};
