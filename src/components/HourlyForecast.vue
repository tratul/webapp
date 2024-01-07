<template>
    <div>
      <div class="hourly-card">
        <div v-for="(time, index) in forecast_hourly.time" :key="index" class="hourly-item">
          <p class="hour">{{ time }}</p>
          <p class="temperature">{{ forecast_hourly.temperature_2m[index] }}°C</p>
          <!-- Add more data fields as needed -->
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['forecast_hourly'],
  };
  </script>
  
  <style scoped>
  .hourly-card {
    display: flex;
    overflow-x: auto; /* Enable horizontal scrolling if the content overflows */
  }
  
  .hourly-item {
    padding: 10px;
    border: 1px solid #ccc;
    margin-right: 10px;
  }
  

  </style>
  