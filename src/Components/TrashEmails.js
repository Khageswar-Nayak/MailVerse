import React, { useState } from "react";
import classes from "./SentEmails.module.css";
import { Checkbox, IconButton } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { trashEmailActions } from "../Store/TrashEmail-slice";

const TrashEmails = (props) => {
  const [isChecked, setIsChecked] = useState(false);
  const userEmail = useSelector((state) => state.auth.email);
  const dispatch = useDispatch();
  const trashEmails = useSelector((state) => state.trashEmail.trashEmails);
  const modifiedUserEmail = userEmail.replace("@", "").replace(".", "");

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const emailDeleteHandler = async () => {
    try {
      const deleteTrashEmail = await fetch(
        `https://mail-verse-default-rtdb.firebaseio.com/trashEmails/${modifiedUserEmail}/${props.id}.json`,
        {
          method: "DELETE",
        }
      );
      if (deleteTrashEmail.ok) {
        toast.success("Email Deleted Successfully", {
          position: "top-right",
          theme: "colored",
          autoClose: 3000,
        });
        const updatedTrashEmails = trashEmails.filter(
          (email) => email.id !== props.id
        );
        dispatch(trashEmailActions.setTrashEmails(updatedTrashEmails));
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
        <h4>
          {props.sentORreceive} : {props.emailId}
        </h4>
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
        <p>
          {props.day}/{props.month}/{props.year} {props.time}
        </p>
        {isChecked && !props.isChecked && (
          <IconButton title="delete Email" onClick={emailDeleteHandler}>
            <DeleteIcon />
          </IconButton>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default TrashEmails;
