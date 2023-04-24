import React, {useRef, useState} from 'react'
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CreateIcon from '@mui/icons-material/Create';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import getTimestamp from "../../Timestamp/timestamp";
import { UploadFileOutlined } from '@mui/icons-material';
import { ref } from "firebase/storage";
import { storage } from "../../Firebase/Firebase";
import { getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { api } from "../../api";
import {useParams} from 'react-router-dom';

function Popup(props) {
    const { openPopup, setOpenPopup} = props;
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [link, setLink] = useState('');
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("No image chosen");
    const [fileLink, setFileLink] = useState("-");
    const questionRef = useRef();

    let { classId } = useParams();

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };
    const handleBodyChange = (event) => {
        setBody(event.target.value);
    };
    const handleLinkChange = (event) => {
        setLink(event.target.value);
    };
    const handleClose = () => {
        setOpenPopup(false);
    };
    const handleImageChange = (event)=> {
        console.log(event.target.files[0])
        if(event.target.files[0]){
            setFile(event.target.files[0]);
            console.log(file);
            setFileName(event.target.files[0].name);
        }
    }
    const uploadFile = (e) => {
        setLoading(true);
        e.preventDefault()
        if(file){
            
            const time = getTimestamp();
            const PostsStorageRef = ref(storage, `Announcements/Posts/${fileName} - ${time}`);
            const uploadTask = uploadBytesResumable(PostsStorageRef, file);

            uploadTask.on('state_changed', (snapshot)=>{
                console.log(snapshot);
            },
            (err) => console.log(err),
            ()=>{
                getDownloadURL(uploadTask.snapshot.ref).then(url=>
                    {
                        console.log(url);
                        submitData(""+url);
                    });

            }
            )

        }
        else{
            submitData("-");
        }
    };

    const submitData = (url)=>{
        
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({"author":"author", "className": classId, "content": body, "title": title, "link": link, "timestamp": getTimestamp(), "imageUrl": url});

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
        console.log(raw);
        let status = 0;
        fetch(api+"announcements/post", requestOptions)
        .then(response => {status=response.status; return response.json()})
        .then(result =>{
        
        // document.getElementById("progress").style.display="none"
            console.log(result);
            if(status == 200){
                setLoading(false);
                setOpenPopup(false);
                setLink('');
                setFile(null);
                setFileName('No image choses')
                setTitle('');
                setBody('');
                alert("Your announcement has been successfully posted!")
                window.location.reload();
            }
            else{
            alert("An error occured. Please try again later");
            window.location.reload();
            }
        })
        .catch(error => console.log('error', error));

        
    }

    return (
        <Dialog open={openPopup} fullWidth={true}>
            <DialogTitle>
                <div style={{display:'flex', alignItems:'center'}}><CreateIcon/>Create Post</div>
            </DialogTitle>
            <form onSubmit={uploadFile}>
            {loading?<LinearProgress/>:<span></span>}
            <DialogContent dividers>
                <TextField
                margin="dense"
                id="title"
                label="Title"
                required
                fullWidth
                variant="outlined"
                multiline={true}
                rows={1}
                value={title}
                onChange={handleTitleChange}
            />
            <TextField
                margin="dense"
                id="body"
                label="Body"
                fullWidth
                variant="outlined"
                multiline={true}
                rows={5}
                value={body}
                onChange={handleBodyChange}
            />
            <TextField
                margin="dense"
                id="link"
                label="Related Link"
                required
                fullWidth
                variant="outlined"
                value={link}
                onChange={handleLinkChange}
            />
            <div style={{display:'flex', alignItems:'center', margin: '10px 0px'}}>
                <Button
                    variant="contained"
                    component="label"
                    startIcon={<UploadFileOutlined />}
                >
                    Select Image
                    <input
                        id="imgInput"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        hidden
                    />
                </Button>
                <span id='fileName' style={{marginLeft:'8px'}}>{fileName}</span>
            </div>
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