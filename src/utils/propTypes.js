import propTypes from "prop-types";

export const recipePropType = propTypes.shape({
  id: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  description: propTypes.string,
  graphicURL: propTypes.string,
});
