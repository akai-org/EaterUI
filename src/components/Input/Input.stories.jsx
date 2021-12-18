import React from "react";
import { Input, Textarea } from "./Input";

const InputTemplate = (props) => <Input {...props} />;
const TextareaTemplate = (props) => <Textarea {...props} />;

export const Plain = InputTemplate.bind({});
export const AsTextarea = TextareaTemplate.bind({});

Plain.args = {
  label: "Some label",
};

export default {
  title: "Input",
  component: Input,
};
