import React, { useCallback, useEffect } from "react";
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

  const fetchEmailHandler = async () => {
    try {
      const getEmails = await fetch(
        `https://mailverse-a6ae2-default-rtdb.firebaseio.com/receiveEmails/${modifiedUserEmail}.json`
      );

      const data = await getEmails.json();
      // console.log(data);
      const loadedEmails = [];
      for (const key in data) {
        // console.log("inside data", data[key]);
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
