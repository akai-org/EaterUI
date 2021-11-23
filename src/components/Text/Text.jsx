import React, { Children } from "react";
import styles from "./Text.module.scss";
import PropTypes from "prop-types";

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

export function Text({ children, size = "p" } = {}) {
  const Component = sizeToComponent[size.toLowerCase()] || "p";
  return <Component className={[sizeToClass[size], styles.text].join(" ")}>{children}</Component>;
}

Text.propTypes = {
  size: PropTypes.oneOf(["h1", "h2", "h3", "h4"]),
};
