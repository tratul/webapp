<!-- src/App.vue -->
<template>
  <section :style="{ backgroundImage: `url(${backgroundImage})`}" class="webapp">
    <div id="app" class="container mt-4">
      <div class="card card-rounded p-2 bg-light">
        <h1 class="my-2 fw-bold">Weather App</h1>
      </div>
      <CitySearch
      :cityName="cityName"
      :searchResults="searchResults"
      :showPopup="showPopup"
      :favorites="favorites"
      @searchCity="searchCity"
      @liveSearch="liveSearch"
      @selectCity="selectCity"
      @addToFavorites="addToFavorites"
      @removeFavorite="removeFavorite"
      @closePopup="closePopup"
    />
      <CityWeather v-if="currentWeather" :weather="currentWeather" @addToFavorites="addToFavorites" />
      <HourlyForecast v-if="forecast_hourly" :forecast_hourly="forecast_hourly" />
      <WeatherForecast v-if="forecast" :forecast="forecast" />
      <CurrentConditions v-if="forecast_hourly" :forecast_hourly="forecast_hourly" :forecast="forecast" />
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import CitySearch from './components/CitySearch.vue';
import CityWeather from './components/CityWeather.vue';
import HourlyForecast from './components/HourlyForecast.vue';
import WeatherForecast from './components/WeatherForecast.vue';
import CurrentConditions from './components/CurrentConditions.vue';

export default {
  components: {
    CitySearch,
    CityWeather,
    HourlyForecast,
    WeatherForecast,
    CurrentConditions,
  },
  data() {
    return {
      cityName: '',
      favorites: this.loadFavorites(),
      // currentWeather: null,
      forecast_hourly: null,
      forecast: null,
      showPopup: false,
      searchResults: [],
      backgroundImage: require('@/assets/images/day.jpg'),
    };
  },
  methods: {
    // currentLocation(){
    //   if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(
    //       (position) => {
    //         const latitude = position.coords.latitude;
    //         const longitude = position.coords.longitude;
    //         this.getWeatherByCoordinates(latitude, longitude);
    //       },
    //       (error) => {
    //         console.error("Error getting current location:", error);
    //         this.error = "Error getting current location";
    //       }
    //     );
    //   } else {
    //     this.error = "Geolocation is not supported by this browser.";
    //   }
    // },
    searchCity() {
      this.fetchWeatherData();
      this.closePopup();
    },
    async liveSearch(city) {
      try {
        const response = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=5&language=en&format=json`);
        this.searchResults = response.data.results;
        this.showPopup = this.searchResults.length > 0;
      } catch (error) {
        console.error('Error fetching live search results:', error);
      }
    },
    selectCity(city) {
      this.cityName = city.name;
      this.closePopup();
      this.fetchWeatherData();
    },
    addToFavorites(cityName) {
      if (!this.favorites.includes(cityName)) {
        this.favorites.push(cityName);
        this.saveFavorites();
      }
    },
    removeFavorite(city) {
      // Find the index of the city in favorites array
      const index = this.favorites.findIndex(favorite => favorite.id === city.id);

      if (index !== -1) {
        // Remove the city from favorites array
        this.favorites.splice(index, 1);
        // Update local storage
        this.saveFavorites();
      }
    },

    loadFavorites() {
      const storedFavorites = localStorage.getItem('favorites');
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    },
    openPopup() {
      this.showPopup = true;
    },
    closePopup() {
      this.showPopup = false;
    },
    fetchWeatherData() {
      // if (this.cityName.trim() === '') return;
      const location = this.cityName.trim() !== '' ? this.cityName : 'current';

      axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1&language=en&format=json`)
        .then(response => {
          const result = response.data.results[0];
          if (result) {
            const { latitude, longitude } = result;

            axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,apparent_temperature,weather_code,relative_humidity_2m,direct_radiation,pressure_msl,wind_gusts_10m,is_day&forecast_hours=24`)
              .then(weatherResponse_hourly => {
                this.forecast_hourly = weatherResponse_hourly.data.hourly;
                this.currentWeather = {
                  city: result.name,
                  country: result.country,
                  temperature: weatherResponse_hourly.data.hourly.temperature_2m[0], //  current temperature
                  apparent_temperature: weatherResponse_hourly.data.hourly.apparent_temperature[0],
                  weather_code: weatherResponse_hourly.data.hourly.weather_code[0],   
                };
                // console.log(this.forecast_hourly )
                if(weatherResponse_hourly.data.hourly.is_day[0] == 0){
                  this.backgroundImage = require('@/assets/images/night.jpg');
                }else{
                  this.backgroundImage = require('@/assets/images/day.jpg');
                }
              })
              .catch(error => {
                console.error('Error fetching weather data of hourly:', error);
              });

            axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=apparent_temperature_max,apparent_temperature_min,weather_code,sunrise,sunset&forecast_days=5`)
              .then(weatherResponse => {
                this.forecast = weatherResponse.data.daily;
                const currentWeatherOfDay = {
                  ...this.currentWeather,
                  apparent_temperature_max: weatherResponse.data.daily.apparent_temperature_max[0], 
                  apparent_temperature_min: weatherResponse.data.daily.apparent_temperature_min[0], 
                };
                this.currentWeather = currentWeatherOfDay;
              })
              .catch(error => {
                console.error('Error fetching weather data of 5 days:', error);
              });
           

          } else {
            console.error('City not found');
          }
        })
        .catch(error => {
          console.error('Error fetching city data:', error);
        });
        console.log(this.currentWeather);
    },
    saveFavorites() {
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
    },
  },
};
</script>

<style>
  @import './assets/css/web-app.css';
</style>
