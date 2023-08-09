import React, { useCallback, useEffect } from "react";
import Layout from "../Layout/Layout";
import ReceiveEmails from "../Components/ReceiveEmails";
import { useSelector, useDispatch } from "react-redux";
import { ReceiveMailActions } from "../Store/ReceiveMail-slice";

const Home = () => {
  const dispatch = useDispatch();
  const ReceiveMails = useSelector((state) => state.receiveMail.ReceiveMails);
  const userEmail = useSelector((state) => state.auth.email);
  const modifiedUserEmail = userEmail.replace("@", "").replace(".", "");

  const fetchEmailHandler = async () => {
    try {
      const getEmails = await fetch(
        `https://mailverse-a6ae2-default-rtdb.firebaseio.com/receiveEmails/${modifiedUserEmail}.json`
      );

      const data = await getEmails.json();
      console.log(data);
      const loadedEmails = [];
      for (const key in data) {
        console.log("inside data", data[key]);
        loadedEmails.unshift({
          id: key,
          sentEmailId: data[key].sentEmailId,
          subject: data[key].subject,
          message: data[key].message,
          time: data[key].time,
          read: data[key].read,
        });
      }
      // console.log(loadedEmails);
      dispatch(ReceiveMailActions.setReceiveMails(loadedEmails));
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
        Received Emails
      </h2>
      {ReceiveMails.map((mail) => (
        <ReceiveEmails
          key={mail.id}
          sentEmailId={mail.sentEmailId}
          subject={mail.subject}
          message={mail.message}
          time={mail.time}
          read={mail.read}
        />
      ))}
    </Layout>
  );
};

export default Home;
