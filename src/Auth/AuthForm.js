import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../Store/Auth-slice";
import { useNavigate } from "react-router-dom";
import {
  Button,
  IconButton,
  TextField,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material"; // Import the icons for the eye toggle

const LoginForm = () => {
  //   const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.auth.isLogin);
  const [showPassword, setShowPassword] = useState(false); // State to control password visibility
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const toggleForm = () => {
    // setIsLogin(!isLogin);
    dispatch(authActions.setLogin());
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    if (
      !isLogin &&
      confirmPassword.length > 0 &&
      confirmPassword !== password
    ) {
      console.log("hii");
      //   alert("Password doesn't match");
      toast.error("Password doesn't match", {
        position: "top-right",
        theme: "colored",
        autoClose: 3000,
      });
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } else {
      let url;
      if (isLogin) {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBxAWssAULFrTvfZsgyRbbaKQjgb-l5H1s";
      } else {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBxAWssAULFrTvfZsgyRbbaKQjgb-l5H1s";
      }

      try {
        const res = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          const data = await res.json();
          console.log(data);
          if (!data.registered && !isLogin) {
            console.log("User has successfully signed up");
            // dispatch(authActions.login(data));
            dispatch(authActions.setLogin());

            toast.success("Welcome to MailVerse, Please Login", {
              position: "top-right",
              theme: "colored",
              autoClose: 3000,
            });
          }

          if (data.registered) {
            dispatch(authActions.login(data));

            navigate("/home");
          }
          // authCtx.login(data.idToken);

          // history.replace("/profile");
        } else {
          const data = await res.json();

          let errorMessage = "Authentication failed!";
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
          }
          console.log(data);

          throw new Error(errorMessage);
        }
      } catch (err) {
        toast.error(err.message, {
          position: "top-right",
          theme: "colored",
          autoClose: 3000,
        });
      }
    }
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <>
      <Container
        maxWidth="xs"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Paper elevation={3} style={{ padding: "20px", width: "100%" }}>
          <Typography variant="h5" gutterBottom sx={{ textAlign: "center" }}>
            {isLogin ? "Login" : "Sign Up"}
          </Typography>
          <form onSubmit={submitHandler}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              margin="normal"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              // Add `InputProps` with the eye icon toggle
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
            {!isLogin && (
              <TextField
                label="Confirm Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            )}
            <Button type="submit" variant="contained" fullWidth color="primary">
              {isLogin ? "Login" : "Sign Up"}
            </Button>
          </form>
          <Button
            onClick={toggleForm}
            variant="outlined"
            fullWidth
            color="primary"
          >
            {isLogin ? "Switch to Sign Up" : "Switch to Login"}
          </Button>
        </Paper>
      </Container>
      <ToastContainer />
    </>
  );
};

export default LoginForm;
