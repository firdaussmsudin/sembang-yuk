import { Button, Stack, SvgIcon, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CircleIcon from "@mui/icons-material/Circle";
import CloseIcon from "@mui/icons-material/Close";
import io from "socket.io-client";
import Online from "./Online";
import Message from "./Message";
import InputMessage from "./InputMessage";
import OnlineMobile from "./OnlineMobile";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

let socket;

const getTime = () => {
  return `${new Date(Date.now()).getHours()}:${new Date(
    Date.now()
  ).getMinutes()}`;
};

function Chat() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [username, setUserName] = useState(params.get("username"));
  const [room, setRoom] = useState(params.get("room"));
  const [text, setText] = useState("");
  const [messagesList, setMessagesList] = useState([]);
  const [onlineUser, setOnlineUser] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    socket = io.connect("http://localhost:3001");

    const data = {
      username,
      room,
    };
    socket.emit("join_room", data)

    return () => {
      socket.emit("log_out", data);
      socket.disconnect();
      socket.off();
    };
  }, [username, room]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessagesList([...messagesList, message]);
    });
  }, [messagesList]);

  useEffect(() => {
    socket.on("online", (online_user) => {
      setOnlineUser(online_user);
    });
  }, [onlineUser]);

  const handleMessage = async () => {
    if (text === "") {
      return;
    }
    const data = {
      text,
      username,
      time: getTime(),
    };
    await socket.emit("send_message", data, room);
    setMessagesList([...messagesList, data]);
    setText("");
  };

  const toggleDrawer = (state) => {
    setOpen(state);
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
      <Button
        variant="contained"
        sx={{
          display: { xs: "block", md: "none" },
          position: "absolute",
          left: "0",
          top: "60px",
          borderTopLeftRadius: "0",
          borderBottomLeftRadius: "0",
        }}
        onClick={() => {
          toggleDrawer(true);
        }}
      >
        <SvgIcon component={PeopleAltIcon} />
      </Button>
      <OnlineMobile onlineUser={onlineUser} open={open} toggleDrawer={toggleDrawer} />
      <Stack direction="row" gap={2}>
        <Stack
          height="70vh"
          bgcolor="white"
          borderRadius={2}
          sx={{ boxShadow: "0px 20px 200px 10px rgba(0,0,0,0.2)", width:{xs:"80vw", md:"60vw"} }}
        >
          <Stack
            direction="row"
            gap={2}
            borderBottom="1px solid black"
            padding={2}
          >
            <SvgIcon component={CircleIcon} sx={{ color: "#32CD32" }} />
            <Typography>{room}</Typography>
            <Link
              to={"/"}
              style={{ marginLeft: "auto", cursor: "pointer", color: "black" }}
            >
              <SvgIcon component={CloseIcon} />
            </Link>
          </Stack>
          <Message messagesList={messagesList} username={username} />
          <InputMessage
            text={text}
            setText={setText}
            username={username}
            messagesList={messagesList}
            handleMessage={handleMessage}
          />
        </Stack>
        <Online onlineUser={onlineUser} />
      </Stack>
    </Stack>
  );
}

export default Chat;
