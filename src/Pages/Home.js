import React, { useState, useEffect, useCallback } from "react";
import Layout from "../Layout/Layout";
import ReceiveEmails from "../Components/ReceiveEmails";
import { useSelector, useDispatch } from "react-redux";
import { ReceiveEmailActions } from "../Store/ReceiveEmail-slice";

const Home = () => {
  const dispatch = useDispatch();
  const receiveEmails = useSelector(
    (state) => state.receiveEmail.receiveEmails
  );
  const userEmail = useSelector((state) => state.auth.email);
  const modifiedUserEmail = userEmail.replace("@", "").replace(".", "");

  const fetchEmailHandler = useCallback(async () => {
    try {
      const getEmails = await fetch(
        `https://mailverse-a6ae2-default-rtdb.firebaseio.com/receiveEmails/${modifiedUserEmail}.json`
      );

      const data = await getEmails.json();
      const loadedEmails = [];
      for (const key in data) {
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

  return (
    <Layout>
      <h2
        style={{
          textAlign: "center",
          border: "0",
          borderBottom: "2px solid #c2e7ff",
          marginTop: "25px",
          paddingBottom: "5px",
        }}
      >
        Received Emails
      </h2>
      {receiveEmails.map((email) => (
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
        />
      ))}
    </Layout>
  );
};

export default Home;
