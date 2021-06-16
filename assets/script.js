var searchT = document.getElementById('citysearch');
var searchB = document.getElementById('search-button');
var tempSpan = document.getElementById('currentTemp');
var windSpan = document.getElementById('currentWind');
var humidSpan = document.getElementById('currentHumidity');
var uvSpan = document.getElementById('uvSpan');
var ftemp = document.getElementsByClassName('ftemp');
var fwind = document.getElementsByClassName('fwind');
var fhum = document.getElementsByClassName('fhum');
var fuv = document.getElementsByClassName('currentUv');
var dateEl = document.getElementsByClassName('fdate');
var currentCity = searchT.value;
var historylistEl = document.getElementById('historylist');

function getWeather(city) {
  var city = searchT.value;
  fetch(
    'https://api.openweathermap.org/data/2.5/weather?q=' +
      city +
      '&units=imperial&appid=822885dbd372247ac84e0b86f3009f81'
  )
    .then((response) => response.json())
    .then((data) => {
      // fetch lon and lat used for onecall fetch

      var lon = data.coord.lon;
      var lat = data.coord.lat;

      fetch(
        'https://api.openweathermap.org/data/2.5/onecall?lat=' +
          lat +
          '&lon=' +
          lon +
          '&units=imperial&exclude=minutely,hourly,alerts,minutely&appid=822885dbd372247ac84e0b86f3009f81'
      )
        .then((response) => response.json())
        .then((data) => {
          getForecast(data);
        });
    });
  storecity();
  showcity();
}

searchB.addEventListener('click', getWeather);

function getForecast(data) {
  for (var i = 0; i < 6; i++) {
    fuv[0].textContent = data.daily[1].uvi;
    ftemp[i].textContent = data.daily[i].temp.day + '°F';
    fwind[i].textContent = data.daily[i].wind_speed + ' mph';
    fhum[i].textContent = data.daily[i].humidity + ' %';
    dateEl[i].textContent = day;
    dateEl[0].textContent = currentCity + ' ' + tday;

    var currentCity = searchT.value;
    var tday = moment().format('MM/DD/YYYY');
    var day = moment().add(i, 'days').format('MM/DD/YYYY');
  }
}
function storecity() {
  var cityX = searchT.value;
  var cities = JSON.parse(localStorage.getItem('city')) || [];
  cities.push(cityX);
  localStorage.setItem('city', JSON.stringify(cities));
}
function showcity() {
  var cities = JSON.parse(localStorage.getItem('city')) || [];
  historylistEl.innerHTML = '';
  for (var i = 0; i < cities.length; i++) {
    var li = document.createElement('li');
    li.textContent = cities[i];
    li.setAttribute('data-city', cities[i]);
    historylistEl.append(li);
  }
}

showcity();
