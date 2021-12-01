import React from "react";
import { withKnobs, text, select } from "@storybook/addon-knobs";
import { Text } from "./Text";

export const Playground = () => {
  const ourText = text("text", "Default text");
  const size = select("Size", ["h1", "h2", "h3", "h4", "p"], "p");

  return <Text size={size}>{ourText} </Text>;
};

export default {
  title: "Text",
  decorators: [withKnobs],
};
