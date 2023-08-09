import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Layout from "../Layout/Layout";
import classes from "./Compose.module.css";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { sentEmailActions } from "../Store/sentEmail-slice";

const Compose = () => {
  const userEmail = useSelector((state) => state.auth.email);

  const sentEmailId = userEmail.replace("@", "").replace(".", "");
  // console.log(userEmail);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleBodyChange = (value) => {
    setBody(value);
  };

  const sanitizeHTML = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const handleSubmit = async () => {
    if (email === "") {
      toast.warning("Email is required", {
        position: "top-right",
        theme: "colored",
        autoClose: 3000,
      });
    } else if (subject === "") {
      toast.warning("Subject is required", {
        position: "top-right",
        theme: "colored",
        autoClose: 3000,
      });
    }

    const sanitizedBody = sanitizeHTML(body);

    const receiveEmailId = email.replace("@", "").replace(".", "");

    const obj = {
      sentEmailId: userEmail,
      receiveEmailId: email,
      subject: subject,
      message: sanitizedBody,
      time: new Date().toLocaleTimeString(),
      read: false,
    };
    // console.log(obj);
    try {
      const sentMail = await fetch(
        `https://mailverse-a6ae2-default-rtdb.firebaseio.com/sentEmails/${sentEmailId}.json`,
        {
          method: "POST",
          body: JSON.stringify(obj),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (sentMail.ok) {
        const data = await sentMail.json();
        const updatedEmails = { ...obj, id: data.name };
        // console.log(updatEexpense);
        dispatch(sentEmailActions.addSentEmails(updatedEmails));
        toast.success("Mail sent successfully", {
          position: "top-right",
          theme: "colored",
          autoClose: 3000,
        });
      }

      const receiveMail = await fetch(
        `https://mailverse-a6ae2-default-rtdb.firebaseio.com/receiveEmails/${receiveEmailId}.json`,
        {
          method: "POST",
          body: JSON.stringify(obj),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
    setEmail("");
    setSubject("");
    setBody("");
  };

  return (
    <Layout>
      <div className={classes["text-editor-container"]}>
        <label>To:</label>
        <input
          className={classes["text-editor-input"]}
          type="email"
          value={email}
          onChange={handleEmailChange}
        />

        <label>Subject:</label>
        <input
          className={classes["text-editor-input"]}
          type="text"
          value={subject}
          onChange={handleSubjectChange}
        />

        <ReactQuill
          className={classes["react-quill"]}
          value={body}
          onChange={handleBodyChange}
          placeholder="message"
        />

        <button
          className={classes["text-editor-button"]}
          onClick={handleSubmit}
        >
          Send
        </button>
      </div>
      <ToastContainer />
    </Layout>
  );
};

export default Compose;
