import propTypes from "prop-types";
import React from "react";
import { Container } from "../Container/Container";

export const Layout = ({ children }) => <Container>{children}</Container>;

Layout.propTypes = {
  children: propTypes.oneOfType([
    propTypes.node,
    propTypes.arrayOf(propTypes.node),
  ]),
};
