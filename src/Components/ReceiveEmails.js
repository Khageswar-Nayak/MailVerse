import React from "react";
import classes from "./ReceiveEmails.module.css";
import { Badge, IconButton } from "@mui/material";
import { Checkbox } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ReceiveEmailActions } from "../Store/ReceiveEmail-slice";

const ReceiveEmails = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.auth.email);
  const receiveEmails = useSelector(
    (state) => state.receiveEmail.receiveEmails
  );
  const modifiedUserEmail = userEmail.replace("@", "").replace(".", "");

  const openReceiveEmails = async () => {
    navigate("/receiveEmaildetails");
    // console.log("props", props);
    dispatch(
      ReceiveEmailActions.setSelectedEmail({
        sentEmailId: props.sentEmailId,
        subject: props.subject,
        message: props.message,
        time: props.time,
        day: props.day,
        month: props.month,
        year: props.year,
      })
    );

    const updatedEmail = {
      ...props,
      read: true,
    };
    try {
      const updateEmail = await fetch(
        `https://mailverse-a6ae2-default-rtdb.firebaseio.com/receiveEmails/${modifiedUserEmail}/${props.id}.json`,
        {
          method: "PUT",
          body: JSON.stringify(updatedEmail),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (updateEmail.ok) {
        const updatedEmails = receiveEmails.map((email) =>
          email.id === props.id ? { ...updatedEmail } : email
        );
        dispatch(ReceiveEmailActions.updateReceiveEmail(updatedEmails));
      }
    } catch (err) {
      console.log(err);
    }
  };
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
        <h4 onClick={openReceiveEmails}> {props.sentEmailId}</h4>
      </div>
      <div
        className={classes["receiveEmails-middle"]}
        onClick={openReceiveEmails}
      >
        <StarBorderIcon />

        <div className={classes["receiveEmails-middle-msg"]}>
          <p>
            <b>{props.subject}</b> {props.message}
          </p>
        </div>
      </div>
      <div className={classes["receiveEmails-right"]}>
        <p>
          {props.day}/{props.month}/{props.year} {props.time}
        </p>
      </div>
    </div>
  );
};

export default ReceiveEmails;
