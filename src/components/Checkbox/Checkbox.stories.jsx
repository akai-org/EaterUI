import React from "react";
import { text, boolean } from "@storybook/addon-knobs";
import { Checkbox } from "./Checkbox";

export default {
  title: "Checkbox",
};

export const Playground = () => {
  const name = text("name", "name");
  const checked = boolean("checked");
  return <Checkbox name={name} checked={checked}></Checkbox>;
};
