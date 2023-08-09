import React from "react";
import classes from "./SidebarOptions.module.css";

const SidebarOptions = ({ Icon, title, number, msg, isactive }) => {
  return (
    <div
      className={`${classes.sidebaroptions} ${
        isactive && classes["sidebaroptions-active"]
      }`}
    >
      <Icon />
      <h4>{title}</h4>
      <p>
        {msg} {number}
      </p>
    </div>
  );
};

export default SidebarOptions;
