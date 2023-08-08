import React from "react";
import classes from "./ReceiveEmails.module.css";
import { Badge, IconButton } from "@mui/material";
import { Checkbox } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const ReceiveEmails = (props) => {
  return (
    <div className={classes.receiveEmails}>
      <div className={classes["receiveEmails-left"]}>
        <Checkbox />
        {!props.read && (
          <Badge
            color="primary"
            variant="dot"
            style={{ marginRight: "10px" }}
          />
        )}
        <h4> {props.sentEmailId}</h4>
      </div>
      <div className={classes["receiveEmails-middle"]}>
        <StarBorderIcon />

        <div className={classes["receiveEmails-middle-msg"]}>
          <p>
            <b>{props.subject}</b> {props.message}
          </p>
        </div>
      </div>
      <div className={classes["receiveEmails-right"]}>
        <p>{props.time}</p>
      </div>
    </div>
  );
};

export default ReceiveEmails;
