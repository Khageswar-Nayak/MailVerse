import React from "react";
import classes from "./EmailDetails.module.css";
import Layout from "../Layout/Layout";
import { IconButton, Avatar } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import PrintIcon from "@mui/icons-material/Print";
import LaunchIcon from "@mui/icons-material/Launch";
import StarIcon from "@mui/icons-material/Star";
import ReplyIcon from "@mui/icons-material/Reply";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ReceiveEmailDetails = () => {
  const selectedReceiveEmail = useSelector(
    (state) => state.receiveEmail.selectedReceiveEmail
  );
  return (
    <Layout>
      <div className={classes.emailDetails}>
        <Link to="/home">
          <IconButton>
            <KeyboardBackspaceIcon />
          </IconButton>
        </Link>
        <p>Back</p>
        <h2 className={classes.heading}>Receive Email Details</h2>
      </div>
      <div className={classes["emailDetails-message"]}>
        <div className={classes["emailDetails-header"]}>
          <div className={classes["emailDetails-headerLeft"]}>
            <h4>{selectedReceiveEmail.subject}</h4>
            <IconButton>
              <LabelImportantIcon />
            </IconButton>
          </div>
          <div className={classes["emailDetails-headerRight"]}>
            <IconButton>
              <PrintIcon />
            </IconButton>
            <IconButton>
              <LaunchIcon />
            </IconButton>
          </div>
        </div>
        <div className={classes["emailDetails-middleHeader"]}>
          <div className={classes["emailDetails-middleHeaderLeft"]}>
            <IconButton>
              <Avatar />
            </IconButton>
            <h4>{selectedReceiveEmail.subject}</h4>
            <p>{selectedReceiveEmail.sentEmailId}</p>
          </div>
          <div className={classes["emailDetails-middleHeaderRight"]}>
            <p>
              {selectedReceiveEmail.day}/{selectedReceiveEmail.month}/
              {selectedReceiveEmail.year} {selectedReceiveEmail.time}
            </p>
            <IconButton>
              <StarIcon />
            </IconButton>
            <IconButton>
              <ReplyIcon />
            </IconButton>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </div>
        </div>
        <div className={classes["emailDetails-body"]}>
          <p>{selectedReceiveEmail.message}</p>
        </div>
      </div>
    </Layout>
  );
};

export default ReceiveEmailDetails;
