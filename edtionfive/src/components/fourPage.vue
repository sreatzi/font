<template>
  <div id="app1">
<div class="word-shcool" id="school">
  <p class="text-word3">学校代码{{shcoolcode}}</p>
  <p class="text-word-3">学校名称{{schoolname}}</p>
 
  <a href="#"><button class="poss" id="poss"  @click="posst">提交申报</button></a>
</div>

<div class="ta-cums">
  <table class="custom1" id="pop">
      <tr>
        <th>高职学校代码</th>
        <th>高职学校名称</th>
        <th>中职专业代码</th>
        <th>中职专业名称</th>
        <th>高职专业代码</th>
        <th>高职专业名称</th>
        <th>原计划数</th>
        <th>拟计划数</th>
        <th>操作</th>
        <th>状态</th>
        
      </tr>
            
  </table>
</div>



<div class="container-1" id="container-1">
  <div class="alert-su">
      <div class="title">
      <div class="cantant">
        <div class="tt1">
          <p class="smts">说明提示</p>
          <p class="x" @click="quxiao">X</p>
        </div>

<div class="xian"></div>
<div class="text-cantant" id="text">
<p class="pp" id="opo"></p>

<input type="text" placeholder="请输入备注" id="lml">
</div>
<p id="w1"></p>
<p id="w2"></p>
<p id="w3"></p>
<div class="xian1"></div>

<div class="popo">
  <button class="sure" @click="lopp" id="sure1">确定</button>
<button class="sure" @click="chu_1" id="sure2">确定</button>
<button class="cace" ref="cancelButton" @click="chualert" id="sure">取消</button>
</div>

      </div>
  </div>
</div>
</div>
  </div>
</template>
<script>
import { onMounted, ref } from 'vue';
import {data1} from './globel/glober.ts'
const globalData = {
  po: [],
  poo:[],
  remark:'0',
  dirdd:[]
};


export default {
data() {
  return {
    po:[],
    poo:[],
    shcoolcode: '', // 初始化学校代码
    schoolname: '', // 初始化学校名称
    containerOpacity: 0, // 弹窗容器透明度
    containerZIndex: -999, // 弹窗容器层级
    containerTransform: 'opacity ease-in 0.3s' // 弹窗容器动画
  };
},created() {
this.updateSchoolInfo();
this.createtable();
},

methods: {


  updateSchoolInfo() {
    console.log(data1.ssid[data1.op6-1])
    
  this.shcoolcode = data1.ssid[data1.op6-1]; // 赋值给 shcoolcode 变量
  this.schoolname =data1.ssname[data1.op6-1]; // 赋值给 schoolname 变量
},



  createtable(){
    
  console.log(data1.ssid[data1.op6-1])
  console.log(data1.index)
    const createpp = "http://192.168.1.116:5230/api/PlanManagement32/getlist_declarationrecord?Account="+data1.ssid[data1.op6-1]+"&TranscribeId="+data1.index

    const headers ={
      method:'GET',
      headers :{
         "Authorization":"Bearer "+"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6ImFkbWluIiwidXNlcmlkIjoiMSIsImFjY291bnQiOiJhZG1pbiIsInVzZXJ0eXBlIjoiMiIsImVtaWFsIjoic3RyaW5nIiwicGhvbmUiOiIxMTAiLCJzY2hvb2x0eXBlIjoiMiIsInNjaG9vbG5hbWUiOiLotoXnuqfnrqHnkIblkZgiLCJuYmYiOjE2OTQ1ODUwODcsImV4cCI6MTcyNjEyMTA4NywiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDY1IiwiYXVkIjoiSFNDbGllbnQifQ.0bXqVM1RP5ONulhg2g6IBOKKdYvQ1z8qPPQuIpHy76U"
      }
    }
    
fetch(createpp, headers)
.then(response => response.json())
.then(data => {

  console.log("连接成功", data);
  data1.drid = [];
  const table = document.getElementById('pop');
  if (table.rows.length == 0) {
    alert("未输入数据！");

}else{
  while (table.rows.length > 1) {
        table.deleteRow(1);
      }
      if (data.data) {


for (let i = 0; i < data.data.length; i++) {
 
  data1.state.push(data.data[i].state)
  const row = table.insertRow(table.rows.length);
  const scCell = row.insertCell();
  scCell.textContent = data.data[i].higher_School_Id;
  data1.drid.push(data.data[i].drid)
  console.log(data1.drid)
  const scnCell = row.insertCell();
  scnCell.textContent = data.data[i].higher_School_Name;

  const mccCell = row.insertCell();
  mccCell.textContent = data.data[i].secondary_Pmid;

  const mcnCell = row.insertCell();
  mcnCell.textContent = data.data[i].secondary_Pmname;

  const gcCell = row.insertCell();
  gcCell.textContent = data.data[i].higher_Pmid;

  const gcnCell = row.insertCell();
  gcnCell.textContent = data.data[i].higher_Pmname;

  const hcnCell = row.insertCell();
const hcnInput = document.createElement("input");
hcnInput.type = "text";
hcnInput.value = data.data[i].orginal_Plan_Number;
hcnInput.setAttribute("id", "input1");
hcnCell.appendChild(hcnInput);

const hccnCell = row.insertCell();
const hccnInput = document.createElement("input");
hccnInput.type = "text";
hccnInput.value =  data.data[i].planned_Number;
hccnInput.setAttribute("id", "input2");
hccnCell.appendChild(hccnInput);


const dcnCell = row.insertCell();
const link = document.createElement("a");
link.setAttribute("id", "dcnLink");
dcnCell.appendChild(link);


const WcCell = row.insertCell();

if(data.data[i].state ==1){
WcCell.setAttribute("id", "WcCell1");
WcCell.textContent = "审核中";
}else if (data.data[i].state ==0) {
WcCell.setAttribute("id", "WcCell0");
WcCell.textContent = "待提交";
}
else if (data.data[i].state == 2) {
WcCell.setAttribute("id", "WcCell2");
WcCell.textContent = "审核通过";
}
else if (data.data[i].state == 3) {
WcCell.setAttribute("id", "WcCell3");
WcCell.textContent = "审核退回";
}else if (data.data[i].state == 4) {
// document.getElementById("edit-button22").style.pointerEvents = "none"
// document.getElementById("edit-button1").style.pointerEvents = "none"
WcCell.setAttribute("id", "WcCell4");
WcCell.textContent = "待核对";
}
else if (data.data[i].state == 5) {
// document.getElementById("edit-button22").style.pointerEvents = "none"
// document.getElementById("edit-button1").style.pointerEvents = "none"
WcCell.setAttribute("id", "WcCell5");
WcCell.textContent = "已定稿";
}






  const words = ["申报", "保存", "删除"];

    for (let j = 0; j < words.length; j++) {
      
      const p = document.createElement("p");
  p.textContent = words[j];
  p.classList.add("schword");
  if (j === words.length - 3) { // 判断是否为编辑字段
    p.setAttribute("id", "edit-button4");
  } else if (j === words.length - 2) {
    p.setAttribute("id", "edit-button1");
  } else {
    p.setAttribute("id", "edit-button22");
  }

  if (data.data[i].state === 3 || data.data[i].state === 0) {
    p.style.color = "rgb(26,188,156)";
    p.style.cursor = "pointer";
  } else {
    p.style.pointerEvents = "none"
    p.style.cursor = "not-allowed";
    p.style.color = "rgb(123, 123, 123)";
  }

  // 将元素添加到指定位置


      

      switch (j) {
       
        case 0:
      
          p.addEventListener("click", function(){
            globalData.poo =[];
        globalData.po=[];
            const rowIndex = this.parentNode.parentNode.parentNode.rowIndex;
            data1.op5 = rowIndex
           
            console.log("1")
             document.querySelector('.pp#opo').innerText = '请确认是否提交当前行申报信息';
          
            data1.dridp.push(data1.drid[rowIndex-1])
            
            document.getElementById("sure1").style.opacity = 1
            document.getElementById("sure2").style.opacity = 0;
            document.getElementById("container-1").style.opacity = 1;
      document.getElementById("container-1").style.zIndex = 999;
     document.getElementById("container-1").style.transform = 'opacity ease-in 0.3s';
            
   const orginalPlanNumber = this.parentNode.parentNode.parentNode.querySelector("#input1").value;
  const plannedNumber = this.parentNode.parentNode.parentNode.querySelector("#input2").value;
  globalData.poo.push(orginalPlanNumber)
  globalData.po.push(plannedNumber)
  const threshold = parseFloat(orginalPlanNumber) * 0.2; 
  
  if (parseFloat(plannedNumber) > parseFloat(orginalPlanNumber) + threshold) {
    // 如果 plannedNumber 大于原计划数字的20%
    alert("拟计划数字大于原计划数字的20%！请输入备注！");
    this.parentNode.parentNode.parentNode.querySelector("#input2").style.color = "red";

    document.getElementById("lml").style.opacity = 1
    document.getElementById("lml").style.zIndex = 999
   document.getElementById("opo").style.opacity = 0
  
  } else if (parseFloat(plannedNumber) < parseFloat(orginalPlanNumber) - threshold) {
    // 如果 plannedNumber 小于原计划数字的20%
    alert("拟计划数字小于原计划数字的20%！请输入备注");
    
    this.parentNode.parentNode.parentNode.querySelector("#input2").style.color = "red";
    document.getElementById("lml").style.opacity = 1
    document.getElementById("lml").style.zIndex = 999
    document.getElementById("opo").style.opacity = 0
  } else {
    // 如果 plannedNumber 在合理范围内，则取消标红样式
    this.parentNode.parentNode.parentNode.querySelector("#input2").style.color = "";
    document.getElementById("opo").style.opacity = 1
    document.getElementById("lml").style.opacity = 0
    document.getElementById("lml").style.zIndex = -999
  }
});
        
          break;
        
        
          case 1:
            
          p.addEventListener("click", function() {
            globalData.poo =[];
        globalData.po=[];
            const rowIndex = this.parentNode.parentNode.parentNode.rowIndex;
            data1.op5 = rowIndex
            const orginalPlanNumber = this.parentNode.parentNode.parentNode.querySelector("#input1").value;
  const plannedNumber = this.parentNode.parentNode.parentNode.querySelector("#input2").value;
  globalData.poo.push(orginalPlanNumber)
  globalData.po.push(plannedNumber)
   console.log(globalData.poo)
   console.log(globalData.po)
   const ccapi = "http://192.168.1.116:5230/api/PlanManagement32/updata_declarationrecord";
   const schoolii = {
    drid: data1.drid[data1.op5-1],//申请表id
    orginalPlanNumber: globalData.poo[0],
    plannedNumber: globalData.po[0],
DeclarationRemark:globalData.remark
   }
   const apilol = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6ImFkbWluIiwidXNlcmlkIjoiMSIsImFjY291bnQiOiJhZG1pbiIsInVzZXJ0eXBlIjoiMiIsImVtaWFsIjoic3RyaW5nIiwicGhvbmUiOiIxMTAiLCJzY2hvb2x0eXBlIjoiMiIsInNjaG9vbG5hbWUiOiLotoXnuqfnrqHnkIblkZgiLCJuYmYiOjE2OTQ1MzkyMjMsImV4cCI6MTcyNjA3NTIyMywiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDY1IiwiYXVkIjoiSFNDbGllbnQifQ.Gu03FK1Ppz5SGzTgSLUo66YgNwcA4sve5HROtvICrJc"
    },
    body: JSON.stringify(schoolii)
  };fetch(ccapi, apilol)
.then(response => response.json())
.then(data => {

console.log("连接成功", data);
})
.catch(error => {
  console.error('请求失败：', error);
});
           
});

          break;
          case 2:
          p.addEventListener("click", function(){
    

                const rowIndex = this.parentNode.parentNode.parentNode.rowIndex;
                data1.op5 = rowIndex
            const table = p.closest("table");
            const lxxpop = "http://192.168.1.116:5230/api/PlanManagement32/Delete_declarationrecord"
              const lxxdata ={
                DRId: [data1.drid[data1.op5-1]],
                Account:data1.ssid[data1.op6-1],
              }
              
              const headers = {
                method :"POST",
                headers:{
                  "content-type":"application/json",
                  "Authorization":"Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6ImFkbWluIiwidXNlcmlkIjoiMSIsImFjY291bnQiOiJhZG1pbiIsInVzZXJ0eXBlIjoiMiIsImVtaWFsIjoic3RyaW5nIiwicGhvbmUiOiIxMTAiLCJzY2hvb2x0eXBlIjoiMiIsInNjaG9vbG5hbWUiOiLotoXnuqfnrqHnkIblkZgiLCJuYmYiOjE2OTQ1MzkyMjMsImV4cCI6MTcyNjA3NTIyMywiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDY1IiwiYXVkIjoiSFNDbGllbnQifQ.Gu03FK1Ppz5SGzTgSLUo66YgNwcA4sve5HROtvICrJc"
                },
                body:JSON.stringify(lxxdata)
              }
              fetch(lxxpop,headers)
              .then(response =>response.json())
              .then(data=>{
                console.log(data)
                if(data.result ===1){
                  alert("删除失败")
                }else{
                const row = p.closest("tr");

// 删除当前行
table.deleteRow(row.rowIndex);
}
              })
              .then(error=>{
                console.log(error)
              })

      
          });
          break;
      }
      link.appendChild(p);
    }
    dcnCell.appendChild(link);
 
  }
}
}
  
})


},

  chu_1() {
    globalData.dirdd = []
    const table = document.querySelector("#pop"); // 获取表格元素
const rows = table.getElementsByTagName("tr"); // 获取所有行元素

for (let i = 1; i < rows.length; i++) {
  const orginalPlanNumber = rows[i].querySelector("#input1").value;
  const plannedNumber = rows[i].querySelector("#input2").value;

  globalData.poo.push(orginalPlanNumber);
  globalData.po.push(plannedNumber);

  const threshold = parseFloat(orginalPlanNumber) * 0.2;

  if (parseFloat(plannedNumber) > parseFloat(orginalPlanNumber) + threshold) {
    // 如果 plannedNumber 大于原计划数字的20%
    rows[i].querySelector("#input2").style.color = "red";
   
    alert("有拟计划数字小于原计划数字的20%！请单独输入备注并申报！");
  } else if (parseFloat(plannedNumber) < parseFloat(orginalPlanNumber) - threshold) {
    // 如果 plannedNumber 小于原计划数字的20%
    rows[i].querySelector("#input2").style.color = "red";
    alert("有拟计划数字小于原计划数字的20%！请单独输入备注并申报！");
  } else {
    rows[i].querySelector("#input2").style.color = "black";
    globalData.dirdd.push(data1.drid[i-1])
    }
}


 const vip = "http://192.168.1.116:5230/api/PlanManagement32/submit_declarationrecord";
    const vipdata = {
      DRId:    globalData.dirdd,
      Account:data1.ssid[data1.op6-1],
    }
    const headers = {
      method :"POST",
      headers:{
        "content-type":"application/json",
        "Authorization":"Bearer " +  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6ImFkbWluIiwidXNlcmlkIjoiMSIsImFjY291bnQiOiJhZG1pbiIsInVzZXJ0eXBlIjoiMiIsImVtaWFsIjoic3RyaW5nIiwicGhvbmUiOiIxMTAiLCJzY2hvb2x0eXBlIjoiMiIsInNjaG9vbG5hbWUiOiLotoXnuqfnrqHnkIblkZgiLCJuYmYiOjE2OTQ1MzkyMjMsImV4cCI6MTcyNjA3NTIyMywiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDY1IiwiYXVkIjoiSFNDbGllbnQifQ.Gu03FK1Ppz5SGzTgSLUo66YgNwcA4sve5HROtvICrJc"
    },
    body:JSON.stringify(vipdata)
  }
  fetch(vip,headers)
  .then(response=>response.json())

.then(data => {
  alert("申报成功")
  console.log(vipdata)

  document.getElementById("container-1").style.opacity= 0;
    document.getElementById("container-1").style.zIndex= -999;
    document.getElementById("container-1").style.transform= 'opacity ease-in 0.3s';
})
.catch(error => {
  alert('请求失败');
});



  
  
  },
lopp(){
  globalData.remark = String(document.getElementById("lml").value)
     console.log(globalData.remark)
     const vip = "http://192.168.1.116:5230/api/PlanManagement32/submit_declarationrecord";
    const vipdata = {
      orginal_plan_number: globalData.poo[0],
      planned_number: globalData.po[0],
      DRId: [data1.drid[data1.op5-1]],
      Account:data1.ssid[data1.op6-1],
      remark:globalData.remark
    }
    const headers = {
      method :"POST",
      headers:{
        "content-type":"application/json",
        "Authorization":"Bearer " +  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6ImFkbWluIiwidXNlcmlkIjoiMSIsImFjY291bnQiOiJhZG1pbiIsInVzZXJ0eXBlIjoiMiIsImVtaWFsIjoic3RyaW5nIiwicGhvbmUiOiIxMTAiLCJzY2hvb2x0eXBlIjoiMiIsInNjaG9vbG5hbWUiOiLotoXnuqfnrqHnkIblkZgiLCJuYmYiOjE2OTQ1MzkyMjMsImV4cCI6MTcyNjA3NTIyMywiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDY1IiwiYXVkIjoiSFNDbGllbnQifQ.Gu03FK1Ppz5SGzTgSLUo66YgNwcA4sve5HROtvICrJc"
    },
    body:JSON.stringify(vipdata)
  }
  fetch(vip,headers)
  .then(response=>response.json())

.then(data => {
  alert("申报信息成功")
  console.log(vipdata)
  document.getElementById("container-1").style.opacity= 0;
    document.getElementById("container-1").style.zIndex= -999;
    document.getElementById("container-1").style.transform= 'opacity ease-in 0.3s';

})
.catch(error => {
  alert('申报失败：');
});
},

  quxiao() {
    document.getElementById("container-1").style.opacity= 0;
    document.getElementById("container-1").style.zIndex= -999;
    document.getElementById("container-1").style.transform= 'opacity ease-in 0.3s';
  },
  posst(){
    document.getElementById("opo").style.opacity = 1
    document.getElementById("lml").style.opacity = 0
    document.getElementById("lml").style.zIndex = -999
    document.getElementById("sure2").style.opacity = 1;
    document.getElementById("sure1").style.opacity = 0;
  document.getElementById("container-1").style.opacity = 1;
document.getElementById("container-1").style.zIndex = 999;
document.getElementById("container-1").style.transform = 'opacity ease-in 0.3s';

 },
chualert() {
    var element1 = document.querySelector('#w1');
    element1.textContent = '提交失败';
    element1.style.marginTop = '-50px';

    var element11 = document.querySelector('#w2');
    element11.textContent = '请核对并修改以下信息后重新提交';

    var element111 = document.querySelector('#w3');
    element111.textContent = '转录计划数大于往年计划数，请联系管理员咨询';

    var element2 = document.querySelector('.smts');
    element2.textContent = '标题';

    var element3 = document.querySelector('#opo');
    var img = document.createElement('img');
    img.src = './红色2-removebg-preview.png';
    element3.parentNode.replaceChild(img, element3);
    img.style.width = '150px';
    img.style.marginTop = '-90px';

    document.getElementById('text').style.border = 'none';
  },

  
},

mounted() {
  document.querySelector('.pp#opo').innerText = '请确认是否提交所有申报表';
}
};

</script>

<style scoped>
@import './pop/four.css';

/* 其他样式 */
</style>