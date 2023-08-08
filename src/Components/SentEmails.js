import React from "react";
import classes from "./SentEmails.module.css";
import { IconButton } from "@mui/material";
import { Checkbox } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const SentEmails = (props) => {
  return (
    <>
      {/* <h2 className={classes.heading}>All messages</h2> */}
      <div className={classes.emailbody}>
        <div className={classes["emailbody-left"]}>
          <Checkbox />
          <h4>To:{props.receiveEmailId}</h4>
        </div>
        <div className={classes["emailbody-middle"]}>
          <StarBorderIcon />

          <div className={classes["emailbody-middle-msg"]}>
            <p>
              <b>{props.subject}</b> {props.message}
            </p>
          </div>
        </div>
        <div className={classes["emailbody-right"]}>
          <p>{props.time}</p>
        </div>
      </div>
    </>
  );
};

export default SentEmails;
