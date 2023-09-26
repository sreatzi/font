<template>
        <div class="zi">
      <table>
        <tr>
        <td v-for="(link1, index) in link1" :key="index" :href="'#' + link1" @click="selectComponent(6)">
            <a href="#"> {{ link1 }}</a> 
        </td>

        <td v-for="(link2, index) in link2" :key="index" :href="'#' + link2" @click="selectComponent(7)">
        <a href="#"> {{ link2 }}</a> 
        </td>
      </tr>
      </table>
    </div>
    <component :is="selectedComponent"></component>
</template>

<style>

.zi table{
    margin-top: 5px;
    border-collapse: collapse;
  }
  .zi td
   {
   color: rgb(164, 164, 164);
    border: 1px solid rgb(164, 164, 164);
    padding: 8px;
  }
</style>
<script>
import Vue from 'vue';
import VueRouter from 'vue-router';
import ThreePage from "@/components/threePage.vue";//正常显示 不会影响
import FourPage from "@/components/fourPage.vue";
import {components} from '@/views/SonMetPage.vue'

export default {

components,
  data() {
    return {
      link2: [],
      link1: [],
    
    };
  },
  mounted() {
    this.link1 = ['转录计划管理'];
    this.link2 = ['转录计划管理'];
  },
  
  methods: {
    selectComponent(index) {
    
      switch (index) {
          case 6:
    console.log(index);
          this.selectedComponent = 'ThreePage';
          break;
          case 7:
          this.selectedComponent = 'FourPage';
          break;
      }
    }
  }
}


</script>