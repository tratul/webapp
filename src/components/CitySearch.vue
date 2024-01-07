<!-- src/components/CitySearch.vue -->
<template>
    <div class="form-group">
      <label for="cityInput">Search for a city:</label>
      <div class="input-group">
        <input id="cityInput" class="form-control" v-model="cityName" @input="liveSearch">
        <div class="input-group-append">
          <button class="btn btn-primary" @click="searchCity">Search</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: [],
    data() {
      return {
        cityName: '',
      };
    },
    methods: {
      searchCity() {
        this.$emit('search', this.cityName);
      },
      liveSearch() {
        this.$emit('liveSearch', this.cityName);
      },
    },
  };
  </script>
  
  <style scoped>
 
  </style>
  