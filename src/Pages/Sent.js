import React, { useEffect } from "react";
import classes from "./Sent.module.css";
import Layout from "../Layout/Layout";
import SentEmails from "../Components/SentEmails";
import { useSelector, useDispatch } from "react-redux";
import { sentEmailActions } from "../Store/sentEmail-slice";
import { TopCheckBoxActions } from "../Store/TopCheckBox-slice";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Checkbox } from "@mui/material";
import { Link } from "react-router-dom";
import { sidebarButtonActions } from "../Store/Sidebar-slice";
import { ToastContainer, toast } from "react-toastify";

const Sent = () => {
  const dispatch = useDispatch();
  const sentEmails = useSelector((state) => state.sentEmail.sentEmails);
  const userEmail = useSelector((state) => state.auth.email);
  const isChecked = useSelector((state) => state.topCheckBox.isChecked);
  const modifiedUserEmail = userEmail.replace("@", "").replace(".", "");

  const fetchEmailHandler = async () => {
    try {
      const getEmails = await fetch(
        `https://mail-verse-default-rtdb.firebaseio.com/sentEmails/${modifiedUserEmail}.json`
      );

      const data = await getEmails.json();
      console.log(data);
      const loadedEmails = [];
      for (const key in data) {
        console.log("inside data", data[key]);
        loadedEmails.unshift({
          id: key,
          receiveEmailId: data[key].receiveEmailId,
          subject: data[key].subject,
          message: data[key].message,
          time: data[key].time,
          day: data[key].day,
          month: data[key].month,
          year: data[key].year,
        });
      }
      console.log(loadedEmails);
      dispatch(sentEmailActions.setSentEmails(loadedEmails));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEmailHandler();
  }, []);

  const moveAllEmailsToTrash = async () => {
    try {
      const emailsWithoutId = sentEmails.map((email) => {
        const { id, ...rest } = email;
        return rest;
      });
      console.log(emailsWithoutId);
      for (const email of emailsWithoutId) {
        const updatedEmail = {
          ...email,
          sentORreceive: "Sent",
          emailId: email.receiveEmailId,
        };
        const addToTrash = await fetch(
          `https://mail-verse-default-rtdb.firebaseio.com/trashEmails/${modifiedUserEmail}.json`,
          {
            method: "POST",
            body: JSON.stringify(updatedEmail),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }

      const deleteAllSentEmails = await fetch(
        `https://mail-verse-default-rtdb.firebaseio.com/sentEmails/${modifiedUserEmail}.json`,
        {
          method: "DELETE",
        }
      );
      if (deleteAllSentEmails.ok) {
        toast.success("Successfully Added to Trash", {
          position: "top-right",
          theme: "colored",
          autoClose: 3000,
        });
        dispatch(sentEmailActions.deleteAllSentEmails());
        dispatch(TopCheckBoxActions.TopCheckBoxChange());
      }
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(emails);
  return (
    <Layout>
      <div className={classes.sentEmail}>
        <div className={classes["sentEmail-left"]}>
          {sentEmails.length > 0 && (
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
        <h2>Emails Sent</h2>
        <div className={classes["sentEmail-right"]}>
          {isChecked && (
            <IconButton
              title="Move all emails to trash"
              onClick={moveAllEmailsToTrash}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </div>
      </div>
      {sentEmails.length > 0 ? (
        sentEmails.map((email) => (
          <SentEmails
            key={email.id}
            id={email.id}
            receiveEmailId={email.receiveEmailId}
            subject={email.subject}
            message={email.message}
            time={email.time}
            day={email.day}
            month={email.month}
            year={email.year}
            isChecked={isChecked}
          />
        ))
      ) : (
        <>
          <p className={classes.emptyMessage}>
            You haven't sent any email to anyone.
          </p>
          <p className={classes.noMails}>
            <Link
              to="/compose"
              onClick={() =>
                dispatch(sidebarButtonActions.setActiveButton("none"))
              }
            >
              Compose an email.
            </Link>
          </p>
        </>
      )}
      <ToastContainer />
    </Layout>
  );
};

export default Sent;
