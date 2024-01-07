<!-- src/components/WeatherForecast.vue -->
<template>
  <div class="container mt-2">
    <div class="row w-100">
      <h2>5-Day Forecast</h2>
      <div class="row">
        <div class="col-md-4 m-1" v-for="(time, index) in forecast.time" :key="index">
          <div class="card p-4">
            <p>{{ dateOf(time) }}</p>
            <p class="text-center">{{ getWeatherDescription(forecast.weather_code[index]) }}</p>
            <p>{{ getFloorOrCeil(forecast.apparent_temperature_min[index])}}°C/
            {{ getFloorOrCeil(forecast.apparent_temperature_max[index])}}°C</p>
          </div>
        </div>
      </div>
    </div>
  </div>
    <!-- <div class="card">
      <div class="card-body">
        <h2 class="card-title">5-Day Forecast</h2>
        <ul class="list-group">
          <li class="list-group-item" v-for="(time, index) in forecast.time" :key="index">
            ({{ dateOf(time) }}){{ forecast.apparent_temperature_max[index]}}°C
          </li>
        </ul>
      </div>
    </div> -->
  </template>
  
  <script>
  import {floorOrCeil, weatherDescription } from '../assets/js/main.js';
  export default {
    props: ['forecast'],
    data() {
        return {
        daysOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        };
    },
    methods: {
      dateOf(date) {
        // Create a Date object from the date string
        const currentDate = new Date();
        const dateString = new Date(date);
        // console.log(currentDate);
        // console.log(dateString);

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
    },
    // computed: {
    //     dateObject() {
    //     // Create a Date object from the date string
    //     return new Date(this.dateString);
    //     },
    //     dayOfWeekString() {
    //     // Get the day of the week as a string
    //     return this.daysOfWeek[this.dateObject.getDay()];
    //     },
    //     dayOfMonth() {
    //     // Get the day of the month
    //     return this.dateObject.getDate();
    //     }
    // }
  };
  
  </script>
  
  <style scoped>
 
  </style>
  