import React from "react";
import { Input } from "./Input";

const Template = (props) => <Input {...props} />;

export const Plain = Template.bind({});

Plain.args = {
  label: "Some label",
};

export default {
  title: "Input",
  component: Input,
};
