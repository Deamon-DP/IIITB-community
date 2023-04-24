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
// import {Link} from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommentIcon from '@mui/icons-material/Comment';

export default function OppCard({author, timestamp, title, body, link, postId, multiple}) {
  const mh = multiple? '45px' : '0px';
  const style = {
    width: '100%',
    m: 1.5,
    minHeight: '180px'
  }

  const style2 = {
    pl:2.5, 
    pr:2.5, 
    fontSize:'18px', 
    fontWeight: '600', 
    minHeight: mh
  }
  return (
    <Card sx={style}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={author}
        subheader={timestamp}
      />
      
      <CardContent>
        <Typography sx={style2} variant="h1" align="left">
          {multiple? ((title.length<=60)? title: title.substring(0,57)+" ..."): title}
        </Typography>
      </CardContent>
      <CardContent>        
      {body?<Typography sx={{pl:2.5, pr:2.5}} variant="body2" color="text.secondary" align="justify">
          {body}
      </Typography>:<span></span>}
      {multiple? 
        <Link sx={{pl:2.5, pr:2.5, textAlign:'center'}} href={"/Opportunities/"+postId} underline="hover" align="center">
          Read More
        </Link>:<span></span>
      }
      {link?<div style={{textAlign:'center'}}>
              <br/>
              <Link sx={{p:2.5, textAlign:'center'}} href={link} underline="hover">
                Link to website
              </Link>
          </div>: <span></span>}
      </CardContent>
    </Card>
  );
}
