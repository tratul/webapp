<!-- OpenMeteoComponent.vue -->
<template>
    <div>
      <h1>Open Meteo Data</h1>
      <ul>
        <li v-for="(time, index) in weatherData.time" :key="index">
          {{ time }}: {{ weatherData.temperature_2m[index] }}°C
        </li>
        <!-- {{ weatherData }} -->
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        weatherData: [],
      };
    },
    mounted() {
      this.fetchWeatherData();
    },
    methods: {
      async fetchWeatherData() {
        try {
          const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
            params: {
              latitude: 52.52,  //  latitude
              longitude: 13.41,  // longitude
              hourly : "temperature_2m"
            },
          });
  
          this.weatherData = response.data.hourly;
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  
  </style>
  

  