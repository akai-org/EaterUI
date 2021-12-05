import React from "react";
import propTypes from "prop-types";
import classNames from "classnames";
import styles from "./Card.module.scss";
import { Text } from "../Text/Text";

export function Card({
  disabled = false,
  primaryText,
  secondaryText = "",
  rightContent,
  imageUrl,
  className,
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
        <Text>{secondaryText}</Text>
      </div>
      {rightContent && (
        <div className={classNames(styles["card__right-content"])}>
          {rightContent}
        </div>
      )}
    </div>
  );
}

Card.propTypes = {
  primaryText: propTypes.string,
  secondaryText: propTypes.string,
  className: propTypes.string,
  rightContent: propTypes.node,
  imageUrl: propTypes.string,
  disabled: propTypes.bool,
};
