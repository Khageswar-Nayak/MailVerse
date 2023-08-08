import React from "react";
import classes from "./Header.module.css";
import { IconButton, Avatar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Logo from "../assets/mailverse1.jpeg";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import AppsIcon from "@mui/icons-material/Apps";
import { useDispatch } from "react-redux";
import { authActions } from "../Store/Auth-slice";
import { useNavigate } from "react-router-dom";
import { sidebarButtonActions } from "../Store/Sidebar-slice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(authActions.logout());
    navigate("/");
    dispatch(sidebarButtonActions.setActiveButton("inbox"));
  };
  return (
    <div className={classes.header}>
      <div className={classes["header-left"]}>
        <img className={classes["header-image"]} src={Logo} alt="logo" />
      </div>
      <div className={classes["header-middle"]}>
        <div className={classes["search-mail"]}>
          <IconButton>
            <SearchIcon />
          </IconButton>
          <input type="text" placeholder="Search mail" />
          <IconButton>
            <ExpandMoreIcon />
          </IconButton>
        </div>
      </div>
      <div className={classes["header-right"]}>
        <IconButton>
          <HelpOutlineIcon />
        </IconButton>
        <IconButton>
          <SettingsIcon />
        </IconButton>
        <IconButton>
          <AppsIcon />
        </IconButton>
        <IconButton onClick={logoutHandler}>
          <Avatar />
        </IconButton>
      </div>
    </div>
  );
};

export default Header;
