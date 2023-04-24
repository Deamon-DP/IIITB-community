import React, { useRef, useState } from 'react';
import { Typography, Grid, Paper, TextField, Button, CircularProgress } from '@mui/material';
import { Link,useNavigate, Redirect } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import Alert from '@mui/material/Alert';
// import { AuthProvider, useAuth } from '../../contexts/AuthContext';
import { api } from "../../api";
import signinPic from "../../Images/signin.jpg";
import SchoolIcon from '@mui/icons-material/School';
import "./Signin.css"

function Signin() {
    const emailRef = useRef()
    const passRef = useRef()
    // const { login, currentUser, pending, signout } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useNavigate();
    const useStyles = makeStyles((theme) => ({
        root: {
          display: 'flex',
          justifyContent: 'center'
        },
      }));
    // fetch("")
    //   .then(res => res.json())
    //   .then(result => console.log(result))

    async function handleSubmit(e){
        e.preventDefault();
        try{
            setError('')
            setLoading(true)
            // await login(emailRef.current.value, passRef.current.value);
            // history.push("/Announcements")
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({"email":emailRef.current.value,"pwd":passRef.current.value});

            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };

            await fetch(api+"auth/login", requestOptions)
            // .then(response => response.json())
            .then(result => {

                if(result.status == 200){
                    result.json().then(data => {
                        localStorage.setItem('userType', data.userType);
                      });
                    // localStorage.setItem("userType", result.userType);
                    history("/Announcements")
                }
            })
            .catch(error => console.log('error', error));
            // history.push("/DiscussionForums/general")
            // await currentUser.sendEmailVerification()
        }
        catch{
            setError('Failed to sign in!')
        }
        setLoading(false)
    }

    const paperStyle = {padding:10, height: '75%', width: '300px', margin: '20px auto'};
    const buttonStyle = {margin:'20px 10px'};
    const textfieldStyle = {margin: '15px 0'};
    const preventDefault = (event) => event.preventDefault();
    // if(currentUser){
    //     return <Redirect to="/DiscussionForums"></Redirect>
    // }
    const classes = useStyles();
    return (
        <div className="signinDiv">
            
        <h2 className='heading'><SchoolIcon/> Community Platform</h2>
        <div className="box" style={{backgroundColor: 'white'}}>
            <div className="imageDiv">
                <img className="image" src={signinPic}></img>
            </div>
            <Grid className="signinCard" textAlign="center">
                <Paper className="paper" elevation={2} square={false} border-radius={100} style={paperStyle}>
                    <h1>Sign In</h1>
                    {/* {currentUser && currentUser.email} */}
                    {error && <Alert severity="error">{error}</Alert>}
                    <form onSubmit={handleSubmit}>
                        <TextField style={textfieldStyle} id="emailId" label="E-mail" placeholder="Enter e-mail" variant="outlined" inputRef={emailRef} required type="email"/>
                        <TextField style={textfieldStyle} id="password" label="Password" placeholder="Enter password" variant="outlined" type="Password" inputRef={passRef} required/>
                        <div className={classes.root}>
                        {loading && <CircularProgress/>}
                        </div>
                        <Button disabled={loading} style={buttonStyle} variant="contained" type="submit" color="secondary">Sign In</Button>
                    </form>
                    <Typography>
                        Do not have an account?<span> </span>
                        <Link to="/Signup">Sign Up</Link>
                    </Typography>
                </Paper>
            </Grid>
        </div>
        </div>
    )
}

export default Signin