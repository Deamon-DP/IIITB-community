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
import {useParams} from 'react-router-dom';
import {api} from '../../api';

function Popup(props) {
    const { openPopup, setOpenPopup} = props;
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [link, setLink] = useState('');
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("No file chosen");
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
        e.preventDefault()
        setLoading(true);
        if(file){
            const time = getTimestamp();
            const NotesStorageRef = ref(storage, `Announcements/Notes/${fileName} - ${time}`);
            const uploadTask = uploadBytesResumable(NotesStorageRef, file);

            uploadTask.on('state_changed', (snapshot)=>{
                console.log(snapshot);
            },
            (err) => console.log(err),
            ()=>{
                getDownloadURL(uploadTask.snapshot.ref).then(url=>
                    {
                        setFileLink(url);
                        console.log(url)
                        submitData(url);
                    });

            }
            )

        }
    };

    const submitData = (url)=>{
        
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({"author":"author", "content": body, "title": title, "link": link, "timestamp": getTimestamp(), "imageUrl": url, "className": classId});

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
        console.log(raw)
        let status = 0;
        fetch(api+"announcements/post/notes", requestOptions)
        .then(response => {status=response.status; return response.json()})
        .then(result =>{
        
        // document.getElementById("progress").style.display="none"
            console.log(result);
            setLoading(false);
            setOpenPopup(false);
            setLink('');
            setFile(null);
            setFileName('No file chosen')
            setTitle('');
            setBody('');
            if(status == 200){
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
        <Dialog open={openPopup} fullWidth={true} sx={{mt:'10px'}}>
            <DialogTitle>
                <div style={{display:'flex', alignItems:'center'}}><CreateIcon/>Add Notes</div>
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
                    Upload File
                    <input
                        id="imgInput"
                        type="file"
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