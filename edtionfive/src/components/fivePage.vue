<template>
    <div>
      <div class="tt1">
        <div class="t-box1">
          <a href="#">
            <p class="t-word1" @click="CheckSuccess(1)">3+2转录计划专业目录核对稿</p>
          </a>
        </div>
        <div class="t-box2">
          <a href="#">
            <p class="t-word2" @click="CheckSuccess(2)" >1+2转录计划专业目录核对稿</p>
          </a>
        </div>
        <button class="hedui" @click="handleCheckSuccess">核对成功点击</button>
      </div>
      <div class="scroll-container">
        <div class="scroll-content" id="scroll-content">
     <table id="woce">
      <tr>
        <th>中职专业名称</th>
          <th>高职学校名称</th>
          
          <th>高职专业名称</th>
          <th>计划数</th>
        </tr>
     </table>
        </div>
      </div>
    
    </div>
  </template>
  
  <script>
  import {data1} from './globel/glober.ts'
  export default {
    methods: {
      handleCheckSuccess() {
      
      const lxxvip = "http://192.168.1.112:5230/api/SchoolCheck/ConfirmTheCheck"
      const data= {
        schoolcode:data1.ssid[0],
      }
      const lxxdatap ={
        method:'POST',
        headers:{
          "content-type":"application/json",
              "Authorization":"Bearer " +  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6ImFkbWluIiwidXNlcmlkIjoiMSIsImFjY291bnQiOiJhZG1pbiIsInVzZXJ0eXBlIjoiMiIsImVtaWFsIjoiMTExQHFxLmNvbSIsInBob25lIjoiMTEwIiwic2Nob29sdHlwZSI6IjIiLCJzY2hvb2xuYW1lIjoi6LaF57qn566h55CG5ZGYIiwibmJmIjoxNjk0Nzg5NjYyLCJleHAiOjE3MjYzMjU2NjIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTA2NSIsImF1ZCI6IkhTQ2xpZW50In0.99eFaoY_8e-7nDuCHSLhPjSQ21H_0rDDtHAYKirL794"
        },
        body:JSON.stringify(data)
      }
      fetch(lxxvip,lxxdatap)
      .then(response =>response.json())
      .then(data=>{
        console.log(data)
      })
      .then(error=>{
        console.log (error)
      })
      },
      CheckSuccess(index1){
        console.log(data1.ssid[data1.op6-1])
        const createlxx = "http://192.168.1.116:5230/api/SchoolCheck/DeclarationCheck?Secondary_School_id="+data1.ssid[data1.op6-1]+"&transcribeId="+index1;
const headers = {
  method :"GET",
  headers:{
    "Authorization":"Bearer " +  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6ImFkbWluIiwidXNlcmlkIjoiMSIsImFjY291bnQiOiJhZG1pbiIsInVzZXJ0eXBlIjoiMiIsImVtaWFsIjoic3RyaW5nIiwicGhvbmUiOiIxMTAiLCJzY2hvb2x0eXBlIjoiMiIsInNjaG9vbG5hbWUiOiLotoXnuqfnrqHnkIblkZgiLCJuYmYiOjE2OTQ1MzkyMjMsImV4cCI6MTcyNjA3NTIyMywiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDY1IiwiYXVkIjoiSFNDbGllbnQifQ.Gu03FK1Ppz5SGzTgSLUo66YgNwcA4sve5HROtvICrJc"
  },
};

fetch(createlxx,headers)
  .then(response =>response.json())
  .then(data=>{
    console.log(data);
    const table = document.getElementById('woce');
    while (table.rows.length > 1) {
        table.deleteRow(1);
      }
    for(let i = 0; i<data.data.length;i++){
  const row = table.insertRow(table.rows.length)
  const scCell = row.insertCell();
  scCell.textContent = data.data[i].secondarySchoolMajorName

  const acCell = row.insertCell();
  acCell.textContent = data.data[i].higherSchoolName

  const bcCell = row.insertCell();
  bcCell.textContent = data.data[i].higherPMName

  const ccCell = row.insertCell();
  ccCell.textContent = data.data[i].plannedNum
    }

  })
  .catch(error=>{
    console.log(error);
  });


    }


    }
  };
  </script>

<style scoped>
@import './pop/five.css';

/* 其他样式 */
</style>
  