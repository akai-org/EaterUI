import React from "react";
import { Navbar } from "./Navbar";

const Template = (props) => <Navbar {...props} />;

const textContent = {
  isOpen: false,
};

export const Plain = Template.bind({});

Plain.args = {
  ...textContent,
};
