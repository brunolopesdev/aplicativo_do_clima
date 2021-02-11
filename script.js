const api = {
    key: "4d88d5df8048e49a663510eea9c8bfd3",
    base: "https://api.openweathermap.org/data/2.5/",
    lang: "pt"
}


const btn = document.querySelector(".btn");
btn.addEventListener("click", getInput);

function getInput (event) {
    
    if (event.type == "click") {
        getData(search.value);
        console.log(search.value);
    }
}
const search = document.querySelector(".search");
search.addEventListener("keypress", enter)
function enter(event){
    key = event.keyCode
    if(key === 13){
        getInput(search.value)
    }
}
function getData () {
    fetch(`${api.base}weather?q=${search.value}&units=metric&lang=${api.lang}&appid=${api.key}`)
        .then(response => {
            return response.json();
        }).then(displayData);
        
}

function displayData (response) {
    //console.log(response);
    if (response.cod == "404"){
        const error = document.querySelector(".error")
        error.textContent = "Por favor, digite a cidade corretamente"
        search.value = " "
    } else {
        const city = document.querySelector(".cidade")
        city.innerText = `${response.name}, ${response.sys.country}`

        const today = new Date()
        const date = document.querySelector(".data")
        date.innerText = dateFunction(today)

        const temp = document.querySelector(".temp")
        temp.innerHTML = `Temperatura: ${Math.round(response.main.temp)} <span>°C</span>`

        const weather = document.querySelector(".clima")
        weather.innerText = `Tempo: ${response.weather[0].description}`

        const weatherIcon = document.querySelector(".icone-clima");
        const iconURL = "http://openweathermap.org/img/w/";
        weatherIcon.src = iconURL + response.weather[0].icon + ".png";

        search.value = "";
    }
    
}

function dateFunction(d){
    let months = ["Jan", "Fev", "Mar", "Abr", "Maio", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    let days = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()

    return `${day}, ${date}, ${month}, ${year} `
}