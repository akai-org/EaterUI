import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./Text.module.scss";

const sizeToClass = {
  h1: styles.text_h1,
  h2: styles.text_h2,
  h3: styles.text_h3,
  h4: styles.text_h4,
  p: styles.text_paragraph,
};

const sizeToComponent = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  p: "p",
};

export function Text({ size = "p", children, className, ...props } = {}) {
  const Component = sizeToComponent[size.toLowerCase()] || "p";
  return (
    <Component
      className={classNames(sizeToClass[size], styles.text, className)}
      {...props}
    >
      {children}
    </Component>
  );
}

Text.propTypes = {
  size: PropTypes.oneOf(["h1", "h2", "h3", "h4"]),
  children: PropTypes.string,
  className: PropTypes.string,
};
