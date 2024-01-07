<!-- src/App.vue -->
<template>
  <div id="app" class="container mt-4">
    <h1 class="mb-4">Weather App</h1>
    <CitySearch @search="handleSearch" @liveSearch="handleLiveSearch" />
    <CityWeather v-if="currentWeather" :weather="currentWeather" @addToFavorites="addToFavorites" />
    <HourlyForecast v-if="forecast_hourly" :forecast_hourly="forecast_hourly" />
    <WeatherForecast v-if="forecast" :forecast="forecast" />
    <FavoriteCities :favorites="favorites" />
  </div>
</template>

<script>
import axios from 'axios';
import CitySearch from './components/CitySearch.vue';
import CityWeather from './components/CityWeather.vue';
import HourlyForecast from './components/HourlyForecast.vue';
import WeatherForecast from './components/WeatherForecast.vue';
import FavoriteCities from './components/FavoriteCities.vue';

export default {
  components: {
    CitySearch,
    CityWeather,
    HourlyForecast,
    WeatherForecast,
    FavoriteCities,
  },
  data() {
    return {
      cityName: '',
      favorites: [],
      currentWeather: null,
      forecast_hourly: null,
      forecast: null,
    };
  },
  methods: {
    handleSearch(city) {
      this.cityName = city;
      this.fetchWeatherData();
    },
    handleLiveSearch(city) {
      this.cityName = city;
      this.fetchWeatherData();
    },
    fetchWeatherData() {
      if (this.cityName.trim() === '') return;

      axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${this.cityName}&count=1&language=en&format=json`)
        .then(response => {
          const result = response.data.results[0];
          if (result) {
            const { latitude, longitude } = result;

            axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`)
              .then(weatherResponse_hourly => {
                this.forecast_hourly = weatherResponse_hourly.data.hourly;
                console.log(this.forecast_hourly )
              })
              .catch(error => {
                console.error('Error fetching weather data of hourly:', error);
              });

            axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=apparent_temperature_max&forecast_days=5`)
              .then(weatherResponse => {
                this.currentWeather = {
                  city: result.name,
                  temperature: weatherResponse.data.daily.apparent_temperature_max[0], //  current temperature
                  description: weatherResponse.data.daily.apparent_temperature_max[0], // data structure
                };
                this.forecast = weatherResponse.data.daily;
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
    },
    addToFavorites() {
      if (this.currentWeather) {
        this.favorites.push(this.currentWeather.city);
      }
    },
  },
};
</script>

<style>
#app {
  text-align: center;
  margin-top: 20px;
}

h1 {
  font-size: 2em;
  margin-bottom: 20px;
}
</style>
