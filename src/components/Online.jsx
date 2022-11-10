import { Box, Stack, SvgIcon, Typography } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CircleIcon from "@mui/icons-material/Circle";

function Online({ onlineUser }) {
  

  return (
    <Stack
      sx={{ backgroundColor: "white", width: "15vw", borderRadius: "10px", display:{xs:"none", md:"block"}}}
    >
      <Stack
        direction="row"
        height={60}
        alignItems="center"
        gap={2}
        p={2}
        sx={{ borderBottom: "1px solid black" }}
      >
        <SvgIcon component={PeopleAltIcon} />
        <Typography>Online</Typography>
      </Stack>
      <Stack>
        {onlineUser.map((user) => (
          <Stack direction="row" gap={2} margin={1}>
            <SvgIcon component={CircleIcon} sx={{ color: "#32CD32" }} />
            <Typography>{user.username}</Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}

export default Online;
