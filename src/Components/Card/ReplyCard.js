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

export default function QuestionCard({author, timestamp, body, reply}) {

  const w ={xs:'95%', sm:'67%'}

  const style = {
    width: w,
    mt:1,
    mb: 1,
    pl:6,
    pr:6
  }
  return (
    <Card sx={style} square={true}>
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
        
      <Typography sx={{pl:2.5, pr:2.5}} variant="body2" color="text.secondary" align="justify">
          {reply}
      </Typography>
      </CardContent>
    </Card>
  );
}
