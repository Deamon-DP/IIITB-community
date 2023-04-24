import * as React from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
// import {Link} from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommentIcon from '@mui/icons-material/Comment';

export default function QuestionCard({author, timestamp, title, body, image, link, branchId, postId, forums, width, mb, square, notesLink}) {

  const w = width ? width:{xs:'95%', sm:'67%'}
  const m = mb ? mb : 1.5
  const style = {
    width: w,
    m: 1.5,
    mb: mb
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <Card sx={style} square={square}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <div>
          <IconButton aria-label="settings">
            <MoreVertIcon onClick={handleClick}/>
          </IconButton>
          <Menu
            id="fade-menu"
            MenuListProps={{
              'aria-labelledby': 'fade-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <MenuItem onClick={handleClose}>Delete Post</MenuItem>
          </Menu>
          </div>
        }
        title={author}
        subheader={timestamp}
      />
      
      <CardContent>
        <Typography sx={{pl:2.5, pr:2.5}} variant="h5" align="justify">
          {title}
        </Typography>
      </CardContent>
      <CardContent>
        
      <Typography sx={{pl:2.5, pr:2.5}} variant="body2" color="text.secondary" align="justify">
          {body}
      </Typography>
      {forums ?
        <Link sx={{pl:2.5, pr:2.5}} href={"/DiscussionForums/"+branchId+"/"+postId} underline="none">
          <Stack direction="row" alignItems="center" justifyContent="center">
            <CommentIcon/>
            <Typography sx={{pl:0.5, pr:0.5, fontWeight:500}}>
              Replies
            </Typography>
          </Stack>
        </Link>:<span></span>}
      {link?<div style={{textAlign:'center'}}>
              <br/>
              <Link sx={{pl:2.5, pr:2.5, textAlign:'center'}} href={link} underline="hover">
                {link}
              </Link>
          </div>: <span></span>}
      {notesLink?<div style={{textAlign:'center'}}>
          <br/>
          <Link sx={{pl:2.5, pr:2.5, textAlign:'center'}} href={notesLink} underline="hover">
            View notes here
          </Link>
      </div>: <span></span>}
      </CardContent>
      {image ?  <CardContent>
        <CardMedia
          component="img"
          height="350"
          image={image}
          alt="Related image"
          sx={{objectFit: 'contain'}}
        />
      </CardContent>: <span></span>}
    </Card>
  );
}
