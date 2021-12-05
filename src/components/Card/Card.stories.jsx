import React from "react";
import { Card } from "./Card";
import { Checkbox } from "@/Checkbox/Checkbox";

const Template = (props) => <Card {...props} />;

const textContent = {
  primaryText: "some fancy stuff",
  secondaryText: "some shiny stuff",
};

export const Plain = Template.bind({});

Plain.args = {
  ...textContent,
};

export const withImage = Template.bind({});

withImage.args = {
  imageUrl: "https://source.unsplash.com/random/47x47",
  ...textContent,
};

export const withCheckbox = Template.bind({});

withCheckbox.args = {
  ...textContent,
  rightContent: <Checkbox />,
};

export const disabled = Template.bind({});

disabled.args = {
  ...textContent,
  disabled: true,
};

export default {
  title: "Card",
  component: Card,
};
