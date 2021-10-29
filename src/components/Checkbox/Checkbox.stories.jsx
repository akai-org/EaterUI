import React from "react";
import { Checkbox } from "./Checkbox";
import { withKnobs, text, select, optionsKnob} from "@storybook/addon-knobs";

export default {
  title: "Checkbox",
  decorators: [withKnobs],
  argTypes: {
    value: {
      options: ["value1", "value2"],
      control: { type: 'select' }
    },
    checked: {
      options: [true, false],
      control: { type: 'radio' }
    },
  }
};


export const Playground = ({value, checked}) => {
  const name = text("name", "name");
  return <Checkbox value={value} name={name} checked={checked}></Checkbox>;
};


