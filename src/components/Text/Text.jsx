import React from "react";
import styles from "./Text.module.scss";
import { PropTypes } from "react";

const sizeToClass = {
  h1: styles.text_h1,
  h2: styles.text_h2,
  h3: styles.text_h3,
  h4: styles.text_h4,
  p: styles.text_paragraph,
};

export function Text({ text, size = "p" } = {}) {
  const Component = size.toLowerCase() || "p";
  return (
    <Component className={sizeToClass[size]}>{text}</Component>
  );
}

Text.propTypes = {
  size: PropTypes.oneOf(["h1", "h2", "h3", "h4", "p"]).isRequired,
  text: PropTypes.node.isRequired,
};
