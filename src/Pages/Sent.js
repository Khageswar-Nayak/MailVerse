import React, { useCallback, useEffect } from "react";
import Layout from "../Layout/Layout";
import SentEmails from "../Components/SentEmails";
import { useSelector, useDispatch } from "react-redux";
import { sentEmailActions } from "../Store/sentEmail-slice";

const Sent = () => {
  const dispatch = useDispatch();
  const sentEmails = useSelector((state) => state.sentEmail.sentEmails);
  const userEmail = useSelector((state) => state.auth.email);
  const modifiedUserEmail = userEmail.replace("@", "").replace(".", "");

  const fetchEmailHandler = async () => {
    try {
      const getEmails = await fetch(
        `https://mailverse-a6ae2-default-rtdb.firebaseio.com/sentEmails/${modifiedUserEmail}.json`
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
  // console.log(emails);
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
        Sent Emails
      </h2>
      {sentEmails.map((email) => (
        <SentEmails
          key={email.id}
          receiveEmailId={email.receiveEmailId}
          subject={email.subject}
          message={email.message}
          time={email.time}
          day={email.day}
          month={email.month}
          year={email.year}
        />
      ))}
    </Layout>
  );
};

export default Sent;
