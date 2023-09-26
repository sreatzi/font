<template>
  <div>
    <div class="word-shcool" id="school">
      <p class="text-word3">
        学校代码
        <span class="text-word3" id="opo"></span>
      </p>
      <p class="text-word-3" >
        学校名称
        <span id="opo1"></span>
      </p>
    </div>

    <div class="text-word">
      <div class="text-shcool">
        <p>学校代码/学校名称</p>
      </div>
      <div class="text-shcool1">
        <p>学校代码/学校名称</p>
      </div>
      <div class="text-shcool2">
        <p>学校代码/学校名称</p>
      </div>
    </div>

    <div class="text-wordo">
      <div class="text-shcoo-0">
        <input type="text" v-model="schoolName" id="schoolName">
        <button @click="createapi1">查询</button>
      </div>
      <div class="text-shcool-1">
        <input type="text" v-model="schoolname2" id="schoolName2">
        <button @click="createapi2">查询</button>
      </div>
      <div class="text-shcool-2">
        <input type="text" v-model="schoolname3" id="schoolName3">
        <button @click="createapi3">查询</button>
      </div>
    </div>

    <div class="table-1">
      <div class="cs1">
        <table class="cs-table1" id="schoolN">
          <tr>
            <th>选择</th>
            <th>高职学校代码</th>
            <th>高职学校名称</th>
          </tr>
        </table>
      </div>
      <div class="cs2">
        <table class="cs-table2" id="schoolN2">
          <tr>
            <th>选择</th>
            <th>高职专业代码</th>
            <th>高职专业名称</th>
          </tr>
        </table>
      </div>
      <div class="cs3">
        <table class="cs-table3" id="schoolN3">
          <tr>
            <th>选择</th>
            <th>中职专业代码</th>
            <th>中职专业名称</th>
          </tr>
        </table>
      </div>
    </div>

    <div class="ta-cums">
      <table class="custom1" id="custom1">
        <tr>
          <th>高职学校代码</th>
          <th>高职学校名称</th>
          <th>中职专业代码</th>
          <th>中职专业名称</th>
          <th>高职专业代码</th>
          <th>高职专业名称</th>
   
          <th>操作</th>
        </tr>
 
      </table>
   
    </div>
    
  </div>
  <button class="Three-sure" @click="createapi4">点击确定</button>
</template>

<script>
import { reactive, onMounted, ref } from 'vue';
import axios from 'axios';
import {data1} from './globel/glober.ts'
export default {
  
data() {
  return {
    schoolName: '',
    schoolname2: '', 
    schoolname3: '',
    tableData: [
    {
        },
    ]
  };
},
setup() {
  const schoolNameRef = ref(null);
  const element1 = ref(0);
  const element2 = ref(0);

  onMounted(() => {
    const element = document.getElementById("opo");
    const element1 = document.getElementById("opo1")
    if (element) {
element1.value = element.innerText =data1.ssid[data1.op6-1];
element2.value = element1.innerText =data1.ssname[data1.op6-1];
    }
    console.log(element1.value);
  });



  const toggleCheckbox = (checkbox) => {
    checkbox.classList.toggle('checked');
  };

  const createapi1 = () => {
  var schoolName = document.getElementById("schoolName").value;
  const apiUrl = "http://192.168.1.116:5230/api/SchoolTranscription32/getHighRankSchoolBySearch?JudgeString=" + schoolName;

  const requestOptions = {
    method: 'GET',
    headers: {
      "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6ImFkbWluIiwidXNlcmlkIjoiMSIsImFjY291bnQiOiJhZG1pbiIsInVzZXJ0eXBlIjoiMiIsImVtaWFsIjoic3RyaW5nIiwicGhvbmUiOiIxMTAiLCJzY2hvb2x0eXBlIjoiMiIsInNjaG9vbG5hbWUiOiLotoXnuqfnrqHnkIblkZgiLCJuYmYiOjE2OTQ1MjgwMzksImV4cCI6MTcyNjA2NDAzOSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDY1IiwiYXVkIjoiSFNDbGllbnQifQ.X9MXqMWyQCm-e5FKyq3mhAIwQnlsuoW0EFTOxOyxHYQ"
    }
  };

  axios.get(apiUrl, requestOptions)
    .then(response => {
      const data = response.data;
      console.log("连接成功");

      const weatherTable = document.getElementById("schoolN");
      // console.log(data);
      // console.log(data.data.length)
      data.globalArray = [];
      for (let i = 0; i < data.data.length; i++) {
        const schoolName1 = data.data[i];

const row = weatherTable.insertRow();

const checkboxCell = row.insertCell();
const checkboxContainer = document.createElement('div');
checkboxContainer.className = 'checkbox-container';
const checkboxDiv = document.createElement('div');
checkboxDiv.className = 'checkbox';

checkboxDiv.onclick = function () {
  // 获取当前选中的学校代码
  const currentSchoolCode = schoolName1.schoolCode;

  // 判断当前复选框是否已经被选中
  const isSelected = this.classList.contains('checked');

  if (!isSelected) {
    // 清空数组
    data.globalArray = [];

    // 将当前选中的学校代码添加到数组
    data.globalArray.push(currentSchoolCode);

    // 获取当前行的索引
    const rowIndex = this.parentNode.parentNode.parentNode.rowIndex;
    
    // 将 rowIndex 赋值给 data1.op
    data1.op = rowIndex;

    console.log(data1.op);

    // 将所有复选框的状态移除
    const checkboxes = document.getElementsByClassName('checkbox');
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

        const schoolIdCell = row.insertCell();
        schoolIdCell.textContent = schoolName1.schoolCode;

        const schoolNameCell = row.insertCell();
        schoolNameCell.textContent = schoolName1.schoolName;

        data1.sc.push(schoolName1.schoolCode);
        data1.sn.push(schoolName1.schoolName);
        console.log(data1.sc)
        console.log(data1.sn)
        console.log(data1.op)
      }
    
    })
    .catch(error => {
      console.error('请求失败：', error);
    });
};



    const createapi2 = () => {
  
  console.log(data1.sc[data1.op - 1]); // 添加条件判断
  const schoolname2 = document.getElementById('schoolName2').value;
  const api1 =
    'http://192.168.1.116:5230/api/SchoolTranscription32/getSchoolMajorBySearch?Judgestring=' +
    schoolname2 +
    '&Account=' +
    data1.sc[data1.op - 1];

  const requestOptions = {
    method: 'GET',
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6ImFkbWluIiwidXNlcmlkIjoiMSIsImFjY291bnQiOiJhZG1pbiIsInVzZXJ0eXBlIjoiMiIsImVtaWFsIjoic3RyaW5nIiwicGhvbmUiOiIxMTAiLCJzY2hvb2x0eXBlIjoiMiIsInNjaG9vbG5hbWUiOiLotoXnuqfnrqHnkIblkZgiLCJuYmYiOjE2OTQ1MDg0MDQsImV4cCI6MTcyNjA0NDQwNCwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDY1IiwiYXVkIjoiSFNDbGllbnQifQ.EoM3jmKD2OR2WdU6zS7t32v3ScFDVucVX0d9p55MiBQ'
    }
  };

  fetch(api1, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log('连接成功');
      const weatherTable = document.getElementById('schoolN2');
      console.log(data);
      for (let i = 0; i < data.data.length; i++) {
        const schoolName1 = data.data[i];

const row = weatherTable.insertRow();

const checkboxCell = row.insertCell();
const checkboxContainer = document.createElement('div');
checkboxContainer.className = 'checkbox1-container';
const checkboxDiv = document.createElement('div');
checkboxDiv.className = 'checkbox1';

checkboxDiv.onclick = function () {
  // 获取当前选中的学校代码
  const currentSchoolCode = schoolName1.schoolCode;

  // 判断当前复选框是否已经被选中
  const isSelected = this.classList.contains('checked');

  if (!isSelected) {
    // 清空数组
    data.globalArray = [];

    // 将当前选中的学校代码添加到数组
    data1.globalArray.push(currentSchoolCode);

    // 获取当前行的索引
    const rowIndex = this.parentNode.parentNode.parentNode.rowIndex;

    // 将 rowIndex 赋值给 data1.op
    data1.op1 = rowIndex;
   
    console.log(data1.op1);

    // 将所有复选框的状态移除
    const checkboxes = document.getElementsByClassName('checkbox1');
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

        const schoolIdCell = row.insertCell();
        schoolIdCell.textContent = schoolName1.majorCode;

        const schoolNameCell = row.insertCell();
        schoolNameCell.textContent = schoolName1.majorName;

        data1.macode.push(schoolName1.majorCode);
        data1.maname.push(schoolName1.majorName);
      }
    })
    .catch((error) => {
      console.error('请求失败：', error);
    });
};

  

  const createapi3 = () => {
   const element1 =  document.getElementById("opo1").value
    const schoolname3 = document.getElementById('schoolName3').value;

    const uip = "http://192.168.1.116:5230/api/SchoolTranscription32/getSchoolMajorBySearch?Judgestring=" + schoolname3 + "&Account=" + element1;

    const headers = {
      method: 'GET',
      headers: {
        "Authorization": "Bearer "+"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6ImFkbWluIiwidXNlcmlkIjoiMSIsImFjY291bnQiOiJhZG1pbiIsInVzZXJ0eXBlIjoiMiIsImVtaWFsIjoic3RyaW5nIiwicGhvbmUiOiIxMTAiLCJzY2hvb2x0eXBlIjoiMiIsInNjaG9vbG5hbWUiOiLotoXnuqfnrqHnkIblkZgiLCJuYmYiOjE2OTQ1MDg0MDQsImV4cCI6MTcyNjA0NDQwNCwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDY1IiwiYXVkIjoiSFNDbGllbnQifQ.EoM3jmKD2OR2WdU6zS7t32v3ScFDVucVX0d9p55MiBQ"
      },
    };

    fetch(uip, headers)
      .then(response => response.json())
      .then(data => {
        console.log("连接成功");
        const weatherTable = document.getElementById("schoolN3");
       
        for (let i = 0; i < data.data.length; i++) {
          const schoolName1 = data.data[i];

const row = weatherTable.insertRow();

const checkboxCell = row.insertCell();
const checkboxContainer = document.createElement('div');
checkboxContainer.className = 'checkbox2-container';
const checkboxDiv = document.createElement('div');
checkboxDiv.className = 'checkbox2';

checkboxDiv.onclick = function () {
  // 获取当前选中的学校代码
  const currentSchoolCode = schoolName1.schoolCode;

  // 判断当前复选框是否已经被选中
  const isSelected = this.classList.contains('checked');

  if (!isSelected) {
    // 清空数组
    data.globalArray = [];

    // 将当前选中的学校代码添加到数组
    data1.globalArray.push(currentSchoolCode);

    // 获取当前行的索引
    const rowIndex = this.parentNode.parentNode.parentNode.rowIndex;

    // 将 rowIndex 赋值给 data1.op
    data1.op2 = rowIndex;
   
    console.log(data1.op2);

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

          const schoolIdCell = row.insertCell();
          schoolIdCell.textContent = schoolName1.majorCode;

          // macode = schoolName1.majorCode;

          const schoolNameCell = row.insertCell();
          schoolNameCell.textContent = schoolName1.majorName;
          
        data1.minc.push(schoolName1.majorCode);
        data1.minn.push(schoolName1.majorName);
        console.log(data1.minn)
        }
      })
      .catch(error => {
        console.error('请求失败：', error);
      });
  };

  const createapi4 = () => {

    document.getElementById("opo1").value;
     console.log(data1.minc[data1.op2-1]);
     console.log(data1.minn[data1.op2-1])
     console.log(data1.macode[data1.op1-1])
     console.log(data1.maname[data1.op1-1])

     const table = document.getElementById('custom1');
     while (table.rows.length > 1) {
  table.deleteRow(1);
}

const row = table.insertRow(1);

const scCell = row.insertCell();
scCell.textContent = data1.sc[data1.op - 1];

const scnCell = row.insertCell();
scnCell.textContent = data1.sn[data1.op - 1];

const mccCell = row.insertCell();
mccCell.textContent = data1.macode[data1.op1 - 1];

const mcnCell = row.insertCell();
mcnCell.textContent = data1.maname[data1.op1 - 1];

const gcCell = row.insertCell();
gcCell.textContent = data1.minc[data1.op2 - 1];

const gcnCell = row.insertCell();
gcnCell.textContent = data1.minn[data1.op2 - 1];

const dcnCell = row.insertCell();
const link = document.createElement("a");
link.textContent = "添加";
link.href = "#";
link.id = "myLinkId";
dcnCell.appendChild(link);
dcnCell.addEventListener("click", myFunction);
  }
  const myFunction = () =>{
    

    const uip = "http://192.168.1.116:5230/api/SchoolTranscription32/SetDeclarationRecordTable";
const schooldata = {
  secondary_PMId: data1.minc[data1.op2 - 1],
  secondary_PMName: data1.minn[data1.op2 - 1],
  higher_PMId: data1.macode[data1.op1 - 1],
  higher_PMName:data1.maname[data1.op1 - 1],
  secondary_School_id:data1.ssid[data1.op6-1],
  secondary_School_Name: data1.ssname,
  higher_school_id:data1.sc[data1.op - 1],
  higher_school_name: data1.sn[data1.op - 1],
  transcribeId: 1
};

console.log(schooldata)
const headers = {
  method: 'POST',
  headers: {
    "content-type":"application/json",
    "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6ImFkbWluIiwidXNlcmlkIjoiMSIsImFjY291bnQiOiJhZG1pbiIsInVzZXJ0eXBlIjoiMiIsImVtaWFsIjoic3RyaW5nIiwicGhvbmUiOiIxMTAiLCJzY2hvb2x0eXBlIjoiMiIsInNjaG9vbG5hbWUiOiLotoXnuqfnrqHnkIblkZgiLCJuYmYiOjE2OTQ1MzkyMjMsImV4cCI6MTcyNjA3NTIyMywiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDY1IiwiYXVkIjoiSFNDbGllbnQifQ.Gu03FK1Ppz5SGzTgSLUo66YgNwcA4sve5HROtvICrJc"
  },
  body: JSON.stringify(schooldata)
};

fetch(uip, headers)
  .then(response => response.json())
  .then(data => {
    console.log("连接成功",data);
    alert("添加成功")
  })
  .catch(error => {
    console.error('请求失败：', error);
  });


}


return {
  myFunction,
  createapi2,
  createapi1,
  createapi4,
  createapi3,
  
};



}
}
</script>

<style scoped>
@import './pop/three.css';

/* 其他样式 */
</style>
 
