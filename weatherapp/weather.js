window.addEventListener('load', ()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const apikey="1e017866f4de0940a5ea7e287e1ba063";

            const api=`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apikey}`
            
            fetch(api)
            .then(response =>{
                return response.json()
            })
            .then(data =>{
                console.log(data);
                const temperature = data.main.temp;
                const summary = data.weather[0].description;
                const icon = data.weather[0].icon;
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent=summary;
                locationTimezone.textContent=data.name;

                setIcons(icon, document.querySelector('.icon'))

            })
        });

        
        

    }

    function setIcons(icon,iconId){
        const skycons = new Skycons({color: "white"});
        // const currentIcon = icon.replace(/-/g,"_").toUpperCase();
        Skycons.play();
        return Skycons.set(iconId, icon);
    }
});