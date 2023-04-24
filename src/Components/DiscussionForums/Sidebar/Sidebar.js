import * as React from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import AppBar from '@mui/material/AppBar';
import ForumIcon from '@mui/icons-material/Forum';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {  Link, useLocation } from 'react-router-dom';
import CircleIcon from '@mui/icons-material/Circle';



const drawerWidth = 280;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

function Sidebar(props) {
    const { window } = props;
    
  const location = useLocation().pathname;
  const val = {
    "100":{
      link:"/DiscussionForums/100",
      name: "General Discussions"
    },
    "732":{
      link:"/DiscussionForums/732",
      name: "Civil Engineering"
    },
    "733":{
      link:"/DiscussionForums/733",
      name: "Computer Science and Engineering"
    },
    "734":{
      link:"/DiscussionForums/734",
      name: "Electrical and Electronics Engineering"
    },
    "735":{
      link:"/DiscussionForums/735",
      name: "Electronics and Communication Engineering"
    },
    "736":{
      link:"/DiscussionForums/736",
      name: "Mechanical Engineering"
    },
    "737":{
      link:"/DiscussionForums/737",
      name: "Information Technology"
    },
  }
  // val[location]=true;
  const drawer = (
      <div>
        <DrawerHeader>
            {/* <Typography sx={{margin: '75px auto 10px auto', fontWeight: '600'}} align='center' variant="h6">
            <ForumOutlinedIcon/>Discussion Forums</Typography> */}
            <ListItemButton sx={{ margin: '75px 0 10px 0'}}>
                <ListItemIcon>
                  <ForumIcon sx={{ color: "navy", p:0, m:0}} />
                </ListItemIcon>
                <ListItemText
                primary={
                    <Typography display="block" sx={{fontSize: '24px', lineHeight: '1', fontWeight: 600, m:0, p:0}}>
                        Discussion Forums
                    </Typography>
                }
                />
            </ListItemButton>
        </DrawerHeader>
        <Divider sx={{m:0, p:0, height:'0'}}/>
        <List sx={{pt:0}}>
            {Object.keys(val).map((v)=>(
              <div key={v}>
              <ListItem sx={{padding: 2.25, pl:4}} button selected={location.endsWith(v)} component={Link} to={val[v].link}>
                {val[v].name}
              </ListItem>
              <Divider sx={{mt:0, p:0, height:'0'}} variant="middle"/>
              </div>
            ))}
        </List>
      </div>
  )

  const container = window !== undefined ? () => window().document.body : undefined;

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: "white"
        }}
      >
        <Toolbar sx={{ mr: 2, display: { sm: 'none' } }}>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' }, color:'black' }}
          >
            <MenuIcon />
            <Typography sx={{margin: '5px', fontWeight: '600'}} align='center' variant="h6">Discussion Forums</Typography>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, bgcolor: 'primary.main' }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            color: 'text.primaryt'
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

Sidebar.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
  };

export default Sidebar

