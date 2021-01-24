/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+ 1 +'.'+ d.getDate()+'.'+ d.getFullYear();

// select generate btn
const btn = document.getElementById('generate');

// zip code field
const zipCode = document.getElementById('zip');

// api url endpoint, key, and call url
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=';
// note temprature date found in ( data.main.temp )

/* Event listener to add function to existing HTML DOM element */
btn.addEventListener('click', generate);

/**
 * Main Functions
 */
function generate() {
    // get user feelings
    const feelings = document.getElementById('feelings').value;
    // get zip code first
    if(zipCode.value === '') { // if user did enter a zip code
        alert('please enter zip code value first!');
    } else {
        
        // get api Data
        getApiData()
        .then((data)=> {
            // post date to server
            postData('/data', {temp: data.main.temp, date: newDate, feelings: feelings}).then(()=> {
                // update the ui
                updateUi();
            })
        })

    }

}

/* Function to GET Web API Data*/
const getApiData = async ()=> {
    // fetch data from api (await)
    let url = baseUrl + zipCode.value + apiKey + '&units=metric';
    const request = await fetch(url);
    try {
        // convert json data and return it to be used
        const response = await request.json();
        return response; // return the data

    } catch (error) {
        // log the error message
        console.log('Cannot get data because: ' + error);
    }
};
 
/* Function to POST data to server */
const postData = async (url='', data = {})=> {
    // post request method, credentials, headers, and body using fetch
    fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            "Content-Type" : 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        return;
    } catch (error) {
        // log the error message
        console.log('Cannot post because: ' + error);
    }
}

/* Function to update the Ui with Project Data using GET request */
const updateUi = async ()=>{
    // fetch request
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        document.getElementById('date').innerHTML = 'Date: ' + allData.date;
        document.getElementById('temp').innerHTML = 'Temp: ' + allData.temp + '&#8451';
        document.getElementById('content').innerHTML = 'Feelings: ' + allData.feelings;

    } catch (error){
        console.log("Can't update UI because: " + error);
    }

}
