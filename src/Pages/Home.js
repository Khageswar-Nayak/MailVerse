import React, { useState, useEffect, useCallback } from "react";
import Layout from "../Layout/Layout";
import classes from "./Sent.module.css";
import ReceiveEmails from "../Components/ReceiveEmails";
import { useSelector, useDispatch } from "react-redux";
import { ReceiveEmailActions } from "../Store/ReceiveEmail-slice";
import { Checkbox, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from "react-toastify";
import { TopCheckBoxActions } from "../Store/TopCheckBox-slice";

const Home = () => {
  const dispatch = useDispatch();
  const receiveEmails = useSelector(
    (state) => state.receiveEmail.receiveEmails
  );
  const isChecked = useSelector((state) => state.topCheckBox.isChecked);
  const userEmail = useSelector((state) => state.auth.email);
  const modifiedUserEmail = userEmail.replace("@", "").replace(".", "");
  console.log(`modifiedUserEmail ${modifiedUserEmail}`);
  const fetchEmailHandler = useCallback(async () => {
    try {
      const getEmails = await fetch(
        `https://mailverse-6fbb8-default-rtdb.firebaseio.com/receiveEmails/${modifiedUserEmail}.json`
      );

      const data = await getEmails.json();
      console.log(data);
      const loadedEmails = [];
      for (const key in data) {
        // console.log()
        loadedEmails.unshift({
          id: key,
          sentEmailId: data[key].sentEmailId,
          subject: data[key].subject,
          message: data[key].message,
          time: data[key].time,
          read: data[key].read,
          day: data[key].day,
          month: data[key].month,
          year: data[key].year,
        });
      }
      // console.log(loadedEmails);
      dispatch(ReceiveEmailActions.setReceiveEmails(loadedEmails));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, modifiedUserEmail]);

  useEffect(() => {
    fetchEmailHandler();

    // Set up interval to fetch emails every 2 seconds
    const intervalId = setInterval(fetchEmailHandler, 2000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [fetchEmailHandler]);

  const moveAllReceivedEmailsToTrash = async () => {
    try {
      const emailsWithoutId = receiveEmails.map((email) => {
        const { id, ...rest } = email;
        return rest;
      });
      console.log("emailsWithoutId", emailsWithoutId);
      for (const email of emailsWithoutId) {
        const updatedEmail = {
          ...email,
          sentORreceive: "Receive",
          emailId: email.sentEmailId,
        };
        const addToTrash = await fetch(
          `https://mailverse-6fbb8-default-rtdb.firebaseio.com/trashEmails/${modifiedUserEmail}.json`,
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
        `https://mailverse-6fbb8-default-rtdb.firebaseio.com/receiveEmails/${modifiedUserEmail}.json`,
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
        dispatch(ReceiveEmailActions.deleteAllReceiveEmails());
        dispatch(TopCheckBoxActions.TopCheckBoxChange());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className={classes.sentEmail}>
        <div className={classes["sentEmail-left"]}>
          {receiveEmails.length > 0 && (
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
        <h2>Received Emails</h2>
        <div className={classes["sentEmail-right"]}>
          {isChecked && (
            <IconButton
              title="Move all emails to trash"
              onClick={moveAllReceivedEmailsToTrash}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </div>
      </div>
      {/* <h2
        style={{
          textAlign: "center",
          border: "0",
          borderBottom: "2px solid #c2e7ff",
          marginTop: "25px",
          paddingBottom: "5px",
        }}
      >
        Received Emails
      </h2> */}
      {receiveEmails.length > 0 ? (
        receiveEmails.map((email) => (
          <ReceiveEmails
            key={email.id}
            id={email.id}
            sentEmailId={email.sentEmailId}
            subject={email.subject}
            message={email.message}
            time={email.time}
            read={email.read}
            day={email.day}
            month={email.month}
            year={email.year}
            isChecked={isChecked}
          />
        ))
      ) : (
        <>
          <p className={classes.emptyMessage}>No Emails.</p>
        </>
      )}
      <ToastContainer />
    </Layout>
  );
};

export default Home;
