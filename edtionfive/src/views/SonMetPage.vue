<template>
  <div>
    <div id="shouye">
      <nav class="navbar-word-1">
        <p v-for="(word1, index) in word1List" :key="index">
          <a :href="'#' + word1">{{ word1 }}</a>
        </p>
      </nav>
    </div>
    <div id="welcome">
      <nav class="navbar-word-2">
       
          <div class="flex-box">
            <div class="content-1"></div>
            <p v-for="(work2, index) in word2List" :key="index">
            <a :href="'#' + work2" style=" color: rgb(100, 100, 100);  font-size: 20px;">欢迎光临{{ work2 }}</a>
            </p>
          </div>
   
       
      </nav>
    </div>

    <div id="app">
      <nav class="navbar">
        <ul>
          <li v-for="(link, index) in links" :key="index">
            <a :href="'#' + link" @click=" selectComponent(index)">{{ link }}</a>
          </li>
        </ul>
      </nav>
    </div>
    <div class="zi" id="zi">
      <table>
        <tr>
        <td v-for="(link1, index) in link1" :key="index" :href="'#' + link1" @click="selectComponent1(1)">
            <a href="#" class="zi1" id="zi1"> {{ link1 }}</a> 
        </td>

        <td v-for="(link2, index) in link2" :key="index" :href="'#' + link2" @click="selectComponent1(2)">
        <a href="#" class="zi1" id="zi2"> {{ link2 }}</a> 
        </td>
      </tr>
      </table>
    </div>

    <div class="zis" id="zis">
      <table>
        <tr>
        <td v-for="(link3, index) in link3" :key="index" :href="'#' + link3" @click="selectComponent2(1)">
            <a href="#" class="zi1" id="zi3"> {{ link3 }}</a> 
        </td>

        <td v-for="(link4, index) in link4" :key="index" :href="'#' + link4" @click="selectComponent2(2)">
        <a href="#" class="zi1" id="zi4"> {{ link4 }}</a> 
        </td>
      </tr>
      </table>
    </div>
    <div id="co-box">
      <div class="con-tain">
        <div class="w-box">
          <component :is="selectedComponent"></component>
        </div>
      </div>
    </div>
    <div id="word-box">
      <div class="con-tain-1">
        <p>管理员电话:028-66666666</p>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import VueRouter from 'vue-router';

import NarPage from '@/components/narPage.vue'
import {data1} from '@/components/globel/glober.ts'
import TwoPage from "@/components/twoPage.vue";//正常显示
import FivePage from "@/components/fivePage.vue";//正常显示 不会影响
import SixPage from "@/components/sixPage.vue";//正常显示 不会影响
import ThreePage from "@/components/threePage.vue";//正常显示 不会影响
import FourPage from "@/components/fourPage.vue";//正常显示 不会影响
import onefirstPage from "@/components/1+2firstPage.vue";//正常显示 不会影响
import twoSPage from "@/components/1+2twoPage.vue";//正常显示 不会影响
export default {
  components: {
    TwoPage,
    FivePage,
    SixPage,
    NarPage,
    ThreePage,
    FourPage,
    onefirstPage,
    twoSPage
    // 其他组件...
  },
  data() {
    return {
      word2List:[],
      word1List:[],
      link2: [],
      link1: [],

      selectedComponent: 'TwoPage',
      selectedComponent1: '',
      selectedComponent2: '',
    };
  },
  mounted() { // 将 mounted 改为函数
    this.link1 = ['3+2转录计划管理'];
    this.link2 = ['3+2添加转录学校关系'];

    this.link3 = ['1+2转录计划管理'];
    this.link4 = ['1+2添加转录学校关系'];
  this.word1List = ['五年制转录申报审核系统-学校端'];
  this.word2List = data1.ssname;
  this.links = ['首页',  '3+2转录申报管理', '1+2转录申报管理','核对管理', '个人信息管理', ];
  },

  methods: {
  
    selectComponent(index) {
      data1.index=index
      console.log(index)
      switch (index) {
        case 0:
        document.getElementById('zi1').style.pointerEvents= "none"
          document.getElementById('zi2').style.pointerEvents= "none"
          document.getElementById('zi3').style.pointerEvents= "none"
          document.getElementById('zi4').style.pointerEvents= "none"
          this.selectedComponent = 'TwoPage';
          document.getElementById("zi").style.opacity= 0
          document.getElementById("zi").style.pointerEvents= "none"
          document.getElementById("zis").style.opacity= 0
          document.getElementById("zis").style.pointerEvents= "none"
          break;
        case 1:
          this.selectedComponent = 'FourPage';
          
          document.getElementById("zi").style.opacity= 1
          document.getElementById("zi").style.pointerEvents= "auto"
          document.getElementById('zi1').style.pointerEvents= "auto"
          document.getElementById('zi2').style.pointerEvents= "auto"
          document.getElementById('zi3').style.pointerEvents= "none"
          document.getElementById('zi4').style.pointerEvents= "none"
          document.getElementById("zis").style.opacity= 0
          document.getElementById("zis").style.pointerEvents= "none"
          document.getElementById("zi").style.zIndex= 999
        
          break;
          case 2:
          this.selectedComponent = 'twoSPage';
          document.getElementById('zi1').style.pointerEvents= "none"
          document.getElementById('zi2').style.pointerEvents= "none"
              document.getElementById("zi").style.opacity = "0";
          document.getElementById("zi").style.pointerEvents = "none";
          document.getElementById('zi3').style.pointerEvents= "auto"
          document.getElementById('zi4').style.pointerEvents= "auto"
          document.getElementById('zi3').style.pointerEvents= "auto"
          document.getElementById('zi4').style.pointerEvents= "auto"
          document.getElementById("zis").style.opacity = "1";
          document.getElementById("zi").style.zIndex= -999
          document.getElementById("zis").style.zIndex= 999

          break;
        case 3:
          this.selectedComponent = 'FivePage';
          document.getElementById("zi").style.opacity= 0
          document.getElementById("zi").style.opacity= 0
          document.getElementById("zi").style.pointerEvents= "none"
          document.getElementById("zis").style.opacity= 0
          document.getElementById("zis").style.pointerEvents= "none"
          document.getElementById("zi").style.pointerEvents= "none"
          document.getElementById("zis").style.opacity= 0
          document.getElementById("zis").style.pointerEvents= "none"
          document.getElementById('zi1').style.pointerEvents= "none"
          document.getElementById('zi2').style.pointerEvents= "none"
          document.getElementById('zi3').style.pointerEvents= "none"
          document.getElementById('zi4').style.pointerEvents= "none"
          document.getElementById("zi").style.opacity= 0
 
          document.getElementById("zi").style.pointerEvents= "none"
   
          break;
        case 4:
          this.selectedComponent = 'SixPage';
          document.getElementById("zi").style.opacity= 0
          document.getElementById("zi").style.opacity= 0
          document.getElementById("zi").style.pointerEvents= "none"
          document.getElementById("zis").style.opacity= 0
          document.getElementById("zis").style.pointerEvents= "none"
          document.getElementById("zi").style.pointerEvents= "none"
          document.getElementById("zis").style.opacity= 0
          document.getElementById("zis").style.pointerEvents= "none"
          document.getElementById('zi1').style.pointerEvents= "none"
          document.getElementById('zi2').style.pointerEvents= "none"
          document.getElementById("zi").style.opacity= 0
          document.getElementById("zi").style.pointerEvents= "none"
  
          break;
         
      }
    },
    selectComponent1(index) {
  
      console.log(index)
      switch (index) {
        case 2:
          this.selectedComponent = 'ThreePage';
          document.getElementById("zi").style.opacity= 1
          document.getElementById("zi").style.pointerEvents= "auto"
         

          break;
          case 1:
          this.selectedComponent = 'FourPage';
          document.getElementById("zi").style.opacity= 1
          document.getElementById("zi").style.pointerEvents= "auto"
      
        
          break;
      }
  },
  selectComponent2(index) {
  
  console.log(index)
  switch (index) {
    case 2:
      this.selectedComponent = 'onefirstPage';
      document.getElementById("zis").style.opacity= 1
      document.getElementById("zis").style.pointerEvents= "auto"
     

      break;
      case 1:
      this.selectedComponent = 'twoSPage';
      document.getElementById("zis").style.opacity= 1
      document.getElementById("zis").style.pointerEvents= "auto"
  
    
      break;
  }
},

}
}
</script>

<style scoped>
@import './pop/模板1.css';

/* 其他样式 */
</style>
