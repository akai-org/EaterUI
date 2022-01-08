import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Card, Icon } from "@/components";

const IngredientsList = ({ ingredients, handleEditLinkClick }) => (
  <div>
    {ingredients.map(({ id, name, amount, measure }) => (
      <Card
        key={id}
        primaryText={name}
        secondaryText={`${amount} ${measure}`}
        rightContent={
          <Link to="add-ingredient">
            <Icon name="pencil" size="medium" />
          </Link>
        }
        onClick={() => handleEditLinkClick(id)}
      />
    ))}
  </div>
);

IngredientsList.propTypes = {
  handleEditLinkClick: PropTypes.func,
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      amount: PropTypes.number,
      unit: PropTypes.string,
    }),
  ),
};

export default IngredientsList;
