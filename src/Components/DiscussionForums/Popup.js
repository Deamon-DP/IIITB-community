import React, {useRef, useState} from 'react'
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import getTimestamp from "../../Timestamp/timestamp";
import { api } from "../../api";

function Popup(props) {
    const { openPopup, setOpenPopup} = props;
    // const [open, setOpen] = useState(false);
    const [branch, setBranch] = useState('');
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [loading, setLoading] = useState(false);
    // const branchRef = useRef(null);
    // const titleRef = useRef(null);
    // const bodyRef = useRef(null);

    const handleBranchChange = (event) => {
        setBranch(event.target.value);
    };
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };
    const handleBodyChange = (event) => {
        setBody(event.target.value);
    };
    const handleClose = () => {
        setOpenPopup(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        var raw = JSON.stringify({"author":"Author", "branch": branch, "title": title, "body":body, "timestamp": getTimestamp()});
        console.log(raw);
        
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };
        let status = 0;
        fetch(api+"discussion-forum/ask", requestOptions)
        .then(response => {
            status = response.status; 
            return response.json();
        })
        .then(result =>{
            console.log(result);
            if(status==200){
                alert("Your question has been successfully posted!")
            }
            else{
                alert("Your question could not be posted. Please try again later.")
            }
            setLoading(false);
            setBranch('');
            setTitle('');
            setBody('');
            setOpenPopup(false);
            window.location.reload()
        })
        .catch(error => console.log('error', error));
        
        
      };
    return (
        <Dialog open={openPopup} fullWidth={true}>
            {loading?<Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>:<span></span>}
            <DialogTitle>
                <div>Create Post</div>
            </DialogTitle>
            <form onSubmit={handleSubmit}>
            <DialogContent dividers>
                <FormControl
                    sx={{  width: '100%', zIndex:'10000' }} required>
                <InputLabel id="demo-simple-select-required-label">Branch</InputLabel>
                <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={branch}
                variant="outlined"
                // inputRef={branchRef}
                fullWidth
                onChange={handleBranchChange}

                >
                    <MenuItem value={"General"}>General</MenuItem>
                    <MenuItem value={"CIVIL"}>Civil</MenuItem>
                    <MenuItem value={"CSE"}>CSE</MenuItem>
                    <MenuItem value={"EEE"}>EEE</MenuItem>
                    <MenuItem value={"ECE"}>ECE</MenuItem>            
                    <MenuItem value={"MECH"}>Mechanical</MenuItem>
                    <MenuItem value={"IT"}>IT</MenuItem>
                </Select>
                </FormControl>
            <FormControl sx={{  width: '100%' }} required>
                <TextField
                margin="dense"
                id="title"
                label="Title"
                required
                fullWidth
                variant="outlined"
                // inputRef={titleRef}
                value={title}
                multiline={true}
                rows={2}
                onChange={handleTitleChange}
                />
            </FormControl>
            <FormControl sx={{  width: '100%' }} required>
                <TextField
                margin="dense"
                id="body"
                label="Body (optional)"
                fullWidth
                variant="outlined"
                // inputRef={bodyRef}
                value={body}
                multiline={true}
                rows={6}
                onChange={handleBodyChange}
                />
            </FormControl>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="secondary">
                Cancel
            </Button>
            <Button type="submit" color="secondary">
                Post
            </Button>
            </DialogActions>
        </form>
      </Dialog>
    )
}

export default Popup