import React from "react";
import classes from "./SentEmails.module.css";
import { Checkbox } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sentEmailActions } from "../Store/sentEmail-slice";

const SentEmails = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const openSentEmails = () => {
    navigate("/sentemaildetail");
    dispatch(
      sentEmailActions.setSelectedEmail({
        receiveEmailId: props.receiveEmailId,
        subject: props.subject,
        message: props.message,
        time: props.time,
      })
    );
  };

  return (
    <div className={classes.sentEmails} onClick={openSentEmails}>
      <div className={classes["sentEmails-left"]}>
        <Checkbox />
        <h4>To : {props.receiveEmailId}</h4>
      </div>
      <div className={classes["sentEmails-middle"]}>
        <StarBorderIcon />

        <div className={classes["sentEmails-middle-msg"]}>
          <p>
            <b>{props.subject}</b> {props.message}
          </p>
        </div>
      </div>
      <div className={classes["sentEmails-right"]}>
        <p>{props.time}</p>
      </div>
    </div>
  );
};

export default SentEmails;
