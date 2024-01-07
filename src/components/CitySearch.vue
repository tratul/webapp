<!-- src/components/CitySearch.vue -->
<template>
    <!-- <div class="form-group">
      <label for="cityInput">Search for a city:</label>
      <div class="input-group">
        <input id="cityInput" class="form-control" v-model="cityName" @input="liveSearch">
        <div class="input-group-append">
          <button class="btn btn-primary" @click="searchCity">Search</button>
        </div>
      </div>
    </div> -->

    <!-- <div class="p-1 bg-light rounded rounded-pill shadow-sm mb-4">
      <div class="input-group">
        <input type="search" placeholder="What're you searching for?" aria-describedby="button-addon1" class="form-control border-0 bg-light" v-model="cityName" @input="liveSearch">
        <div class="input-group-append">
          <button id="button-addon1" type="submit" class="btn btn-link text-primary" @click="searchCity"><i class="fa fa-search"></i></button>
        </div>
      </div>
    </div> -->

    <div class="p-1 bg-light rounded rounded-pill shadow-sm my-4">
      <!-- <label for="cityInput">Search for a city:</label> -->
      <div class="input-group">
        <input id="cityInput" class="form-control border-0 bg-light" placeholder="Please Inter The City Name" v-model="inputValue" @input="liveSearch" />
        <div v-if="showPopup" class="popup-results mt-5">
          <div v-for="result in searchResults" :key="result.id" @click="selectCity(result)">
            {{ result.name }}, {{ result.country }}
            <button class="btn btn-primary btn-sm" @click="addToFavorites(result)">Add to Favorites</button>
          </div>
          <p>Favourite list</p>
          <div v-for="favorite in favorites" :key="favorite" @click="selectCity(favorite)">
            {{ favorite.name }}, {{ favorite.country }}
            <button class="btn btn-danger btn-sm" @click="removeFavorite(favorite)">Remove From Favorites</button>
          </div>
        </div>
      </div>
      <!-- <button @click="searchCity">Search</button> -->
    </div>
  </template>
  
  <script>
  export default {
    // props: [],
    // data() {
    //   return {
    //     cityName: '',
    //   };
    // },
    // methods: {
    //   searchCity() {
    //     this.$emit('search', this.cityName);
    //   },
    //   liveSearch() {
    //     this.$emit('liveSearch', this.cityName);
    //   },
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
/* Add styles for the CitySearch component */
.form-control:focus {
  box-shadow: none;
}

.form-control-underlined {
  border-width: 0;
  border-bottom-width: 1px;
  border-radius: 0;
  padding-left: 0;
}
.popup-results {
  position: absolute;
  z-index: 1;
  width: 100%;
  background-color: #fff;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  max-height: 400px;
  overflow-y: auto;
}

.popup-results div {
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #ccc;
}

.popup-results div:hover {
  background-color: #f0f0f0;
}

.popup-results button {
  margin-left: 10px;
}
</style>
  