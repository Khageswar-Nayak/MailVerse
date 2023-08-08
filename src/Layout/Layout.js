import React from "react";
import classes from "./Layout.module.css";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className={classes["layout-body"]}>
        <Sidebar />
        <div>{children}</div>
      </div>
    </>
  );
};

export default Layout;
