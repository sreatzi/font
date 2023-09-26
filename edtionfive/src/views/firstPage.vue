<template>
    <div id="bgd-box">
      <div class="container" id="container">
        <div class="bgd">
          <div class="green-box" id="green-box">
            <div class="topb"></div>
            <input v-model="keyword" type="text" name="username" placeholder="搜素中职学校或者代码" id="suo" />
            <button class="login-button" @click="sureapi">搜索</button>     
            <div class="topc"></div>
            <div class="scroll-container1">
              <div class="scroll-content">
              <table id="lxxwo">
                <tr>
                  <th>选中</th>
                  <th>学校名称</th>
                  <th>帐号</th>
                </tr>
              </table>
              </div>
            </div>
            <div class="topa"></div>
            <button class="login-button" @click="sureap">确定</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
import { ref, getCurrentInstance } from "vue";
  import { useRouter } from 'vue-router';
  import {data1} from '@/components/globel/glober.ts'
  
export default {

  setup() {
    const sI = ref([]);
    const instance = getCurrentInstance();
    
    const sureapi = () => {
      const suo = document.getElementById("suo").value;
      const urlA = "http://192.168.1.116:5230/api/HigherVocationalSelectSecondaryVocational/getsecondaryvocational?NameOrId=" + suo;

      const request = {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0IiwibmFtZSI6IjY5ODA4IiwidXNlcmlkIjoiNCIsImFjY291bnQiOiI2OTgwOCIsInVzZXJ0eXBlIjoiMCIsImVtaWFsIjoiMTEwQHFxLmNvbSIsInBob25lIjoiMTExIiwic2Nob29sdHlwZSI6IjAiLCJzY2hvb2xuYW1lIjoi5Zub5bed55yB6ams5bCU5bq35rCR5peP5biI6IyD5a2m5qChIiwibmJmIjoxNjk0NzQwMDYzLCJleHAiOjE3MjYyNzYwNjMsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTA2NSIsImF1ZCI6IkhTQ2xpZW50In0.W29veUW2QKjSnLVML35NfbtGk4lBoy__m1tHgGR8lm4"
        }
      };
      
      fetch(urlA, request)
        .then(response => response.json())
        .then(data => {
          console.log("连接成功");
         
          const table = document.getElementById('lxxwo');
while (table.rows.length > 1) {
  table.deleteRow(1);
}

for (let i = 0; i < data.data.length; i++) {
  const checkboxCell = table.insertRow().insertCell();

  const checkboxContainer = document.createElement('div');
  checkboxContainer.className = 'checkbox2-container';

  const checkboxDiv = document.createElement('div');
  checkboxDiv.className = 'checkbox2';

  checkboxDiv.onclick = function () {
    // 获取当前选中的学校代码
    let currentSchoolCode = data.data[i].schoolId;
    data1.schoolID = currentSchoolCode
    // 判断当前复选框是否已经被选中
    const isSelected = this.classList.contains('checked');

    if (!isSelected) {
      // 清空数组
      data.globalArray = [];

      // 将当前选中的学校代码添加到数组

      // 获取当前行的索引
      const rowIndex = this.parentNode.parentNode.parentNode.rowIndex;

      // 将 rowIndex 赋值给 data1.op
      data1.op6 = rowIndex;

      console.log(data1.ssid[data1.op6-1]);

      // 将所有复选框的状态移除
      const checkboxes = document.getElementsByClassName('checkbox2');
      Array.from(checkboxes).forEach(function (checkbox) {
        checkbox.classList.remove('checked');
      });

      // 将当前复选框添加选中状态
      this.classList.add('checked');
    }
  };

  checkboxContainer.appendChild(checkboxDiv);
  checkboxCell.appendChild(checkboxContainer);

  const checkmarkDiv = document.createElement('div');
  checkmarkDiv.className = 'checkmark';

  checkboxDiv.appendChild(checkmarkDiv);
  checkboxContainer.appendChild(checkboxDiv);
  checkboxCell.appendChild(checkboxContainer);

  const scnCell = table.rows[table.rows.length - 1].insertCell();
  scnCell.textContent = data.data[i].schoolName;

  const scCell = table.rows[table.rows.length - 1].insertCell();
  scCell.textContent = data.data[i].account;
}


          
    
        })
        .catch(error => {
          console.error('请求失败：', error);
        });
    };
    
    const sureap = () => {
      console.log(data1.ssid[data1.op6-1]);
      const urlA = "http://192.168.1.116:5230/api/HigherVocationalSelectSecondaryVocational/getdata?schoolid=" +  data1.schoolID ;
      const request = {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0IiwibmFtZSI6IjY5ODA4IiwidXNlcmlkIjoiNCIsImFjY291bnQiOiI2OTgwOCIsInVzZXJ0eXBlIjoiMCIsImVtaWFsIjoiMTEwQHFxLmNvbSIsInBob25lIjoiMTExIiwic2Nob29sdHlwZSI6IjAiLCJzY2hvb2xuYW1lIjoi5Zub5bed55yB6ams5bCU5bq35rCR5peP5biI6IyD5a2m5qChIiwibmJmIjoxNjk0NzQwMDYzLCJleHAiOjE3MjYyNzYwNjMsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTA2NSIsImF1ZCI6IkhTQ2xpZW50In0.W29veUW2QKjSnLVML35NfbtGk4lBoy__m1tHgGR8lm4"
        }
      };

      fetch(urlA, request)
        .then(response => response.json())
        .then(data => {
          console.log("获取成功");
          data1.ssid[data1.op6-1] = data.data.account
          data1.ssname[data1.op6-1] = data.data.schoolName
          instance.proxy.$router.push({ path: '/SonMetPage' });
        })
        .catch(error => {
          console.error('请求失败：', error);
        });
    };

    return {
      sI,
      sureapi,
      sureap
    };
  }
};

  </script>
  
  <style scoped>
  @import './pop/first.css';
  
  /* 其他样式 */
  </style>