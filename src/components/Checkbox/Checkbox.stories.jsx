import React from "react";
import { Checkbox } from "./Checkbox";
import { withKnobs } from "@storybook/addon-knobs";

export const Primary = () => <Checkbox></Checkbox>;

export const Playground = () => {
  return <Checkbox ></Checkbox>;
};

export default {
  title: "Checkbox",
  decorators: [withKnobs],
};

