import React from "react";
// eslint-disable-next-line object-curly-newline
import { withKnobs, text, select, boolean } from "@storybook/addon-knobs";
import { Button } from "./Button.jsx";

export const Primary = () => <Button type="primary">Button</Button>;

export const Secondary = () => <Button type="secondary">Button</Button>;

export const Playground = () => {
  const children = text("children", "Default value");
  const type = select("type", ["primary", "secondary", "danger"]);
  const fullwidth = boolean("fullwidth", false);

  return (
    <Button type={type} fullwidth={fullwidth}>
      {children}
    </Button>
  );
};

export default {
  title: "Button",
  decorators: [withKnobs],
};
