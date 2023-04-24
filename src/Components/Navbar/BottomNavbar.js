import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Paper from '@mui/material/Paper';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import ReadMoreOutlinedIcon from '@mui/icons-material/ReadMoreOutlined';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {  Link, useLocation } from 'react-router-dom';
import { styled } from "@mui/material/styles";

export default function FixedBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const [DrawerState, setDrawerState] = React.useState(false);
  const location = useLocation().pathname;
  const ref = React.useRef(null);

  const StyledBottomNavigationAction = styled((props) => <BottomNavigationAction {...props} />)(
    ({ theme }) => ({
      "&.Mui-selected": {
        color: "#d32f2f"
      },
      "&.Mui-focusVisible": {
        backgroundColor: "rgba(100, 95, 228, 0.32)"
      }
    })
  );

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setDrawerState(open);
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem  component={Link} to="/Opportunities">
          <ListItemIcon>
            <WorkOutlineOutlinedIcon/>
          </ListItemIcon>
          <ListItemText primary="Opportunities" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <LogoutIcon/>
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
      <Divider />
    </Box>
  );

  const val = {
    "/": 0,
    "/DiscussionForums/General": 1,
    "/Announcements": 2
  }

  return (
    <Box sx={{ pb: 7, display: { xs: 'block', sm: 'block', md: 'none' }, bgcolor: "black" }} ref={ref} >
      <CssBaseline />
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1400 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={val[location]}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          sx={{bgcolor: "black"}}
        >
          <StyledBottomNavigationAction sx={{ color: "white" }} label="Home" icon={<ReadMoreOutlinedIcon />} component={Link} to="/" />
          <StyledBottomNavigationAction sx={{ color: "white" }} label="Forums" icon={<ForumOutlinedIcon/>} component={Link} to="/DiscussionForums/General"/>
          <StyledBottomNavigationAction sx={{ color: "white" }} label="Announcements" icon={<CampaignOutlinedIcon />} component={Link} to="/Announcements" />
          {/* <StyledBottomNavigationAction sx={{ color: "white" }} label="Opportunities" icon={<WorkOutlineOutlinedIcon />} component={Link} to="/Opportunities" /> */}
          <StyledBottomNavigationAction sx={{ color: "white" }} label="More" icon={<ReadMoreOutlinedIcon />} onClick={toggleDrawer(true)} />
          <SwipeableDrawer
            anchor='right'
            open={DrawerState}
            onClose={toggleDrawer( false)}
            onOpen={toggleDrawer( true)}
          >
            {list('right')}
          </SwipeableDrawer>
        </BottomNavigation>
      </Paper>
    </Box>
  );
}