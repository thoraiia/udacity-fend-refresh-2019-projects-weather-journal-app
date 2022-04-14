// Personal API Key for OpenWeatherMap API
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = 'b6cc83a583d8946194d5353368e6caa5&units=metric';

/* Global Variables */
const URL = 'http://localhost:3000';


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click',generate);

function generate(){
    
    let zipValue = document.querySelector('#zip').value;
    let feelingsValue = document.querySelector('#feelings').value;
    
    try{
    getWeather(zipValue)
    .then((weather)=>{
        data = {
            temperature: weather.main.temp, //ToDo get the correct temperature from api
            zip : zipValue,
            feelings : feelingsValue,
            date : newDate
        }
        return data;

    })
    .then((data)=>{postData(URL+"/add",data)})
    .then(UpdateUI);
}catch(e){
    console.log("error in getweather ",e);
}

};

/* Function to GET Web API Data*/
const getWeather = async(zip)=>{
    
    try{
        let answer = await fetch(baseUrl+zip+',&appid='+apiKey)
        let weather = await answer.json();
        return weather;
    }catch(error){
        console.log("error in getWeather from API" , error);
    }

}

/* Function to POST data */
const postData = async ( url = '', data = {})=>{
        const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(data), 
    });

    try {
        const newData = await response.json();
            return newData;
    }catch(error) {
        console.log("error", error);
    }
}



/* Function to GET Project Data */
const getData = async(url)=>{

    const response = await fetch(url);

    try {
        const newData = await response.json();
        // console.log(newData);
            return newData;
    }catch(error) {
        console.log("error in getData", error);
    }


}


const UpdateUI = async()=>{

    try{
    let data = await getData(URL+"/all");
    document.querySelector('#date').innerHTML = data.date;
    document.querySelector('#temp').innerHTML = data.temperature;
    document.querySelector('#content').innerHTML = data.feelings;
    }catch(e){
        console.log(e);
    }

}

