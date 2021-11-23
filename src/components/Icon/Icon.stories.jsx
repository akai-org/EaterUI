import React from "react";
import { text, select } from "@storybook/addon-knobs";
import { Icon, ButtonIcon } from "./Icon";

export default {
  title: "Icon",
};

const selectName = [
  "pencil",
  "bin",
  "hamburger",
  "close",
  "google",
  "calendar",
  "edit",
  "food",
];

const selectColor = ["blue", "red", "green", "white", "black"];

const selectSize = ["small", "medium", "large"];

export const IconComponent = () => {
  const name = select("Name", selectName, selectName[0]);
  const color = select("Color", selectColor, selectColor[0]);
  const size = select("Size", selectSize, selectSize[0]);
  const className = text("ClassName", "");
  return <Icon name={name} className={className} color={color} size={size} />;
};

export const ButtonIconComponent = () => {
  const name = select("Name", selectName, selectName[0]);
  const color = select("Color", selectColor, selectColor[0]);
  const size = select("Size", selectSize, selectSize[0]);
  const className = text("ClassName", "");
  return (
    <ButtonIcon
      name={name}
      className={className}
      color={color}
      size={size}
      onClick={() => {}}
    />
  );
};
