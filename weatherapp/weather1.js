const container = document.querySelector(".container"),
inputBox = document.querySelector(".input-box"),
infoTxt = inputBox.querySelector(".info-text"),
inputField = inputBox.querySelector("input"),
locationBtn = inputBox.querySelector("button"),
weatherPart = container.querySelector(".weather-part"),
wIcon = container.querySelector(".weather-part img"),
arrowBack = container.querySelector("header i");
let api;
let apikey="1e017866f4de0940a5ea7e287e1ba063"
inputField.addEventListener("keyup" , e =>{
    if(e.key =="Enter" && inputField.value !=""){
        requestApi(inputField.value);
    }
});

locationBtn.addEventListener("click", ()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess ,onError);
    }else{
        alert("Browser not support geolocation api");

    }
});
function requestApi(city){
    
    api =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;
    fetchData();
   
}

function onSuccess(position){
    const{latitude, longitude} = position.coords;
    api =`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apikey}`;
    fetchData();
}
function onError(error){
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}


function fetchData(){
    infoTxt.innerText ="Getting weather details..";
    infoTxt.classList.add("pending");
    fetch(api)
    .then(response =>response.json()).then(result => weatherDetails(result)).catch(()=>{
        infoTxt.innerText ="Something went wrong";
        infoTxt.classList.replace("pending","error");
    });

}
function weatherDetails(info){
    
    if(info.cod =="404"){
        infoTxt.classList.replace("pending", "error");
        infoTxt.innerText = `${inputField.value} isn't a valid city name`;
    }else{
        const city = info.name;
        const country = info.sys.country;
        const {description , id} = info.weather[0];
        const {feels_like,humidity ,temp} = info.main;

        if(id == 800){
            wIcon.src = "Weather Icons/clear.svg";
        }else if(id >= 200 && id<=232){
            wIcon.src ="Weather Icons/storm.svg"
        }else if(id >= 600 && id<=622){
            wIcon.src ="Weather Icons/snow.svg"
        }else if(id >= 701 && id<=781){
            wIcon.src ="Weather Icons/haze.svg"
        }else if(id >= 801 && id<=804){
            wIcon.src ="Weather Icons/cloud.svg"
        }else if((id >= 300 && id<=321) || (id >= 500 && id <= 531)){
            wIcon.src ="Weather Icons/rain.svg"
        }

        container.querySelector(".temperature .temp").innerText = Math.floor(temp);
        container.querySelector(".weather").innerText = description;
        container.querySelector(".location span").innerText = `${city}, ${country}`;
        container.querySelector(".temperature .temp").innerText = temp;
        container.querySelector(".temperature .temp-2").innerText = Math.floor(feels_like);
        container.querySelector(".humidity span").innerText = `${humidity}%`;
        infoTxt.classList.remove("pending", "error");
        infoTxt.innerText="";
        inputField.value ="";
        
        container.classList.add("active");

    }
    
}

arrowBack.addEventListener("click", ()=>{
    container.classList.remove("active");
});
