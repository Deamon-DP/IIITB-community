import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import TextField from '@mui/material/TextField';
import CreateIcon from '@mui/icons-material/Create';


export default function CreateQuestionCard(props) {

  const {heading, plholder, openPopup, setOpenPopup, width} = props;

  const w = width ? width:{xs:'95%', sm:'67%'}

  const style = {
    width: w,
    m: 1.5,
    cursor:'pointer'
  }
  return (
    <Card onClick = {()=>setOpenPopup(true)} sx={style}>
        <CardHeader
            avatar = {<CreateIcon/>}
            title= {heading}
            sx = {{m: 0, pt:1.5, pb:0}}
        />
      <CardContent sx = {{m: 0, cursor:"pointer"}}>
        <TextField size="small" fullWidth label={plholder} disabled id="fullWidth" />
      </CardContent>
      
    </Card>
  );
}
