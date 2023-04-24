import React from 'react'
import { makeStyles } from '@mui/styles';
import Navbar from "../Navbar/Navbar"
import Button from "@mui/material/Button"
import {Link} from 'react-router-dom';
import announcement from "./undraw_happy_announcement_ac67.png"
import discForums from "./discForums.png"
import opps from "./opps1.png"
import scrum from "./scrum.png"
import network from "./social-communities_eulfrn.jpg"
import "./Home.css"

function Home() {
    const useStyles = makeStyles((theme) => ({
        root: {
          maxWidth: 800,
          spacing: 2
        },
        title: {
            fontWeight:700,
            fontSize: '8 rem'
        }
      }));
      const classes = useStyles();
    return (
        <div>
            <section class="sectional sectional-3 text-left text-white">
            <div class="container">
                <div class="h-300p row">
                <div style={{marginTop:"0", display:"flex", alignItems:"center", position:"absolute", top: "46%", left: "50%", transform: "translate(-50%, -50%)"}}>
                    <h2 style={{fontSize:"4rem", color:"white"}}><div><i className='fa fa-graduation-cap Navbar__logo'></i></div>Matrusri Community Platform</h2>
                </div>
                </div>
            </div>
            </section>
            <div style={{margin:"auto", marginBottom:"20px", width:"80%"}}>
                <div className="homeCard">
                    <div className="homeCard__div">
                        <div className="homeCard__div__content">
                            <h1 className="points">Stay updated with announcements from college</h1>
                            <p className="desc">College adminstration can post announcements from time to time about various events and happennings in college. Official announcements can reach all students of the college at the click of a button!
                            </p>
                            <div>
                                <a to="/Announcements"  className="links">
                                    <Button style={{margin:"15px 0px"}} variant="contained" color="secondary" size="large">
                                        Click here to view Announcements!
                                    </Button>
                                </a>
                            </div>
                        </div>                        
                        <img className="annPic" src={announcement}/>
                    </div>                    
                </div>
                <div className="homeCard">
                    <div className="homeCard__div">
                        <img className="annPic" src={discForums}/>
                        <div className="homeCard__div__content">
                            <h1 className="points">Have questions related to your academics or college life in general?</h1>
                            <p className="desc"> Get them answered by your peers, alumni and faculty of your college! Anyone who has an account in the website can post questions in the Discussion Forums and can have them answered. The questions can be branch specific or can be general questions related to the college.
                            </p>
                        <div>
                            <a to="/DIscussionForums/general"  className="links">
                                <Button style={{margin:"15px 0px"}} variant="contained" color="secondary" size="large">
                                    Click here to view Discussion Forums!
                                </Button>
                            </a>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="homeCard">
                    <div className="homeCard__div">
                        <div className="homeCard__div__content">
                        <h1 className="points">Are you a student who is actively looking for Opportunities to grow?</h1>
                        <p className="desc"> Opportunities section is the place you want to go to! Faculty and alumni from your college post the best trainings, online courses, job opportuniites and internship opportunities related to various fields. You can find the ones which will help you grow and get closer to reaching your goals!
                        </p>
                        <div>
                            <a to="/Opportunities" className="links">
                                <Button style={{margin:"15px 0px"}} variant="contained" color="secondary" size="large">
                                    Click here to view Opportunities!
                                </Button>
                            </a>
                        </div>
                        </div>
                    <img className="annPic" src={opps}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
