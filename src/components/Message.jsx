import { Box, Stack, styled } from '@mui/material'
import React from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import { css } from "glamor";

const SenderBox = styled(Box)({
    backgroundColor: "#0096FF",
    color: "white",
    padding: "10px",
    borderRadius: "5px",
    width: "fit-content",
    maxWidth: "200px",
    wordBreak: "break-all",
  });
  
  const RecipientBox = styled(Box)({
    backgroundColor: "#696969",
    color: "white",
    padding: "10px",
    borderRadius: "5px",
    width: "fit-content",
    maxWidth: "200px",
    wordBreak: "break-all",
  });

  const Scroll_CSS = css({
    height: "100%",
  });
  

const Message = ({messagesList,username}) => {
  return (
    <Stack flexGrow={1} padding={1} height={300}>
            <ScrollToBottom className={Scroll_CSS}>
              <Stack paddingRight={2}>
                {messagesList.map((message, index, array) => (
                  <Stack
                    sx={{ margin: "1px 0" }}
                    alignSelf={
                      message.username === username
                        ? "flex-end"
                        : message.username === "admin"
                        ? "center"
                        : "flex-start"
                    }
                  >
                    {message.username === username ? (
                      <SenderBox>{message.text}</SenderBox>
                    ) : message.username === "admin" ? (
                      <Box sx={{margin:"3px"}}>{message.text}</Box>
                    ) : (
                      <RecipientBox>{message.text}</RecipientBox>
                    )}
                    {message.username !== username &&
                    message.username !== "admin"
                      ? message.username !==
                          (array[index + 1]
                            ? array[index + 1]["username"]
                            : message.username) && (
                          <Box sx={{ margin: "0 0 10px 0" }}>
                            {message.username}
                          </Box>
                        )
                      : null}
                    {index === array.length - 1 &&
                    message.username !== username &&
                    message.username !== "admin" ? (
                      <Box sx={{ margin: "0 0 10px 0" }}>
                        {message.username}
                      </Box>
                    ) : null}
                  </Stack>
                ))}
              </Stack>
            </ScrollToBottom>
          </Stack>
  )
}

export default Message