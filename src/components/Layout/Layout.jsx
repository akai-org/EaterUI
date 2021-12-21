import { BrowserRouter } from "react-router-dom";
import propTypes from "prop-types";
import React from "react";
import { Container } from "../Container/Container";

export const Layout = ({ children }) => (
  <BrowserRouter>
    <Container>{children}</Container>
  </BrowserRouter>
);

Layout.propTypes = {
  children: propTypes.oneOfType([
    propTypes.node,
    propTypes.arrayOf(propTypes.node),
  ]),
};
