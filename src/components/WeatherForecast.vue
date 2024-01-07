<!-- src/components/WeatherForecast.vue -->
<template>
    <div class="card">
      <div class="card-body">
        <h2 class="card-title">5-Day Forecast</h2>
        <ul class="list-group">
          <li class="list-group-item" v-for="(time, index) in forecast.time" :key="index">
            ({{ dateOf(time) }}){{ forecast.apparent_temperature_max[index]}}°C
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  
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
        const dateString = new Date(date);
        return this.daysOfWeek[dateString.getDay()];
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
  