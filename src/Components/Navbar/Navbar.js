// import * as React from 'react';
import React, { useRef, useState,useEffect } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SchoolIcon from '@mui/icons-material/School';
import IconButton from '@mui/material/IconButton';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { styled } from "@mui/material/styles";
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import "./Navbar.css";

export default function ButtonAppBar(props) {
  const [value, setValue] = React.useState('1');

  const [login, setLogin] = useState(false);

  const location = useLocation().pathname;
  const history = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const val = {
  //   "/":0,
  //   "/DiscussionForums/100": 1,
  //   "/DiscussionForums/732": 1,
  //   "/DiscussionForums/733": 1,
  //   "/DiscussionForums/734": 1,
  //   "/DiscussionForums/735": 1,
  //   "/DiscussionForums/736": 1,
  //   "/DiscussionForums/737": 1,
  //   "/Announcements/All": 2,
  //   "/Opportunities": 3
  // }
  const isLoggedIn = () => {
    let data = localStorage.getItem("userType");
    console.log(data);
    console.log("asdfasdf");
    if (data != null) return true;
    else return false;
  };
  const doLogout = (next) => {
    localStorage.removeItem("userType");
    history("/Home");
  };



  let index;
  if (location == "/")
    index = 0
  else if (location.startsWith("/DiscussionForums"))
    index = 1
  else if (location.startsWith("/Announcements"))
    index = 2
  else if (location.startsWith("/Opportunities"))
    index = 3
  // console.log(val[location])


  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'none', md: 'block' } }}>
      <AppBar position="fixed" sx={{ zIndex: 1400, bgcolor: "black" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 0.5 }}
          >
            <SchoolIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
            Community Platform
          </Typography>
          <Tabs
            value={index}
            onChange={handleChange}
            aria-label="TABS"
            TabIndicatorProps={{
              sx: {
                fontWeight: "600",
                textTransform: "none",
                backgroundColor: "#d32f2f",
                height: 3
              }
            }
            }
          >
            <Tab sx={{ fontWeight: "600", textTransform: "none", mx: 0.35 }} className='link' label="Home" id="simple-tab-0" component={Link} to="/" />
            <Tab sx={{ fontWeight: "600", textTransform: "none", mx: 0.35 }} className='link' label="Discussion Forums" id="simple-tab-1" component={Link} to="/DiscussionForums/100" />
            <Tab sx={{ fontWeight: "600", textTransform: "none", mx: 0.35 }} className='link' label="Announcements" id="simple-tab-2" component={Link} to="/Announcements/All" />
            <Tab sx={{ fontWeight: "600", textTransform: "none", mx: 0.35 }} className='link' label="Opportunities" id="simple-tab-3" component={Link} to="/Opportunities" />
          </Tabs>
          {/* <Button sx={{m:1}} variant="contained" color="error" component={Link} to="/Signin" >Login</Button> */}
          {isLoggedIn() ?  (
            <Button
              sx={{ m: 1 }}
              variant="contained"
              color="error"
              onClick={() => doLogout(() => setLogin(false))}
            >
              Logout
            </Button>
          ):
          (
            <Button
              sx={{ m: 1 }}
              variant="contained"
              color="error"
              component={Link}
              to="/Signin"
            >
              Login
            </Button>
          )
          
          }

        </Toolbar>
      </AppBar>
    </Box>
  );
}
