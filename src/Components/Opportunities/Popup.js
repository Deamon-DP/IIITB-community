import React, {useRef, useState} from 'react'
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import FormControl from '@mui/material/FormControl';
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
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [link, setLink] = useState('');
    const [loading, setLoading] = useState(false);
    // const branchRef = useRef(null);
    // const titleRef = useRef(null);
    // const bodyRef = useRef(null);

    const handleLinkChange = (event) => {
        setLink(event.target.value);
    };
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };
    const handleContentChange = (event) => {
        setContent(event.target.value);
    };
    const handleClose = () => {
        setOpenPopup(false);
    };
    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        var raw = JSON.stringify({"author":"Author", "title": title, "content":content, "link": link, "timestamp": getTimestamp()});
        console.log(raw);
        
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };
        console.log(raw);
        let status = 0;
        fetch(api+"opportunities/post", requestOptions)
        .then(response => {
            status = response.status; 
            console.log(status); 
            return response.json();
          })
        .then(result =>{
            console.log(result);
            setOpenPopup(false);
            setLoading(false);
            if(status == 200){
                alert("Posted successfully!")
                window.location.reload()
            }
            else{
                alert("Could not fetch data. Please try again later.")
            }
            
            setTitle('');
            setContent('');
            setLink('');
          })
          .catch(error => console.log('error', error));
        
        
      };
    return (
        <Dialog open={openPopup} fullWidth={true}>
            {loading && <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>}
            <DialogTitle>
                <div>Create Post</div>
            </DialogTitle>
            <form onSubmit={handleSubmit}>
            <DialogContent dividers>
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
                id="content"
                label="Content"
                required
                fullWidth
                variant="outlined"
                // inputRef={bodyRef}
                value={content}
                multiline={true}
                rows={6}
                onChange={handleContentChange}
                />
            </FormControl>
            <FormControl sx={{  width: '100%' }} required>
                <TextField
                margin="dense"
                id="link"
                label="Link"
                required
                fullWidth
                variant="outlined"
                // inputRef={bodyRef}
                value={link}
                multiline={true}
                rows={1}
                onChange={handleLinkChange}
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