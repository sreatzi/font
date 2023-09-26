<template>
  <div id="opo">
    <p class="text-word33">处理进度</p>
    <div class="chufa" id="chufa">
      <div id="chufa-box" class="chufa-box">
        <p>计划处</p>
        <p>·未响应</p> 
      </div>
      <div id="time-out">
        <p>耗时: {{ timeout1 }}</p>
      </div>
    </div>
    <div class="progress-bar" id="progress-bar">
      <div class="progress" :style="{ width: (progressValue ) + '%' }" id="pro"></div>
    </div>
    <div class="co-word2">
      <div class="co-word1">
        <p class="text-wordp">
          申报<span style="color: red;">{{ word5 }}</span>专业<span style="color: blue;">{{ word6 }}</span>个转录学生信息
<br>
        </p> 
        <p class="text-wordp">初审</p>
        <p class="text-wordp">完成</p>
      </div>
    </div>
    <div class="textpp1">
      <div class="textpp">
        <span class="teacher-name">{{principal}}</span><br><br>
        <span class="hu">计划处</span><br><br>
        <span class="time">{{ date }}</span><br><br>
        <span class="opo1" :style="{ color: bule, marginLeft: opoMargin }">催一下</span><br>
     
      </div>
    </div>
  </div>
</template>

<script>
  import { data1 } from "@/components/globel/glober.ts";

export default {
mounted() {
  const progressBar = this.$refs.progressBar;

  this.createapp()
},
data() {
  return {
    timeout1: "",
    progressValue: 0,
    word5: "",
    word6: "",
    date: "",
    time: "",
    bule: "",
    opoMargin: "",
    principal:""

  };
},

methods: {
 createapp(){
  const urlapi = "http://192.168.1.116:5230/api/HomePage/gethomepagedata?schoolcode="+data1.ssid[data1.op6-1];
  const headers ={
    method:'GET',
    headers:{
 'Authorization':'Bearer '+'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6ImFkbWluIiwidXNlcmlkIjoiMSIsImFjY291bnQiOiJhZG1pbiIsInVzZXJ0eXBlIjoiMiIsImVtaWFsIjoic3RyaW5nIiwicGhvbmUiOiIxMTAiLCJzY2hvb2x0eXBlIjoiMiIsInNjaG9vbG5hbWUiOiLotoXnuqfnrqHnkIblkZgiLCJuYmYiOjE2OTQ1MzkyMjMsImV4cCI6MTcyNjA3NTIyMywiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDY1IiwiYXVkIjoiSFNDbGllbnQifQ.Gu03FK1Ppz5SGzTgSLUo66YgNwcA4sve5HROtvICrJc'
    }
  }

  fetch(urlapi,headers)
  .then(response=>response.json())
  .then(data=>{
     console.log(data)
     this.principal = data.data.principal  
     this.date = data.data.first_Time
     this.time = data.data.end_Time
     this.word5 = data.data.declaredNumber
     this.word6 = data.data.studentNumber
     this.timeout1 = data.data.elapsed_Time
     console.log(data.data.node)
    if(data.data.node == 1){
  setInterval(() => {
    
    if (this.progressValue < 20) {
      this.progressValue += 10;
    }
  
  }, 1000);
    }else if(data.data.node == 2){
      setInterval(() => {
    
    if (this.progressValue < 40) {
      this.progressValue += 10;
    }
  
  }, 1000);
    }
    else if(data.data.node == 3){
      setInterval(() => {
    
    if (this.progressValue < 60) {
      this.progressValue += 10;
    }
  
  }, 1000);
    }else if(data.data.node == 4){
      setInterval(() => {
    
    if (this.progressValue < 80) {
      this.progressValue += 10;
    }
  
  }, 1000);
    }else if(data.data.node == 5){
      setInterval(() => {
    
    if (this.progressValue < 100) {
      this.progressValue += 10;
    }
  
  }, 1000);
    }
     
  })
  .catch(error => {
    console.error('请求失败：', error);
  });
 },

},
};


</script>

<style scoped>
@import './pop/two.css';

/* 其他样式 */
</style>

