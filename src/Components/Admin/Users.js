import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles';
// import AdminNavbar from "../Navbar/AdminNavbar"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import {api} from "../../api"
import { Button } from '@mui/material/';
import Signup from "../Signup/Signup";
import PropTypes from 'prop-types';
import '../../App.css'

function Users() {
    const [users, setUsers] = useState([])
    const [value, setValue] = React.useState(0);
    const [loading, setLoading]=useState(false)

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
          }
        },
        table: {
            minWidth: 650
          }
      })
      const classes = useStyles();
    
      const handleChange = (event, newValue) => {
        setValue(newValue);
      };


    const deleteUser = (id)=>{
        setLoading(true)
        console.log(id)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({"userId":""+id});
        console.log(raw)
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch(api+"admin/delete_user", requestOptions)
        .then(response => response.json())
        .then(result => {
            if(result.status == 200){
                alert("User Deleted successfully!")
                setLoading(false)
                window.location.reload()
            }
            else{
                alert("Could not delete user!Please try again later.")
            }
        })
        .catch(error => console.log('error', error));

    }
    async function getUsers(){
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch(api+"admin/all_users", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if(result.status == 200){
                    setUsers(result.users)
                }
                else{
                    alert("Error fetching data. Please try again later.")
                }
            })
            .catch(error => console.log('error', error));
    }
    const userArr = {
        user1:{
            name:"Sathyasai Ajitesh",
            email: "Elementum tempus",
            userId:"ornareaeneaneuismod",
            userType:"1"
        },
        user2:{
            name:"Sathyasai Ajitesh",
            email: "Elementum tempus",
            userId:"siscelerisqueeuultrs",
            userType:"1"
        },
        user3:{
            name:"Sathyasai Ajitesh",
            email: "Elementum tempus",
            userId:"reaeneaneuismodquee",
            userType:"1"
        },
        user4:{
            name:"Sathyasai Ajitesh",
            email: "Elementum tempus",
            userId:"neuismodqansisceles",
            userType:"1"
        },
        user5:{
            name:"Sathyasai Ajitesh",
            email: "Elementum tempus",
            userId:"trsuysmodqansiscele",
            userType:"1"
        }
    }
    // setUsers(userArr)
    useEffect(() => {
        // getUsers();
        setUsers(userArr)
    }, []);
    return (


        <Box sx={{ width: '100%', mt:'65px' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <AppBar elevation={1} position="static" sx={{bgcolor: "#F1F6F9"}}>
                <Tabs className={classes.tabs} variant="fullWidth" value={value} onChange={handleChange} aria-label="basic tabs example">
                  <Tab label="Users" {...a11yProps(0)} />
                  <Tab label="Add Faculty" {...a11yProps(1)} />
                </Tabs>
              </AppBar>
            </Box>

            <TabPanel value={value} index={0}>
                <div style={{ margin:'5px'}}>
                    <br/>
                    {/* <div> */}
                    <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="Users table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>User ID</TableCell>
                            <TableCell>User Type</TableCell>
                            <TableCell>Delete Account</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {Object.keys(users).map((row) => (
                            <TableRow id={`row_${users[row].userId}`} key={row.userId}>
                            <TableCell component="th" scope="row">
                                {users[row].name}
                            </TableCell>
                            <TableCell>{users[row].email}</TableCell>
                            <TableCell>{users[row].userId}</TableCell>
                            <TableCell>{users[row].userType}</TableCell>
                            <TableCell><Button id={users[row].userId} variant="contained" onClick={() => deleteUser(users[row].userId)} disabled={loading}>Delete user</Button></TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
                    {/* </div> */}
                </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Signup/>
            </TabPanel>
          </Box>
    )
}

export default Users