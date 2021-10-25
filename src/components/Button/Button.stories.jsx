import React from "react";
import { Button } from "./Button";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";

export const Primary = () => <Button primary={true}>Button</Button>;

export const Playground = () => {
  const children = text("children", "Default value");
  const primary = boolean("primary", true);

  return <Button primary={primary}>{children}</Button>;
};

export default {
  title: "Button",
  decorators: [withKnobs],
};
