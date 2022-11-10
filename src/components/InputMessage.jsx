import { Button, Input, Stack, SvgIcon } from "@mui/material";
import React from "react";
import SendIcon from "@mui/icons-material/Send";

const InputMessage = ({
  text,
  setText,
  username,
  messagesList,
  handleMessage,
}) => {
  return (
    <Stack
      direction="row"
      borderTop="1px solid black"
      padding="15px 0 15px 15px"
    >
      <Input
        placeholder="Type your message here"
        sx={{ flexGrow: "1" }}
        disableUnderline
        autoFocus
        value={text}
        onChange={(event) => {
          setText(event.target.value);
        }}
        onKeyDown={(event) => (event.key === "Enter" ? handleMessage() : null)}
      />
      <Button onClick={handleMessage} sx={{marginLeft:"auto", padding:"0px"}}>
        <SvgIcon component={SendIcon} />
      </Button>
    </Stack>
  );
};

export default InputMessage;
