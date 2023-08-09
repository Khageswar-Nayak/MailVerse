import React from "react";
import classes from "./Sidebar.module.css";
import { Button } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import SidebarOptions from "./SidebarOptions";
import InboxIcon from "@mui/icons-material/Inbox";
import StarRateIcon from "@mui/icons-material/StarRate";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SendIcon from "@mui/icons-material/Send";
import DraftsIcon from "@mui/icons-material/Drafts";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { sidebarButtonActions } from "../Store/Sidebar-slice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const countsentEmails = useSelector(
    (state) => state.sentEmail.countsentEmails
  );
  const countReceiveEmails = useSelector(
    (state) => state.receiveMail.countReceiveEmails
  );
  const activeButton = useSelector((state) => state.sidebar.activeButton);

  const handleButtonClick = (buttonName) => {
    dispatch(sidebarButtonActions.setActiveButton(buttonName));
    localStorage.setItem("activeButton", buttonName);
  };
  return (
    <div className={classes.sidebar}>
      <Link to="/compose" onClick={() => handleButtonClick("none")}>
        <Button startIcon={<CreateIcon />} className={classes["compose-btn"]}>
          Compose
        </Button>
      </Link>
      <Link to="/home" onClick={() => handleButtonClick("inbox")}>
        <SidebarOptions
          Icon={InboxIcon}
          title={"Inbox"}
          number={countReceiveEmails}
          isactive={activeButton === "inbox"}
        />
      </Link>

      <SidebarOptions
        Icon={StarRateIcon}
        title={"Starred"}
        number={23}
        isactive={activeButton === "Starred"}
        onClick={() => handleButtonClick("Starred")}
      />
      <SidebarOptions
        Icon={AccessTimeIcon}
        title={"Snoozed"}
        number={23}
        onClick={() => handleButtonClick("Snoozed")}
        isactive={activeButton === "Snoozed"}
      />
      <Link to="/sent" onClick={() => handleButtonClick("sent")}>
        <SidebarOptions
          Icon={SendIcon}
          title={"Sent"}
          number={countsentEmails}
          isactive={activeButton === "sent"}
        />
      </Link>
      <SidebarOptions
        Icon={DraftsIcon}
        title={"Drafts"}
        number={23}
        isactive={activeButton === "drafts"}
        onClick={() => handleButtonClick("drafts")}
      />
      <SidebarOptions
        Icon={DeleteIcon}
        title={"Trash"}
        number={23}
        isactive={activeButton === "trash"}
        onClick={() => handleButtonClick("trash")}
      />
    </div>
  );
};

export default Sidebar;
