import React from "react";
import { text } from "@storybook/addon-knobs";
import { Icon } from "./Icon.jsx";

export default {
  title: "Icon",
  // component: Icon,
  // argTypes: {
  //     name:{
  //         options: ["pencil", "bin"],
  //         control: {type: "radio"}
  //     },
  //     color: {control: 'color'},
  //     size:
  // }
};

export const Playground = () => {
  const name = text("name", "pencil");
  const color = text("color", "blue");
  const size = text("size", "1em");
  return <Icon name={name} color={color} size={size} />;
};
