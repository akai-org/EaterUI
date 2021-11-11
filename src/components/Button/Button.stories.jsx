import React from "react";
import { Button } from "./Button";
import { withKnobs, text, select } from "@storybook/addon-knobs";

export const Primary = () => <Button type="primary">Button</Button>;

export const Secondary = () => <Button type="secondary">Button</Button>;

export const Playground = () => {
  const children = text("children", "Default value");
  const type = select("type", ["primary", "secondary", "danger"])

  return <Button type={type}>{children}</Button>;
};

export default {
  title: "Button",
  decorators: [withKnobs],
};
