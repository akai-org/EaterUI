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

export function Icon({
  name,
  className,
  color = "blue",
  size = "medium",
} = {}) {
  const CustomTag = iconNames[name];

  return (
    <span
      className={classNames(
        className,
        styles.icon,
        styles[color],
        styles[size],
      )}
    >
      <CustomTag />
    </span>
  );
}

export function ButtonIcon({ name, className, color, size, onClick }) {
  return (
    <span onClick={onClick} className={styles["button-icon"]}>
      <Icon name={name} className={className} color={color} size={size} />
    </span>
  );
}

const iconsPropTypes = {
  name: PropTypes.oneOf(Object.keys(iconNames)).isRequired,
  className: PropTypes.string,
  color: PropTypes.oneOf(["blue", "red", "green", "white", "black"]),
  size: PropTypes.oneOf(["small", "medium","large", "Large"]),
};

Icon.propTypes = iconsPropTypes;

ButtonIcon.propTypes = {
  ...iconsPropTypes,
  onClick: PropTypes.func.isRequired,
};
