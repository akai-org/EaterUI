import React from "react";
import { Checkbox } from "./Checkbox";
import { withKnobs, text } from "@storybook/addon-knobs";

export default {
  title: "Checkbox",
  argTypes: {
    checked: {
      options: [true, false],
      control: { type: "radio" },
    },
  },
};

export const Playground = ({ checked }) => {
  const name = text("name", "name");
  return <Checkbox name={name} checked={checked}></Checkbox>;
};
