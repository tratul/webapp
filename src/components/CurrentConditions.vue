<!-- src/components/CurrentConditions.vue -->
<template>
    <div class="container mt-3">
      <div class="row card card-rounded-5 pt-2 bg-light">
        <h2>Current Conditions</h2>
      </div>
      <div class="row mt-3">
        <div class="col-md-4 my-2">
          <div class="card">
              <h2>Wind</h2>
              <h2>
                  {{ getFloorOrCeil(forecast_hourly.wind_gusts_10m[0]) }} km/h
              </h2>
          </div>
        </div>
        <div class="col-md-4 my-2">
          <div class="card">
              <h2>Humidity</h2>
              <h2>
                  {{ getFloorOrCeil(forecast_hourly.relative_humidity_2m[0]) }} %
              </h2>
          </div>
        </div>
        <div class="col-md-4 my-2">
          <div class="card">
              <h2>UV Index</h2>
              <h2>
                  {{ getFloorOrCeil(forecast_hourly.direct_radiation[0]) }} 
              </h2>
          </div>
        </div>
        <div class="col-md-4 my-2">
          <div class="card">
              <h2>Pressure</h2>
              <h2>
                  {{ getFloorOrCeil(forecast_hourly.pressure_msl[0]) }} 
              </h2>
          </div>
        </div>
        <div class="col-md-8 col-sm-4 my-2">
          <div class="card">
              <h2>Sunrise & Sunset</h2>
              <h2>
                  Sunrise:  {{ formatTime(forecast.sunrise[0]) }} 
                  Sunset:  {{ formatTime(forecast.sunset[0]) }} 
              </h2>
          </div>
        </div>
      </div>
    </div>
     
    </template>
    
    <script>
    import {floorOrCeil } from '../assets/js/main.js';
    export default {
      props: ['forecast_hourly', 'forecast'],
      methods: {
        getFloorOrCeil(number){
          return floorOrCeil(number);
        },
        formatTime(dateString) {
        const date = new Date(dateString);
        const hours = date.getHours();
        const minutes = date.getMinutes();

        let ampm = 'am';

        if (hours >= 12) {
          ampm = 'pm';
        }

        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

        const formattedTime = `${formattedHours}: ${formattedMinutes} ${ampm}`;
        return formattedTime;
      },
      },
    };
    
    </script>
    
    <style scoped>
   
    </style>
    