import React, { useState } from "react";
import classes from "./SentEmails.module.css";
import { Checkbox, IconButton } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sentEmailActions } from "../Store/sentEmail-slice";
import { trashEmailActions } from "../Store/TrashEmail-slice";
import { ToastContainer, toast } from "react-toastify";

const SentEmails = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.auth.email);
  const sentEmails = useSelector((state) => state.sentEmail.sentEmails);
  const modifiedUserEmail = userEmail.replace("@", "").replace(".", "");
  const [isChecked, setIsChecked] = useState(false);

  const emailDetails = {
    sentORreceive: "To",
    id: props.id,
    emailId: props.receiveEmailId,
    subject: props.subject,
    message: props.message,
    time: props.time,
    day: props.day,
    month: props.month,
    year: props.year,
  };

  const openSentEmails = () => {
    navigate("/sentemaildetails");
    dispatch(sentEmailActions.setSelectedEmail(emailDetails));
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const addToTrashHandler = async () => {
    try {
      const deleteEmailFromSentEmails = await fetch(
        `https://mail-verse-default-rtdb.firebaseio.com/sentEmails/${modifiedUserEmail}/${props.id}.json`,
        {
          method: "DELETE",
        }
      );
      if (deleteEmailFromSentEmails.ok) {
        const updatedSentEmails = sentEmails.filter(
          (email) => email.id !== emailDetails.id
        );
        dispatch(sentEmailActions.removeSentEmail(updatedSentEmails));
      }

      const trashEmail = await fetch(
        `https://mail-verse-default-rtdb.firebaseio.com/trashEmails/${modifiedUserEmail}.json`,
        {
          method: "POST",
          body: JSON.stringify(emailDetails),
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
        const updatedTrashEmail = { ...emailDetails, id: data.name };
        dispatch(trashEmailActions.addToTrashEmails(updatedTrashEmail));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={classes.sentEmails}>
      <div className={classes["sentEmails-left"]}>
        <Checkbox
          checked={props.isChecked ? true : isChecked}
          onChange={handleCheckboxChange}
        />
        <h4 onClick={openSentEmails}>To : {props.receiveEmailId}</h4>
      </div>
      <div className={classes["sentEmails-middle"]} onClick={openSentEmails}>
        <StarBorderIcon />

        <div className={classes["sentEmails-middle-msg"]}>
          <p>
            <b>{props.subject}</b> {props.message}
          </p>
        </div>
      </div>
      <div className={classes["sentEmails-right"]}>
        <p>
          {props.day}/{props.month}/{props.year} {props.time}
        </p>
        {isChecked && !props.isChecked && (
          <IconButton title="add to Trash" onClick={addToTrashHandler}>
            <DeleteIcon />
          </IconButton>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default SentEmails;
