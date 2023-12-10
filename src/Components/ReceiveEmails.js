import React, { useState } from "react";
import classes from "./ReceiveEmails.module.css";
import { Badge, IconButton } from "@mui/material";
import { Checkbox } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ReceiveEmailActions } from "../Store/ReceiveEmail-slice";
import { trashEmailActions } from "../Store/TrashEmail-slice";
import { ToastContainer, toast } from "react-toastify";

const ReceiveEmails = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.auth.email);
  const [isChecked, setIsChecked] = useState(false);
  const receiveEmails = useSelector(
    (state) => state.receiveEmail.receiveEmails
  );
  const modifiedUserEmail = userEmail.replace("@", "").replace(".", "");

  const receiveEmailDetails = {
    sentORreceive: "From",
    id: props.id,
    emailId: props.sentEmailId,
    subject: props.subject,
    message: props.message,
    time: props.time,
    day: props.day,
    month: props.month,
    year: props.year,
  };

  const addToTrashHandler = async () => {
    try {
      const deleteEmailFromReceiveEmails = await fetch(
        `https://mail-verse-69a76-default-rtdb.firebaseio.com/receiveEmails/${modifiedUserEmail}/${props.id}.json`,
        {
          method: "DELETE",
        }
      );
      if (deleteEmailFromReceiveEmails.ok) {
        const updatedReceiveEmails = receiveEmails.filter(
          (email) => email.id !== receiveEmailDetails.id
        );
        dispatch(ReceiveEmailActions.removeReceiveEmail(updatedReceiveEmails));
      }

      const trashEmail = await fetch(
        `https://mail-verse-69a76-default-rtdb.firebaseio.com/trashEmails/${modifiedUserEmail}.json`,
        {
          method: "POST",
          body: JSON.stringify(receiveEmailDetails),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (trashEmail.ok) {
        toast.success("Added to Trash", {
          position: "top-right",
          theme: "colored",
          autoClose: 3000,
        });
        const data = await trashEmail.json();
        const updatedTrashEmail = { ...receiveEmailDetails, id: data.name };
        dispatch(trashEmailActions.addToTrashEmails(updatedTrashEmail));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const openReceiveEmails = async () => {
    navigate("/receiveEmaildetails");
    // console.log("props", props);
    dispatch(ReceiveEmailActions.setSelectedEmail(receiveEmailDetails));

    const updatedEmail = {
      ...props,
      read: true,
    };
    try {
      const updateEmail = await fetch(
        `https://mail-verse-69a76-default-rtdb.firebaseio.com/receiveEmails/${modifiedUserEmail}/${props.id}.json`,
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

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <>
      <div className={classes.receiveEmails}>
        <div className={classes["receiveEmails-left"]}>
          <Checkbox
            checked={props.isChecked ? true : isChecked}
            onChange={handleCheckboxChange}
          />
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
          {isChecked && !props.isChecked && (
            <IconButton title="add to Trash" onClick={addToTrashHandler}>
              <DeleteIcon />
            </IconButton>
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ReceiveEmails;
