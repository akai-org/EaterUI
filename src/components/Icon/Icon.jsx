import PropTypes from "prop-types";
import React from "react";
import { BsPencilFill, BsGoogle } from "react-icons/bs";
import { ImBin } from "react-icons/im";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgClose } from "react-icons/cg";
import { BiCalendar } from "react-icons/bi";
import { MdPlaylistAddCheck, MdOutlineFastfood } from "react-icons/md";
import { IconContext } from "react-icons";
import styles from "./Icon.module.scss";

const iconNames = {
  pencil: "BsPencilFill",
  bin: "ImBin",
  hamburger: "GiHamburgerMenu",
  close: "CgClose",
  google: "BsGoogle",
  calendar: "BiCalendar",
  edit: "MdPlaylistAddCheck",
  food: "MdOutlineFastfood",
};

export function Icon({ name, color, size }) {
  const CustomTag = iconNames[name];
  return (
    <IconContext.Provider value={{ color, size }}>
      <span className={styles.icon}>
        <CustomTag />
      </span>
    </IconContext.Provider>
  );
}

Icon.PropTypes = {
  name: PropTypes.oneOf(Object.keys(iconNames)),
  color: PropTypes.string,
  size: PropTypes.string,
};

Icon.defaultProps = {
  color: "7BB9FA",
  size: "13em",
};
