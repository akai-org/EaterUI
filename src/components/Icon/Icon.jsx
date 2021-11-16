import React from "react";
import PropTypes from "prop-types";
import { BsPencilFill, BsGoogle } from "react-icons/bs";
import { ImBin } from "react-icons/im";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgClose } from "react-icons/cg";
import { BiCalendar } from "react-icons/bi";
import { MdPlaylistAddCheck, MdOutlineFastfood } from "react-icons/md";
import classNames from "classnames";
import styles from "./Icon.module.scss";

const iconNames = {
  pencil: BsPencilFill,
  bin: ImBin,
  hamburger: GiHamburgerMenu,
  close: CgClose,
  google: BsGoogle,
  calendar: BiCalendar,
  edit: MdPlaylistAddCheck,
  food: MdOutlineFastfood,
};

const colorStyles = {
  blue: "#7bb9fa",
  red: "#f67f7f",
  green: "#38db81",
  white: "#FFFFFF",
  black: "#282828",
};

const sizeStyles = {
  small: "16px",
  medium: "32px",
  large: "64px",
};

export function Icon({
  name,
  className,
  color = "blue",
  size = "medium",
} = {}) {
  const CustomTag = iconNames[name];

  return (
    <span className={classNames(className, styles.icon)}>
      <CustomTag color={colorStyles[color]} size={sizeStyles[size]} />
    </span>
  );
}

export function ButtonIcon({
  name,
  className,
  color = "blue",
  size = "medium",
  onClick,
}) {
  return (
    <button onClick={onClick} className={styles.buttonIcon}>
      <Icon name={name} className={className} color={color} size={size} />
    </button>
  );
}

const iconsPropTypes = {
  name: PropTypes.oneOf(Object.keys(iconNames)).isRequired,
  className: PropTypes.string,
  color: PropTypes.oneOf(Object.keys(colorStyles)),
  size: PropTypes.oneOf(Object.keys(sizeStyles)),
};

Icon.propTypes = iconsPropTypes;

ButtonIcon.propTypes = {
  ...iconsPropTypes,
  onClick: PropTypes.func.isRequired,
};
