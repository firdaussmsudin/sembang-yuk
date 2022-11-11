import React, { useState } from "react";
import {
  Button,
  Stack,
  TextField,
  styled,
  SvgIcon,
  Box,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import io from "socket.io-client";

const CssTextField = styled(TextField)({});

// const socket = io.connect("http://localhost:3001"); 
const socket = io.connect("https://sembang-yuk-backend.onrender.com/"); 

function Login() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [usernameErr, setUsernameErr] = useState(false);
  const [usernameHelperText, setUsernameHelperText] = useState("");
  const [roomErr, setRoomErr] = useState(false);
  const [roomHelperText, setRoomHelperText] = useState("");
  const navigate = useNavigate();

  const handleUsername = (event) => {
    if (event.target.value === "") {
      setUsernameErr(true);
      setUsernameHelperText("This value cannot be empty");
      setUsername("");
    } else if (event.target.value === "admin") {
      setUsernameErr(true);
      setUsernameHelperText("This value cannot be admin");
      setUsername("");
    } else {
      setUsernameErr(false);
      setUsernameHelperText("");
      setUsername(event.target.value);
    }
  };

  const handleRoom = (event) => {
    if (event.target.value === "") {
      setRoomErr(true);
      setRoomHelperText("This value cannot be empty");
      setRoom("");
    } else {
      setRoomErr(false);
      setRoomHelperText("");
      setRoom(event.target.value);
    }
  };

  const handleLogin =  () => {
     socket.emit("login", { username, room }, ({ userStatus }) => {
      if (userStatus === true){
        setUsernameErr(true);
        setUsernameHelperText("Existing username detected in the room");
      } else if (userStatus === false){
        navigate(`/chat?username=${username}&room=${room}`);
      }
      
    });
  };

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{
        backgroundColor: "#DCDCDC",
      }}
    >
      <Stack justifyContent="center" alignItems="center" gap={5}>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          gap={2}
        >
          <Typography
            sx={{
              fontFamily: "Montserrat",
              fontWeight: "800",
              fontSize: "2rem",
            }}
          >
            Sembang
            <Box
              component="span"
              sx={{
                fontFamily: "Montserrat",
                fontWeight: "600",
                fontSize: "2rem",
              }}
            >
              Yuk!
            </Box>
          </Typography>
        </Stack>
        <Stack
          justifyContent="center"
          alignItems="center"
          gap={5}
          sx={{
            backgroundColor: "white",
            borderRadius: "5px",
            width: { sm: "400px", xs: "300px" },
            boxShadow: "0px 20px 200px 10px rgba(0,0,0,0.2)",
          }}
          p={5}
        >
          <CssTextField
            error={usernameErr}
            helperText={usernameHelperText}
            required
            label="Username"
            variant="outlined"
            sx={{ width: "100%", position: "relative" }}
            onChange={(event) => handleUsername(event)}
            FormHelperTextProps={{
              style: { position: "absolute", top: "60px" },
            }}
          />
          <CssTextField
            error={roomErr}
            helperText={roomHelperText}
            required
            label="Room"
            sx={{ width: "100%" }}
            onChange={(event) => handleRoom(event)}
            FormHelperTextProps={{
              style: { position: "absolute", top: "60px" },
            }}
          />
          <Button
            sx={{
              padding: "10px 50px",
              backgroundColor: "#0096FF",
              borderRadius: "50px",
            }}
            variant="contained"
            onClick={username && room ? handleLogin : null}
          >
            JOIN ROOM
          </Button>
        </Stack>
        <Typography>Copyright 2022 firdaussmsudin</Typography>
      </Stack>
    </Stack>
  );
}

export default Login;
