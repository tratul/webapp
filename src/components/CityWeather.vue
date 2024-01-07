<!-- src/components/CityWeather.vue -->
<template>
    <div class="card">
      <div class="card-body">
        <h2 class="card-title">{{ weather.city }}</h2>
        <p class="card-text">Temperature: {{ weather.temperature }}°C</p>
        <p class="card-text">Description: {{ weather.description }}</p>
        <button class="btn btn-primary" @click="addToFavorites">Add to Favorites</button>
      </div>
    </div>
  </template>
  
  
  <script>
  export default {
    props: ['weather'],
    methods: {
      addToFavorites() {
        this.$emit('addToFavorites');
      },
    },
  };
  </script>
  
  <style scoped>

  </style>
  