<!-- src/components/WeatherForecast.vue -->
<template>
  <div class="container mt-2">
    <div class="row card card-rounded-5 pt-2 bg-light">
      <h2>5-Day Forecast</h2>
    </div>
    <div class="row mt-3">
      <div class="col-md-4 my-2" v-for="(time, index) in forecast.time" :key="index">
        <div class="card p-4">
          <p>{{ dateOf(time) }}</p>
          <p class="text-center">{{ getWeatherDescription(forecast.weather_code[index]) }}</p>
          <p>{{ getFloorOrCeil(forecast.apparent_temperature_min[index])}}°C/
          {{ getFloorOrCeil(forecast.apparent_temperature_max[index])}}°C</p>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
  import {floorOrCeil, weatherDescription } from '../assets/js/component.js';
  export default {
    props: ['forecast'],
    data() {
        return {
        daysOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        };
    },
    methods: {
      dateOf(date) {
        const currentDate = new Date();
        const dateString = new Date(date);

        if (currentDate.getDay() == dateString.getDay()) {
          return 'Today';
        }
        else{
          return this.daysOfWeek[dateString.getDay()];
        } 
      },
      getFloorOrCeil(number){
        return floorOrCeil(number);
      },
      getWeatherDescription(code){
        return weatherDescription(code);
      }
    }
  };
  
  </script>
  
  <style scoped>
 
  </style>
  