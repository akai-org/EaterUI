import React from "react";
import propTypes from "prop-types";
import classNames from "classnames";
import { List } from "../List/List";
import { Text } from "../Text/Text";
import styles from "./Card.module.scss";

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
        {typeof secondaryText === "string" ? (
          <Text>{secondaryText}</Text>
        ) : (
          <List content={secondaryText} />
        )}
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
  secondaryText: propTypes.oneOfType([propTypes.string, propTypes.array]),
  className: propTypes.string,
  rightContent: propTypes.node,
  imageUrl: propTypes.string,
  disabled: propTypes.bool,
};
