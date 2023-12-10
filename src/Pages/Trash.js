import React, { useEffect, useState } from "react";
import classes from "./Trash.module.css";
import Layout from "../Layout/Layout";
import { useSelector, useDispatch } from "react-redux";
import TrashEmails from "../Components/TrashEmails";
import { trashEmailActions } from "../Store/TrashEmail-slice";
import { Checkbox, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { sidebarButtonActions } from "../Store/Sidebar-slice";
import { TopCheckBoxActions } from "../Store/TopCheckBox-slice";

const Trash = () => {
  const dispatch = useDispatch();
  const trashEmails = useSelector((state) => state.trashEmail.trashEmails);
  const userEmail = useSelector((state) => state.auth.email);
  const isChecked = useSelector((state) => state.topCheckBox.isChecked);
  const modifiedUserEmail = userEmail.replace("@", "").replace(".", "");

  const fetchTrashEmailsHandler = async () => {
    try {
      const getTrashEmails = await fetch(
        `https://mail-verse-69a76-default-rtdb.firebaseio.com/trashEmails/${modifiedUserEmail}.json`
      );

      const data = await getTrashEmails.json();
      //   console.log(data);
      const loadedTrashEmails = [];
      for (const key in data) {
        console.log("inside data", data[key]);
        loadedTrashEmails.unshift({
          id: key,
          sentORreceive: data[key].sentORreceive,
          emailId: data[key].emailId,
          subject: data[key].subject,
          message: data[key].message,
          time: data[key].time,
          day: data[key].day,
          month: data[key].month,
          year: data[key].year,
        });
      }

      dispatch(trashEmailActions.setTrashEmails(loadedTrashEmails));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTrashEmailsHandler();
  }, []);

  const trashEmailDeleteHandler = async () => {
    const deleteTrashEmails = await fetch(
      "https://mail-verse-69a76-default-rtdb.firebaseio.com/trashEmails.json",
      {
        method: "DELETE",
      }
    );
    if (deleteTrashEmails.ok) {
      toast.success("Successfully Deleted", {
        position: "top-right",
        theme: "colored",
        autoClose: 3000,
      });
      dispatch(trashEmailActions.deleteTrashEmail());
      dispatch(TopCheckBoxActions.TopCheckBoxChange());
    }
  };

  return (
    <Layout>
      <div className={classes.trashEmail}>
        <div className={classes["trashEmail-left"]}>
          {trashEmails.length > 0 && (
            <>
              <Checkbox
                checked={isChecked}
                onChange={() =>
                  dispatch(TopCheckBoxActions.TopCheckBoxChange())
                }
              />
              <p>Select All</p>
            </>
          )}
        </div>
        <h2>Trash Emails</h2>
        <div className={classes["trashEmail-right"]}>
          {isChecked && (
            <IconButton
              title="Delete All Emails"
              onClick={trashEmailDeleteHandler}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </div>
      </div>
      {trashEmails.length === 0 ? (
        <>
          <p className={classes.emptyMessage}>No emails in the trash.</p>
          <p className={classes.noMails}>
            Add emails from{" "}
            <Link
              to="/home"
              onClick={() =>
                dispatch(sidebarButtonActions.setActiveButton("inbox"))
              }
            >
              Inbox
            </Link>{" "}
            /{" "}
            <Link
              to="/sent"
              onClick={() =>
                dispatch(sidebarButtonActions.setActiveButton("sent"))
              }
            >
              Sent.
            </Link>
          </p>
        </>
      ) : (
        trashEmails.map((email) => (
          <TrashEmails
            key={email.id}
            id={email.id}
            sentORreceive={email.sentORreceive}
            emailId={email.emailId}
            subject={email.subject}
            message={email.message}
            time={email.time}
            day={email.day}
            month={email.month}
            year={email.year}
            isChecked={isChecked}
          />
        ))
      )}
      <ToastContainer />
    </Layout>
  );
};

export default Trash;
