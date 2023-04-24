import React, {useState, useEffect} from 'react';
import Popup from '../DiscussionForums/Popup';
import Card from "../Card/Card";
import CreateCard from "../Card/CreateCard";
import Sidebar from './Sidebar/Sidebar';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import {useParams, Link} from 'react-router-dom';
import {api} from "../../api";
import './General.css';

function General() {
    const [openPopup, setOpenPopup] = useState(false);    
    const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  let { branchId } = useParams();
  const keys = {
    "100": "General Discussions",
    "732":"Civil Engineering",
    "733":"Computer Science and Engineering",
    "734":"Electrical and Electronics Engineering",
    "735":"Electronics and Communication Engineering",
    "736":"Mechanical Engineering",
    "737":"Information Technology"
  }
  const keys2 = {
    "100": "General",
    "732":"CIVIL",
    "733":"CSE",
    "734":"ECE",
    "735":"EEE",
    "736":"MECH",
    "737":"IT"
  }
  let postsArr = {
      post1: {
        "author": "Sollicitudin",
        "timestamp": "Friday, 28th January 2022",
        "title": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis.",
        "postId":"1000000000000001",
        "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin libero nunc consequat interdum varius. Mi eget mauris pharetra et ultrices."
      },
      post2:{
        "author": "Viverra",
        "timestamp": "Saturday, 29th January 2022",
        "title": "Amet cursus sit amet dictum sit amet justo donec enim",
        "postId":"1000000000000002",
        "body": "Fermentum iaculis eu non diam phasellus vestibulum. Penatibus et magnis dis parturient montes. Aenean pharetra magna ac placerat vestibulum lectus mauris."
      },
      post3:{
        "author": "Neque",
        "timestamp": "Saturday, 29th January 2022",
        "title": "Facilisis magna etiam tempor orci eu lobortis elementum nibh tellus",
        "postId":"1000000000000003",
        "body": "Nullam ac tortor vitae purus faucibus ornare suspendisse. Dui id ornare arcu odio. Egestas diam in arcu cursus euismod quis. Elementum nibh tellus molestie nunc non blandit massa enim nec. Velit dignissim sodales ut eu sem integer. Bibendum arcu vitae elementum curabitur vitae. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      },      
      post4:{
        "author": "Volutpat",
        "timestamp": "Sunday, 30th January 2022",
        "title": "Orci nulla pellentesque dignissim enim sit amet venenatis urna cursus eget nunc scelerisque viverra mauris in aliquam sem fringilla ut morbi tincidunt augue interdum velit euismod in pellentesque massa placerat duis ultricies lacus",
        "postId":"1000000000000004",
        "body": "Adipiscing commodo elit at imperdiet dui accumsan sit amet nulla. Pharetra magna ac placerat vestibulum lectus mauris ultrices eros. Vitae semper quis lectus nulla at volutpat diam ut. Sit amet nulla facilisi morbi tempus. Eget gravida cum sociis natoque penatibus et magnis dis. Mauris in aliquam sem fringilla ut morbi. Diam quis enim lobortis scelerisque fermentum dui faucibus in ornare."
      }
  }

  async function getResults(){
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    var raw = JSON.stringify({"branchId":keys2[branchId]});
  
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
  
    // console.log(raw);
    let status = 0;
    await fetch(api+"discussion-forum/view_all", requestOptions)
    .then(response => {
      status = response.status; 
      return response.json()
    })
    .then(res =>{
      // console.log(posts);
      setLoading(false);
      if(status==200){
        setPosts(res)
      }
      else{
        alert("Could not fetch data. Please try again later.")
      }
    })
    .catch(error => console.log('error', error));
  }

  useEffect(() => {
    // setPosts(postsArr)
    getResults()
  }, [branchId])
  return (
            <div>
                <div className='general'>
                    <Sidebar/>
                    <div class="general__right general__right_ext" style={{marginTop: '65px'}}>
                        {/* <div className='general_right_cover'></div> */}
                        <div style={{backgroundColor: 'white', width: '100%', textAlign: 'center', position:'sticky'}}>
                            <Typography sx={{ fontWeight: 600, fontSize: 24, m: 1.5 }}>{keys[branchId]}</Typography>
                        </div>
                        {loading &&
                        <LinearProgress sx={{width:'100%'}}/>}
                        {!loading && <CreateCard heading="Create Post" plholder="What do you want to ask or share?" openPopup={openPopup} setOpenPopup={setOpenPopup} />}
                        {!loading && Object.keys(posts).reverse().map((p) => (           
                            <Card author={posts[p].author} timestamp={posts[p].timestamp} title={posts[p].title} body={posts[p].body} branchId={branchId} postId={posts[p]._id} forums={true}/>
                        ))}
                        {(posts.length<1 && !loading) && <h5>No posts to display now</h5>}
                    </div>
                    <Popup openPopup = {openPopup} setOpenPopup = {setOpenPopup}/>
                </div>
            </div> 
        );
}

export default General;
