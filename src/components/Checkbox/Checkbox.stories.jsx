import React from "react";
import { Checkbox } from "./Checkbox";
import { text, boolean} from "@storybook/addon-knobs";

export default {
  title: "Checkbox",
};

export const Playground = () => {
  const name = text("name", "name");
  const checked = boolean("checked");
  return <Checkbox name={name} checked={checked}></Checkbox>;
};
