import React from "react";
import { withKnobs, text, select } from "@storybook/addon-knobs";
import { Text } from "./Text";
import styles from "../../assets/globals.scss";

export const Playground = () => {
  const ourText = text("text", "Default text");
  const size = select("Size", ["h1", "h2", "h3", "h4", "p"], "p");

  return (
    <>
      <div className={styles.global}>
        {" "}
        <Text size={size}>{ourText} </Text>{" "}
      </div>
    </>
  );
};

export default {
  title: "Text",
  decorators: [withKnobs],
};
