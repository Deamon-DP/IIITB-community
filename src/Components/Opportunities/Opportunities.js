import React, {useState, useEffect} from 'react';
import Typography from '@mui/material/Typography';
import CreateCard from "../Card/CreateCard";
import OppsCard from "../Card/OppsCard";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Popup from "./Popup";
import LinearProgress from '@mui/material/LinearProgress';
import {api} from "../../api";
import './Opportunities.css';

export default function Opportunities() {
    const [openPopup, setOpenPopup] = useState(false);  
    const [loading, setLoading] = useState(false);
    
    const [result, setResult] = useState([]);

    async function getResults(){
        setLoading(true);
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          let status = 0
          fetch(api+"opportunities/view_all", requestOptions)
            .then(response => {
              status = response.status; 
              console.log(status); 
              return response.json();
            })
            .then(res => {
                console.log(res)
                if(status==200){
                    setResult(res);
                    console.log(result)
                }
                else{
                    alert("Could not fetch data. Please try again later.")
                }
                setLoading(false);
            })
            .catch(error => console.log('error', error));
    }


    useEffect(() => {
        getResults();
    }, [])


    let posts = {
        post1: {
          "author": "Sollicitudin",
          "timestamp": "Friday, 28th January 2022",
          "postId":"1000000000000001",
          "title": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis.",
          "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin libero nunc consequat interdum varius. Mi eget mauris pharetra et ultrices.",
          "link": "https://matrusri.edu.in/"
        },
        post2:{
          "author": "Viverra",
          "timestamp": "Saturday, 29th January 2022",
          "postId":"1000000000000002",
          "title": "Amet cursus sit amet dictum sit amet justo donec enim",
          "body": "Fermentum iaculis eu non diam phasellus vestibulum. Penatibus et magnis dis parturient montes. Aenean pharetra magna ac placerat vestibulum lectus mauris.",
          "link": "https://matrusri.edu.in/"
        },
        post3:{
          "author": "Neque",
          "timestamp": "Saturday, 29th January 2022",
          "postId":"1000000000000003",
          "title": "Facilisis magna etiam tempor orci eu lobortis elementum nibh tellus",
          "body": "Nullam ac tortor vitae purus faucibus ornare suspendisse. Dui id ornare arcu odio. Egestas diam in arcu cursus euismod quis. Elementum nibh tellus molestie nunc non blandit massa enim nec. Velit dignissim sodales ut eu sem integer. Bibendum arcu vitae elementum curabitur vitae. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          "link": "https://matrusri.edu.in/"
        },      
        post4:{
          "author": "Volutpat",
          "timestamp": "Sunday, 30th January 2022",
          "postId":"1000000000000004",
          "title": "Orci nulla pellentesque dignissim enim sit amet venenatis urna cursus eget nunc scelerisque viverra mauris in aliquam sem fringilla ut morbi tincidunt augue interdum velit euismod in pellentesque massa placerat duis ultricies lacus",
          "body": "Adipiscing commodo elit at imperdiet dui accumsan sit amet nulla. Pharetra magna ac placerat vestibulum lectus mauris ultrices eros. Vitae semper quis lectus nulla at volutpat diam ut. Sit amet nulla facilisi morbi tempus. Eget gravida cum sociis natoque penatibus et magnis dis. Mauris in aliquam sem fringilla ut morbi. Diam quis enim lobortis scelerisque fermentum dui faucibus in ornare.",
          "link": "https://matrusri.edu.in/"
        },
        post5:{
            "author": "Volutpat",
            "timestamp": "Sunday, 30th January 2022",
            "postId":"1000000000000005",
            "title": "Orci nulla pellentesque dignissim enim sit amet venenatis urna cursus eget nunc scelerisque viverra mauris in aliquam sem fringilla ut morbi tincidunt augue interdum velit euismod in pellentesque massa placerat duis ultricies lacus",
            "body": "Adipiscing commodo elit at imperdiet dui accumsan sit amet nulla. Pharetra magna ac placerat vestibulum lectus mauris ultrices eros. Vitae semper quis lectus nulla at volutpat diam ut. Sit amet nulla facilisi morbi tempus. Eget gravida cum sociis natoque penatibus et magnis dis. Mauris in aliquam sem fringilla ut morbi. Diam quis enim lobortis scelerisque fermentum dui faucibus in ornare.",
            "link": "https://matrusri.edu.in/"
          }
      }
  return (
    <div className="opp_general">
        <div style={{backgroundColor: 'white', width: '100%', textAlign: 'center'}}>
            <Typography sx={{ fontWeight: 600, fontSize: 24, m: 1.5 }}>Opportunities</Typography>
            {loading?<LinearProgress/>:<span></span>}
        </div>
        <div className="opp_content">
            {!loading && 
            <div><Grid container direction={'row'}  alignItems="center">
                <Grid sx={{display:'flex', justifyContent:'center'}} item xs={12}>
                    <CreateCard heading="Create Post" plholder="What do you want to ask or share?" width="100%" openPopup={openPopup} setOpenPopup={setOpenPopup}/>
                </Grid>
                { Object.keys(result).reverse().map((post)=>
                (<Grid sx={{m:0, p:0, display:'flex', justifyContent:'center'}} item xs={12} sm={6}>
                    <OppsCard key={post} author={result[post].author} timestamp={result[post].timestamp} title={result[post].title} postId={result[post]._id} multiple={true}/>
                </Grid>))}
            </Grid>            
            <Popup openPopup = {openPopup} setOpenPopup = {setOpenPopup}/></div>}
        </div>
    </div>
  )
}
