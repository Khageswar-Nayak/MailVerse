import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import { useSelector, useDispatch } from "react-redux";
import TrashEmails from "../Components/TrashEmails";
import { trashEmailActions } from "../Store/TrashEmail-slice";

const Trash = () => {
  const dispatch = useDispatch();
  const trashEmails = useSelector((state) => state.trashEmail.trashEmails);
  const userEmail = useSelector((state) => state.auth.email);
  const modifiedUserEmail = userEmail.replace("@", "").replace(".", "");

  const fetchTrashEmailsHandler = async () => {
    try {
      const getTrashEmails = await fetch(
        `https://mailverse-a6ae2-default-rtdb.firebaseio.com/trashEmails/${modifiedUserEmail}.json`
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
        Trash Emails
      </h2>
      {trashEmails.map((email) => (
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
        />
      ))}
    </Layout>
  );
};

export default Trash;
