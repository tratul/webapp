<template>
  <div class="container hourly-container py-3">
    <div class="row">
      <div class="col-md-1 bg-white d-flex flex-column justify-content-center">
      <button class="bg-transparent border-0"  @click="prevSlide">
        <font-awesome-icon class="custom-icon" :icon="['fas', 'fa-less-than']" />
      </button>
      </div>
      <div class="col-md-10 my-2">
        <div class="slider-container">
          <div class="slider" ref="slider">
            <div v-for="(time, index) in forecast_hourly.time" :key="index" class="slider-item">
              <div class="card col-xs-2 me-2 p-4">
                <p>{{ getFloorOrCeil(forecast_hourly.temperature_2m[index]) }}°C</p>
                <p>{{ formatTime(time) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-1 bg-white d-flex flex-column justify-content-center">
        <button class="bg-transparent border-0" @click="nextSlide">
          <font-awesome-icon class="custom-icon" :icon="['fas', 'fa-greater-than']" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {floorOrCeil } from '../assets/js/component.js';
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faGreaterThan, faLessThan } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faGreaterThan, faLessThan)
// library.add(lessThan)

export default {
  components: {
    FontAwesomeIcon,
  },
  props: ['forecast_hourly'],
  methods: {
    formatTime(dateString) {
      const date = new Date(dateString);
      const hours = date.getHours();
      let ampm = 'am';

      if (hours >= 12) {
        ampm = 'pm';
      }

      const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
      const formattedTime = `${formattedHours} ${ampm}`;
      return formattedTime;
    },
    getFloorOrCeil(number) {
      return floorOrCeil(number);
    },
    prevSlide() {
      if (this.currentSlide > 0) {
        this.currentSlide--;
        this.updateSliderPosition();
      }
    },
    nextSlide() {
      if (this.currentSlide < this.totalSlides - 1) {
        this.currentSlide++;
        this.updateSliderPosition();
      }
    },
    updateSliderPosition() {
      const newPosition = -this.currentSlide * (this.slideWidth + this.slideMargin);
      this.$refs.slider.style.transform = `translateX(${newPosition}px)`;
    },
  },
  data() {
    return {
      currentSlide: 0,
      totalSlides: 0,
      slideWidth: 0,
      slideMargin: 10, // Adjust this value based on desired margin between cards
    };
  },
  mounted() {
    this.totalSlides = this.forecast_hourly.time.length;
    this.slideWidth = this.$refs.slider.clientWidth / 4; // Adjust the divisor based on the number of cards per slide
  },
};
</script>

<style scoped>
  @import '../assets/css/component.css';
</style>
