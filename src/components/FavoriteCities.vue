<!-- src/components/FavoriteCities.vue -->
<template>
    <div class="card">
      <div class="card-body">
        <h2 class="card-title">Favorites</h2>
        <ul class="list-group">
          <li class="list-group-item" v-for="favorite in favorites" :key="favorite">
            {{ favorite }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['favorites'],
  };
  </script>
  
  <style scoped>
  
  </style>
  