<template>
    <lay-input v-model="data1" type="number" :max="300" :min="100"></lay-input>
  </template>
  
  <script>
  import { ref } from 'vue'
  
  export default {
    setup() {
  
      const data1 = ref(0);
  
      return {
        data1
      }
    }
  }
  </script>