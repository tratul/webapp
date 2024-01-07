<template>
    <div>
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <!-- <div class="carousel slide multi-item-carousel" id="theCarousel">
              <div class="carousel-inner">
                <div class="item" v-for="(time, index) in forecast_hourly.time" :key="index">
                  <div class="col-xs-4">
                    <p>{{ formatTime(time) }}</p>
                  </div>
                </div>
              </div>
            </div> -->
            <div id="myCarousel" class="carousel slide" data-ride="carousel">
              <div class="carousel-inner">
                <div v-for="(time, index) in forecast_hourly.time" :key="index" :class="{ 'forecast_hourly': true, 'active': index === 0 }">
                  <!-- <img :src="item.image" class="d-block w-100" :alt="'Item ' + (index + 1)"> -->
                  <div class="card col-xs-4 me-2 p-4">
                    <p>{{ getFloorOrCeil(forecast_hourly.temperature_2m[index]) }}°C</p>
                    <p >{{ formatTime(time) }}</p>
                  </div>
                </div>
              </div>
              <a class="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only"></span>
              </a>
              <a class="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only"></span>
              </a>
            </div>
          </div>
        </div>
        
        <!-- <div v-for="(time, index) in forecast_hourly.time" :key="index" class="hourly-item">
          <p class="hour">{{ time }}</p>
          <p class="temperature">{{ forecast_hourly.temperature_2m[index] }}°C</p>
        </div> -->
      </div>
    </div>
  </template>
  
  <script>
  import {floorOrCeil} from '../assets/js/main.js';
  export default {
    props: ['forecast_hourly'],
    methods: {
      formatTime(dateString) {
        const date = new Date(dateString);
        const hours = date.getHours();
        // const minutes = date.getMinutes();

        let ampm = 'am';

        if (hours >= 12) {
          ampm = 'pm';
        }

        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        // const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

        const formattedTime = `${formattedHours} ${ampm}`;
        return formattedTime;
      },
      getFloorOrCeil(number){
        return floorOrCeil(number);
      }
      
    }
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

  #myCarousel {
    margin: auto;
    overflow: hidden;
    max-width: 100%; 
  }

  /* Custom styles for the carousel */
  .carousel-inner {
    display: flex;
    flex-wrap: nowrap;
  }

  .carousel-item {
    width: 100%; 
    margin-right: 10px;
  }
    
  .time {
    font-size: 18px;
    text-align: center;
    margin-top: 20px;
  }
  </style>
  