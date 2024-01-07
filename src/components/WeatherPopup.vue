
<template>
    <div class="popup-overlay">
      <div class="popup">
        <button class="close-btn" @click="closePopup">&times;</button>
        <h2>Favorites</h2>
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
    methods: {
      closePopup() {
        this.$emit('closePopup');
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add styles for the Popup component */
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .popup {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    width: 300px;
  }
  
  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 20px;
    cursor: pointer;
    background: none;
    border: none;
    color: #333;
  }
  </style>
  