import React, { useCallback, useEffect } from "react";
import Layout from "../Layout/Layout";
import SentEmails from "../Components/SentEmails";
import { useSelector, useDispatch } from "react-redux";
import { mailActions } from "../Store/MailData-slice";

const Sent = () => {
  const dispatch = useDispatch();
  const emails = useSelector((state) => state.mail.emails);
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
        });
      }
      console.log(loadedEmails);
      dispatch(mailActions.setMails(loadedEmails));
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
        Sent messages
      </h2>
      {emails.map((mail) => (
        <SentEmails
          key={mail.id}
          receiveEmailId={mail.receiveEmailId}
          subject={mail.subject}
          message={mail.message}
          time={mail.time}
        />
      ))}
    </Layout>
  );
};

export default Sent;
