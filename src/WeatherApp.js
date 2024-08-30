import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from 'axios'
import  './WeatherApp.css';
import CardMedia from '@mui/material/CardMedia';
import AppBar from '@mui/material/AppBar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import img from'./images.jpeg';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import img1 from'./myimg.png';
import Toolbar from '@mui/material/Toolbar';

function WeatherApp() {

const[data,setdata]=React.useState({});
const[cloud,setcloud]=React.useState(null)
const [Lodding,setLodding]=React.useState(false)
const handlechange=(e)=>{
  let name=e.target.name;
  let value=e.target.value;
  setdata({...data,[name]:value})
 
 
}
// setLodding(true);
const handleclick=()=>{

  // const apiKey = '5f114b623b2c42d49c3102625230807';
  const apiKey ='887f8d8fbed04628be085053231007';
  const city = data.city; 
  setLodding(true);
   // Extract the city name from the state
  if(city){
  axios.get(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`)
  .then(response => {
   console.log(response);
   setcloud(response.data)
   setLodding(false);

   const location=response.data.location
   const current=response.data.current
   // let forecast=resource.data.forecast
  const region=location.region;
  const country=location.country; 
  const temp_c=current.temp_c;
 const  temp_f=current.temp_f;
 const humidity=current.humidity
  console.log(region)
  console.log(country)
  console.log(temp_c)
  console.log(temp_f)
  console.log(humidity)

  // setLodding(true);
})

  //  setLodding(false)


.catch(error => {
   console.error(error,error);
  })
  }else{
    alert('Please enter a city name')
  }
  // fetch('https://api.openweathermap.org/data/2.5/weather?q='+data.city+'&
// console.log(data)
}
console.log(data.city)
  return (
    <>
    {Lodding ? (<div>    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>  </div>) :

   
      <div>
        {/* <div style={{ display:"flex",justifyContent:"center" }}> */}
      <Box sx={{ flexGrow: 1}}>
      <AppBar  >
        <Toolbar sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Typography variant="h3" component="div" sx={{ flexGrow: 1 ,textAlign: "center", backgroundColor:"rgba(200,225,225,0.2)"}}>
           Welcome  Purvi's  Weather  App 
          </Typography>
         
        </Toolbar>
      </AppBar>
      

    </Box>
    {/* </div> */}
 
    {/* <h1 style={{color:"red"}} className='myapp'>Welcome </h1><br></br><br></br> */}

{/* <h4 sx={{img:{img1}}}>images</h4> */}
      <div className='myClass'>
      <img src={img1} alt="Small Overlay" className="small-image" />
              <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
        autoComplete="off"
    >
      
      <h4 sx={{alignItems:"center"}}>CITY:</h4>
      <TextField id="outlined-basic"  name="city" value={data.city} variant="outlined" onChange={handlechange}/><br></br>
      <Button variant="contained" color="success" onClick={handleclick}>
        Submit
      </Button> 
    </Box>  <br></br><br></br>
    
    <div style={{ marginLeft:4}}>
      
      <h4 sx={{alignItems:"center" ,paddingleft:"100px"}}>WEATHER DETAILS:</h4>
    {cloud  && (
        <Card sx={{ maxWidth: 345, marginLeft: 4,backgroundColor:"rgba(0,51,102,0.5)"}}  >
          <CardMedia
            component="img"
            height="140"
            image={img} 
            alt="green iguana"
          />
           <CardContent style={{color:"white",fontFamily:"cursive",fontSize:"20px"}}>
            <Typography gutterBottom variant="h6" component="div">
            City: {cloud.location.name} <br></br>
             state:{cloud.location.region}<br></br>
            Country: {cloud.location.country}<br></br>
            Temp_C: {cloud.current.temp_c}°C ,<br></br>
            Temp_F: {cloud.current.temp_f}°F <br></br>
            Condition: {cloud.current.condition.text} <br></br>
            humidity: {cloud.current.
humidity
}
            </Typography>
         

          </CardContent>
        </Card>
      )} 
      </div>
    </div>
    </div>
}
    </>
  )
}

export default WeatherApp;