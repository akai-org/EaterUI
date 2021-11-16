import React from "react";
import { Text } from "./Text";
import { withKnobs, text, select } from "@storybook/addon-knobs";

export const Playground = () => {
  const ourText = text("text", "Default text");
  const size = select("Size", ["h1", "h2", "h3", "h4", "p"], "p");

  return <Text children={ourText} size={size} />;
};

export default {
  title: "Text",
  decorators: [withKnobs],
};
