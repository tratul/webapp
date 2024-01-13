<!-- src/components/CityWeather.vue -->
<template>
  <div class="container mt-2">
    <div class="row weather-city p-3">
      <h2 class="py-3">{{ weather.city }}, {{ weather.country }}</h2>
      <!-- <h2>Now</h2> -->
      <div class="col-md-6 sm">
        <h1>{{ getFloorOrCeil(weather.temperature) }}°C</h1>
        <p>High: {{ getFloorOrCeil(weather.apparent_temperature_max) }} °C . Low: {{ getFloorOrCeil(weather.apparent_temperature_min) }} °C</p>
      </div>
      <div class="col-md-6 sm pt-3">
        <p>{{ getWeatherDescription(weather.weather_code) }}</p>
        <p>Feels like {{ getFloorOrCeil(weather.apparent_temperature) }} °C</p>
      </div>
        <!-- <h2 class="card-title">{{ weather.city }}</h2>
        <p class="card-text">Temperature: {{ weather.temperature }}°C</p>
        <p class="card-text">Description: {{ weather.description }}</p>
        <button class="btn btn-primary" @click="addToFavorites">Add to Favorites</button> -->
    </div>
  </div>
</template>
  
  
  <script>
  import {floorOrCeil, weatherDescription } from '../assets/js/main.js';
  export default {
    props: ['weather', 'forecast'],
    methods: {
      addToFavorites() {
        this.$emit('addToFavorites');
      },
      getFloorOrCeil(number){
        return floorOrCeil(number);
      },
      getWeatherDescription(code){
        return weatherDescription(code);
      }
    },
  };
  </script>
  
  <style scoped>
  .weather-city{
    border-radius: 16px;
    box-shadow: none;
    background: #fff;
    transform-origin: center;
    transition: all 0.4s ease-in-out;
    overflow: hidden;
  }
  </style>
  