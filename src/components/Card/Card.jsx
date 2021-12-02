import React from "react";
import styles from "./Card.module.scss";
import propTypes from "prop-types";
import classNames from "classnames";
import { Text } from "../Text/Text";
import { Checkbox } from "../Checkbox/Checkbox";

export const Card = function ({
  disabled = false,
  primaryText = "",
  secondaryText = "",
  className = "",
  rightElement = "",
  imageUrl,
  ...props
}) {
  return (
    <div
      className={classNames(styles.card, className, {
        [styles.card_disabled]: disabled,
      })}
      {...props}
    >
      {imageUrl && (
        <div className={classNames(styles["card__image-container"])}>
          <img src={imageUrl} alt="" />
        </div>
      )}
      <div className={classNames(styles.card__text)}>
        <Text size="h4">{primaryText}</Text>
        <Text size="p1">{secondaryText}</Text>
      </div>
      {rightElement && (
        <div className={classNames(styles["card__right-content"])}>
          {rightElement}
        </div>
      )}
    </div>
  );
};

Card.propTypes = {
  variant: propTypes.oneOf(["plain", "image", "checkbox", "disabled"]),
  primaryText: propTypes.string,
  secondaryText: propTypes.string,
};
