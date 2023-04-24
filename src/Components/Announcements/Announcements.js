import React, {useState, useEffect} from 'react'
import Sidebar from "./Sidebar";
import PropTypes from 'prop-types';
import CreateCard from "../Card/CreateCard";
import Card from "../Card/Card";
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import {useParams} from 'react-router-dom';
import PostPopup from './PostPopup';
import NotesPopup from './NotesPopup';
import LinearProgress from '@mui/material/LinearProgress';
import "./Announcements.css";
import { makeStyles} from '@mui/styles';
import image from "../../Images/Time Table.png";
import image2 from "../../Images/NAAC A+.jpeg";
import {api} from "../../api";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div className="tabpanel">
      {value === index && (
        <div className='content'>
          {children}
        </div>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Announcements() {
  
  const [openPostPopup, setOpenPostPopup] = useState(false);
  const [openFormsPopup, setOpenFormsPopup] = useState(false);
  const [openNotesPopup, setOpenNotesPopup] = useState(false);
  const [postsLoading, setPostsLoading] = useState(false);
  const [formsLoading, setFormsLoading] = useState(false);
  const [notesLoading, setNotesLoading] = useState(false);
  const [value, setValue] = React.useState(0);
  const [posts, setPosts] = useState([]);
  const [forms, setForms] = useState([]);
  const [notes, setNotes] = useState([]);
  let { classId } = useParams();
  // console.log(classId);
  const keys = {
    "All": "All",
    "18":"CSE-A 2018-2022",
    "733":"CSE-A 2018-2022",
    "734":"Electrical and Electronics Engineering",
    "735":"Electronics and Communication Engineering",
    "736":"Mechanical Engineering",
    "737":"Information Technology"
  }
  const useStyles = makeStyles({
    tabs: {
  
      "& .MuiTabs-indicator": {
        backgroundColor: "#394867",
        height: 3,
      },
      "& .MuiTab-root":{
        fontWeight:'500',
        color:"gray"
      },
      "& .MuiTab-root.Mui-selected": {
        fontWeight:'600',
        color: '#14274E'
      },
      
    }
  })
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function getPosts(){
    setPostsLoading(true);
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      let status = 0;
      await fetch(api+"announcements/view_all/posts/"+classId, requestOptions)
        .then(response => {status = response.status; return response.json()})
        .then(res => {
            console.log(res)
            if(status==200){
              setPosts(res);
            }
            else{
                alert("Could not fetch data. Please try again later.")
            }
            setPostsLoading(false);
        })
        .catch(error => console.log('error', error));
  }

  
  async function getNotes(){
    setNotesLoading(true);
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      let status = 0;
      await fetch(api+"announcements/view_all/notes/"+classId, requestOptions)
        .then(response => {status = response.status; return response.json()})
        .then(res => {
            console.log(res)
            if(status==200){
              setNotes(res)
            }
            else{
              alert("Could not fetch data. Please try again later.")
            }
            setNotesLoading(false);
        })
        .catch(error => console.log('error', error));
  }

  async function getForms(){
    setFormsLoading(true);
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      await fetch(api+"view_all/forms/"+classId, requestOptions)
        .then(response => response.json())
        .then(res => {
            console.log(res)
            if(res.status==200){
              setForms(res.result)
            }
            else{
                alert("Could not fetch data. Please try again later.")
            }
            setFormsLoading(false);
        })
        .catch(error => console.log('error', error));
  }


  let postsArr = {
    post1: {
      "author": "Sollicitudin",
      "timestamp": "Friday, 28th January 2022",
      "title": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis.",
      "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin libero nunc consequat interdum varius. Mi eget mauris pharetra et ultrices.",
      "link": "https://matrusri.edu.in/",
      "image": image2
    },
    post2:{
      "author": "Viverra",
      "timestamp": "Saturday, 29th January 2022",
      "title": "Amet cursus sit amet dictum sit amet justo donec enim",
      "body": "Fermentum iaculis eu non diam phasellus vestibulum. Penatibus et magnis dis parturient montes. Aenean pharetra magna ac placerat vestibulum lectus mauris.",
      "link": "https://matrusri.edu.in/",
      "image": image
    },
    post3:{
      "author": "Neque",
      "timestamp": "Saturday, 29th January 2022",
      "title": "Facilisis magna etiam tempor orci eu lobortis elementum nibh tellus",
      "body": "Nullam ac tortor vitae purus faucibus ornare suspendisse. Dui id ornare arcu odio. Egestas diam in arcu cursus euismod quis. Elementum nibh tellus molestie nunc non blandit massa enim nec. Velit dignissim sodales ut eu sem integer. Bibendum arcu vitae elementum curabitur vitae. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "link": "https://matrusri.edu.in/",
      "image": image2
    },      
    post4:{
      "author": "Volutpat",
      "timestamp": "Sunday, 30th January 2022",
      "title": "Orci nulla pellentesque dignissim enim sit amet venenatis urna cursus eget nunc scelerisque viverra mauris in aliquam sem fringilla ut morbi tincidunt augue interdum velit euismod in pellentesque massa placerat duis ultricies lacus",
      "body": "Adipiscing commodo elit at imperdiet dui accumsan sit amet nulla. Pharetra magna ac placerat vestibulum lectus mauris ultrices eros. Vitae semper quis lectus nulla at volutpat diam ut. Sit amet nulla facilisi morbi tempus. Eget gravida cum sociis natoque penatibus et magnis dis. Mauris in aliquam sem fringilla ut morbi. Diam quis enim lobortis scelerisque fermentum dui faucibus in ornare.",
      "link": "https://matrusri.edu.in/",
      "image": image
    }
  }
  useEffect(() => {
    getPosts();
    getNotes();
    // getForms();
    // setPosts(postsArr);
  }, [])

  return (
    <div>
    <div className="ann_general">
        <Sidebar/>        
        <div class="ann_general__right ann_general__right_ext" style={{marginTop: '65px'}}>
          <div style={{backgroundColor: 'white', width: '100%', textAlign: 'center'}}>
            <Typography sx={{ fontWeight: 600, fontSize: 24, m: 1.5 }}>All</Typography>
          </div>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderTop:1, borderColor: 'divider' }}>
              <AppBar elevation={1} position="static" sx={{bgcolor: "#F1F6F9"}}>
                <Tabs className={classes.tabs} variant="fullWidth" value={value} onChange={handleChange} aria-label="basic tabs example">
                  <Tab label="Posts" {...a11yProps(0)} />
                  <Tab label="Notes" {...a11yProps(1)} />
                  <Tab label="Forms" {...a11yProps(2)} />
                </Tabs>
              </AppBar>
            </Box>

            <TabPanel value={value} index={0}>
              {postsLoading ? <LinearProgress sx={{width:'100%', mt:'1px'}}/> : <CreateCard heading="Create Post" plholder="What do you want to ask or share?" openPopup={openPostPopup} setOpenPopup={setOpenPostPopup} />}
              {!postsLoading && Object.keys(posts).reverse().map((post)=>(
                  <Card key={post} author={posts[post].author} timestamp={posts[post].timestamp} title={posts[post].title} body={posts[post].content} link={posts[post].link} image={posts[post].imageUrl} forums={false} />
              ))} 
              {(posts.length<1 && !postsLoading) && <h5>No posts to display now</h5>}             
              {/* <Card type="announcement" author="Lizard" timestamp="Friday, 28th January 2022" title="How to pass this exam?"/> */}
              {/* <Card author="Lizard" timestamp="Friday, 28th January 2022" title="How to pass this exam?"/>
              <Card author="Lizard" timestamp="Friday, 28th January 2022" title="How to pass this exam?"/>
              <Card author="Lizard" timestamp="Friday, 28th January 2022" title="How to pass this exam?"/>
              <Card author="Lizard" timestamp="Friday, 28th January 2022" title="How to pass this exam?"/>
              <Card author="Lizard" timestamp="Friday, 28th January 2022" title="How to pass this exam?"/>
              <Card author="Lizard" timestamp="Friday, 28th January 2022" title="How to pass this exam?"/> */}
            </TabPanel>
            <TabPanel value={value} index={1}>
              {notesLoading ? <LinearProgress sx={{width:'100%'}}/> : <CreateCard heading="Add Notes" plholder="What do you want to ask or share?" openPopup={openNotesPopup} setOpenPopup={setOpenNotesPopup} />}
              {!notesLoading && Object.keys(notes).reverse().map((post)=>(
                  <Card key={post} author={notes[post].author} timestamp={notes[post].timestamp} title={notes[post].title} body={notes[post].body} link={notes[post].link} notesLink={notes[post].imageUrl} forums={false} />
              ))} 
              {(notes.length<1 && !notesLoading) && <h5>No posts to display now</h5>}      
              {/* <CreateCard heading="Add Notes" plholder="What do you want to ask or share?" openPopup={openNotesPopup} setOpenPopup={setOpenNotesPopup} />                    
              <Card author="Lizard" timestamp="Friday, 29th January 2022" title="How to pass this exam?"/>                    
              <Card author="Lizard" timestamp="Friday, 29th January 2022" title="How to pass this exam?"/>                    
              <Card author="Lizard" timestamp="Friday, 29th January 2022" title="How to pass this exam?"/>                    
              <Card author="Lizard" timestamp="Friday, 29th January 2022" title="How to pass this exam?"/>                    
              <Card author="Lizard" timestamp="Friday, 29th January 2022" title="How to pass this exam?"/>                    
              <Card author="Lizard" timestamp="Friday, 29th January 2022" title="How to pass this exam?"/>                    
              <Card author="Lizard" timestamp="Friday, 29th January 2022" title="How to pass this exam?"/> */}
            </TabPanel>
            <TabPanel value={value} index={2}>
              {formsLoading ? <LinearProgress sx={{width:'100%'}}/> : <CreateCard heading="Create Form" plholder="What do you want to ask or share?" openPopup={openNotesPopup} setOpenPopup={setOpenNotesPopup} />}
              {!formsLoading && Object.keys(posts).map((post)=>(
                  <Card key={post} author={posts[post].author} timestamp={posts[post].timestamp} title={posts[post].title} body={posts[post].body} link={posts[post].link} image={posts[post].image} forums={false} />
              ))}              
              {/* <Card author="Lizard" timestamp="Friday, 27th January 2022" title="How to pass this exam?"/>                    
              <Card author="Lizard" timestamp="Friday, 27th January 2022" title="How to pass this exam?"/>                    
              <Card author="Lizard" timestamp="Friday, 27th January 2022" title="How to pass this exam?"/>                    
              <Card author="Lizard" timestamp="Friday, 27th January 2022" title="How to pass this exam?"/>                    
              <Card author="Lizard" timestamp="Friday, 27th January 2022" title="How to pass this exam?"/>                    
              <Card author="Lizard" timestamp="Friday, 27th January 2022" title="How to pass this exam?"/>                    
              <Card author="Lizard" timestamp="Friday, 27th January 2022" title="How to pass this exam?"/>               */}
            </TabPanel>
          </Box>
        </div>
    </div>
    
    <PostPopup openPopup = {openPostPopup} setOpenPopup = {setOpenPostPopup}/>
    <NotesPopup openPopup = {openNotesPopup} setOpenPopup = {setOpenNotesPopup}/>
    </div>
  )
}
