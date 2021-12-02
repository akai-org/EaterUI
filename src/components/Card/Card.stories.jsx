import React from "react";
import { Card } from "./Card";
import { Checkbox } from "../Checkbox/Checkbox";

const Template = (props) => <Card {...props} />;

export const Plain = Template.bind({});

Plain.args = {
  primaryText: "some fancy stuff",
  secondaryText: "some shiny stuff",
};

export const withImage = Template.bind({});

withImage.args = {
  imageUrl: "https://source.unsplash.com/random/47x47",
  primaryText: "some fancy stuff",
  secondaryText: "some shiny stuff",
};

export const withCheckbox = Template.bind({});

withCheckbox.args = {
  primaryText: "some fancy stuff",
  secondaryText: "some shiny stuff",
  rightElement: <Checkbox />,
};

export const disabled = Template.bind({});

disabled.args = {
  primaryText: "some fancy stuff",
  secondaryText: "some shiny stuff",
  disabled,
};

export default {
  title: "Card",
  component: Card,
  args: {
    primaryText: "some fancy stuff",
    secondaryText: "some shiny stuff",
    disabled,
  },
};
