import React from "react";
import classes from "./Header.module.css";
import { IconButton, Avatar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Logo from "../assets/mailverse1.jpeg";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import AppsIcon from "@mui/icons-material/Apps";
import MenuIcon from "@mui/icons-material/Menu";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
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
    localStorage.removeItem("idToken");
    localStorage.removeItem("email");
    localStorage.removeItem("activeButton");
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
        <IconButton title="Help">
          <HelpOutlineIcon />
        </IconButton>
        <IconButton title="Settings">
          <SettingsIcon />
        </IconButton>
        <IconButton title="Apps">
          <AppsIcon />
        </IconButton>
        <Avatar />
        <IconButton onClick={logoutHandler} title="Logout">
          <PowerSettingsNewIcon
            style={{
              color: "#da2a2a",
              height: "30px",
              width: "30px",
            }}
          />
        </IconButton>
      </div>
      {/* <IconButton className={classes["menu-icon"]} title="Menu">
        <MenuIcon />
      </IconButton> */}
    </div>
  );
};

export default Header;
