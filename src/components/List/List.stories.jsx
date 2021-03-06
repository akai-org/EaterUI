import React from "react";
import { List } from "./List";

const ListTemplate = (props) => <List {...props} />;

export const Plain = ListTemplate.bind({});

Plain.args = {
  content: ["pierwszy", "drugi"],
};

export default {
  title: "List",
  component: List,
};
