import {
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SvgIcon,
} from "@mui/material";
import React from "react";
import { Box } from "@mui/system";
import CircleIcon from "@mui/icons-material/Circle";

const OnlineMobile = ({ onlineUser, open, toggleDrawer }) => {
  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={() => {
        toggleDrawer(false);
      }}
    >
      <List sx={{ width: "250px" }}>
        <ListItem>
          <ListItemText>Online</ListItemText>
        </ListItem>
        {onlineUser.map((user) => (
          <ListItem>
            <ListItemIcon>
              <CircleIcon sx={{color:"#32CD32"}} />
            </ListItemIcon>
            <ListItemText>{user.username}</ListItemText>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default OnlineMobile;
