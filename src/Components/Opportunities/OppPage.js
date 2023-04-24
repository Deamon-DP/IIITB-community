import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom';
import OppsCard from '../Card/OppsCard';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import {api} from '../../api';

function OppPage() {
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);
    let {postId} = useParams();
    async function getResults(){
        setLoading(true);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({"oppId":postId});
        console.log(raw)
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        let status = 0
        await fetch(api+"opportunities/opp_data", requestOptions)
        .then(response => {
            status = response.status; 
            console.log(status); 
            return response.json();
        })
        .then(res => {
            console.log(res)
            if(status==200){
                setResult(res);
                console.log(result)
            }
            else{
                alert("Could not fetch data. Please try again later.")
            }
            setLoading(false);
        })
        .catch(error => console.log('error', error));
    }
    useEffect(() => {
        getResults();
    }, [])
    return (
        <div style={{marginTop:'60px', display:'flex', flexDirection:'column', alignItems:'center', minHeight:'89vh'}}>
            <div style={{backgroundColor: 'white', width: '100%', textAlign: 'center'}}>
                <Typography sx={{ fontWeight: 600, fontSize: 24, m: 1.5 }}>Opportunities - View Post</Typography>
                {loading?<div><LinearProgress/></div>:<span></span>}
            </div>
            {loading?<span></span>
                :<div style={{display:'flex', flexDirection:'column', alignItems:'center', width:"80%", minHeight:'100%', position:'relative'}}>
                    {result?<OppsCard author={result.author} timestamp={result.timestamp} title={result.title} body={result.content} link={result.link} multiple={false}/>:<span></span>}
                </div>}
        </div>
    )
}

export default OppPage