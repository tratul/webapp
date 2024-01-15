<!-- src/components/CitySearch.vue -->
<template>
    <div class="p-1 bg-light rounded rounded-pill shadow-sm my-4">
      <div class="input-group">
        <input id="cityInput" class="form-control border-0 bg-light" placeholder="Please Enter The City Name" v-model="inputValue" @input="liveSearch" />
        <!-- <button class="bg-transparent border-0 me-2" @click="currentLocation()">
          <font-awesome-icon :icon="['fas', 'fa-location-dot']" />
        </button> -->
        <div v-if="showPopup" class="popup-results mt-5">
          <div class="p-3" v-for="result in searchResults" :key="result.id" @click="selectCity(result)">
            {{ result.name }}, {{ result.country }}
            <button class="btn btn-outline-primary btn-sm ms-3" @click="addToFavorites(result)">Add to Favorites</button>
          </div>
          <div class="row card border-1 p-2 header bg-secondary text-white">
            <h2>Favourite list</h2>
          </div>
          <div class="p-3" v-for="favorite in favorites" :key="favorite" @click="selectCity(favorite)">
            {{ favorite.name }}, {{ favorite.country }}
            <button class="btn btn-outline-danger btn-sm ms-3" @click="removeFavorite(favorite)">Remove From Favorites</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
<script>
  // import { library } from '@fortawesome/fontawesome-svg-core'
  // import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  // import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
  // library.add(faLocationDot)
  export default {
    // components: {
    //   FontAwesomeIcon,
    // },
    props: {
      cityName: String,
      searchResults: Array,
      showPopup: Boolean,
      favorites: Array,
    },
    data() {
      return {
        inputValue: this.cityName,
      };
    },
    methods: {
      // currentLocation() {
      //   this.$emit('currentLocation');
      // },
      searchCity() {
        this.$emit('searchCity');
      },
      liveSearch() {
        this.$emit('liveSearch', this.inputValue);
      },
      closePopup() {
        this.$emit('closePopup');
      },
      selectCity(city) {
        console.log(city);
        this.inputValue = city.name;
        this.$emit('selectCity', city);
      },
      addToFavorites(cityName) {
        this.$emit('addToFavorites', cityName);
      },
      removeFavorite(cityName) {
        this.$emit('removeFavorite', cityName);
      },
    },
  };
  </script>
  
<style scoped>
  @import '../assets/css/component.css';
</style>
  