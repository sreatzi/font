<template>
  <div class="container-demo">
   <lay-field theme="green">
    <template #title >
      欢迎:{{ name }}
    </template>
 </lay-field>
   <lay-line  border-style="dashed" border-width="3px" theme="green"></lay-line>
   <lay-container fluid>
   <div class="allbox">
      <div class="box1">
        <lay-table 
          height="315px" 
          ref="tableRef3" 
          :columns="columns3" 
          id="schoolid"
          :data-source="dataSource3" 
          :size="sm"
          v-model:selectedKey="selectedKey3"
          style="dis90=-play: flex;
          align-items: center;
          justify-content: center;">
          <template>
          </template>
      </lay-table> 
      </div>


      <div class="box2">
      <lay-table 
        height="315px" 
        ref="tableRef3" 
        id="mojorid"
        :columns="columns2" 
        :data-source="dataSource2" 
        :size="sm"
        :default-toolbar="true"
        v-model:selectedKey="selectedKey2"
        v-model:selectedKeys="selectedKeys2"
        style="display: flex;
        align-items: center;
        justify-content: center;">
        <template #toolbar>
        <lay-input type="text" style="width: 100px;" v-model="data2" :max="300" :min="100">
        </lay-input>
        <lay-button @click="sures">确定</lay-button>
        </template>
    </lay-table>
    </div>


      <div class="box3" >
      <lay-table 
        height="315px" 
        ref="tableRef3" 
        id="mojorid1"
        :columns="columns1" 
        :data-source="dataSource1" 
        :size="sm"
        :default-toolbar="true"
        v-model:selectedKey="selectedKey1"
        v-model:selectedKeys="selectedKeys1"
        style="display: flex;
        align-items: center;
        justify-content: center;">
        <template #toolbar>
        <lay-input type="text"  style="width: 100px;" v-model="data3" :max="300" :min="100">
        </lay-input>
        <lay-button @click="suret">确定</lay-button>
        </template>
    </lay-table> 
    </div>
    </div>
  </lay-container>
   <lay-line  border-style="dashed" border-width="3px" theme="green"></lay-line>
   <div class="wordtable" style="height: 300px;"> 
<lay-table :columns="columns8" :data-source="dataSource8" :height="'100%'"
     :page="page" 
     :resize="true"
     :loading="loading"
     :default-toolbar="true"
     even>
   <template v-slot:toolbar>
     <lay-button size="sm" type="primary" @click="add">新增</lay-button>
   </template>
   <template v-slot:operator="{ row }">
     <lay-button size="xs" type="primary" @click="stuadd(row)">添加</lay-button>
   </template>
</lay-table>
 </div>
 <lay-line  border-style="dashed" border-width="3px" theme="green"></lay-line>
</div>
 </template>

<script>
import { ref, reactive, onMounted } from 'vue';
import { layer } from "@layui/layui-vue";
import { lxxwoce,lxxjie,lxxj,lxxtianjia } from '@/api/api.js';
import { datag } from '@/dataglober.ts';
import {ppapi} from '../../../public/config'
export default {
 
 setup() {
  const id = datag.school.value.userId ? datag.school.value.userId :JSON.parse(localStorage.getItem('school')).userId;
    const name = datag.school.value.schoolName ? datag.school.value.schoolName :JSON.parse(localStorage.getItem('school')).schoolName;
   const columns3 = [
     { fixed: "left",width:"10px", type: "radio", title: "单选" },
     { title:"中职学校代码", width:"10px", key:"secondary_School_id"},
     { title:"中职学校名称", width: "10px", key:"secondary_School_Name" },
   ]
   const columns2 = [
     { fixed: "left",width:"10px", type: "radio", title: "单选" },
     { title:"中职专业代码", width:"10px", key:"majorCode"},
     { title:"中职专业名称", width: "10px", key:"majorName" },
   ]
   const columns1 = [
     { fixed: "left",width:"10px", type: "radio", title: "单选" },
     { title:"高职专业代码", width:"10px", key:"majorCode1"},
     { title:"高职专业名称", width: "10px", key:"majorName1" },
   ]
   const dataSource3 = ref([
   ])
   const dataSource2 = ref([
   ])
   const dataSource1 = ref([
   ])

   const stuadd = async(row)=>{
    console.log(row)
     lxxtianjia.api(row)
   }

     const add = async()=>{
       var ll;
         const stu3 = dataSource3.value.find(function(params) {
           return params.schoolid ==selectedKey3.value
         })
         const stu2 = dataSource2.value.find(function(params) {
           return params.mojorid ==selectedKey2.value
         })
         const stu1 = dataSource1.value.find(function(params) {
           return params.mojorid1 ==selectedKey1.value
         })
         const allstu={};
          
         Object.assign(allstu, stu3, stu2,stu1);
         var ll = false;
         if (Object.keys(dataSource8.value).length === 0&&stu3!==undefined&&stu2!==undefined&&stu1!==undefined) {
           dataSource8.value.push(allstu);
        }else{
           let isDuplicate = false; // 标记变量，用于标识是否有重复值
         dataSource8.value.forEach(item => {
       if (item.secondary_School_id === allstu.secondary_School_id &&
       item.majorCode === allstu.majorCode &&
       item.majorCode1 === allstu.majorCode1) {
         isDuplicate = true;
         layer.msg("有重复值");
       }
       });
       console.log(stu3)
       console.log(stu2)
       console.log(stu1)
       if (isDuplicate) {
       } else if (
       stu3 === undefined || 
       stu2 === undefined || 
       stu1 === undefined ||
       stu3===null||
       stu1===null||
       stu2===null||   
       JSON.stringify(allstu).length == 2 && !ll) {
         ll = true;
         layer.msg("有空数据不予添加");
       } else {
       dataSource8.value.push(allstu);
       }
     }
     console.log(JSON.stringify(allstu))
   }
   const sures = async()=>{
     const box2 = document.querySelector('.box2');
     const inputElement = box2.querySelector('input[type="text"]').value;
     console.log(inputElement)
     await lxxjie.api(inputElement)
     dataSource2.value = datag.studata.value
   }

   const suret = async()=>{
     const box2 = document.querySelector('.box3');
     const inputElement = box2.querySelector('input[type="text"]').value;
     console.log(inputElement)
     await lxxj.api(inputElement)
     dataSource1.value = datag.stuh.value 
   }

   const lxxstu = async()=>{
    const api = ppapi.apiurl+"/api/TranscriptionalRelationship32/getsecondaryschool"
    const headers ={
      method:'GET',
      headers:{
     "Authorization":"Bearer "+(JSON.parse(localStorage.getItem('takel'))?.accessToken || datag.takel.accessToken)
      }
    }
    try{
      const response = await fetch(api,headers)
    const data = await response.json()
      datag.stupp.value = data.data
     dataSource3.value = datag.stupp.value
     console.log(dataSource3.value)
    }catch(error){console.log("提取失败",error)}
   }

   onMounted(() => {lxxstu();});

   const columns8 = [
    
     {title:"中职专业代码",width: "100px",key:"majorCode"},
     { title:"中职专业名称",width: "100px",key:"majorName"},
     {title:"高职学校代码", width:"100px",key:"secondary_School_id"},
     {title:"高职学校名称", width:"100px", key:"secondary_School_Name"},
     {title:"高职专业代码", width: "100px",key:"majorCode1"},
     {title:"高职专业名称",width: "100px",key:"majorName1",ellipsisTooltip: true,},
     { title:"操作", width: "50px",key:"remark1", customSlot:"operator",ellipsisTooltip: true,},
   ]
   const dataSource8 = ref([
   ])
  
   const tableRef3 = ref();

   const selectedKey3 = ref("1");

   const selectedKeys3 = ref(["2", "3", "6", "7"]);

   const changeSelectedKeys3 = () => {
     selectedKeys3.value = ["1", "2", "3"]
   }

   const clearSelectedKeys3 = () => {
     selectedKeys3.value = []
   }

   const getSelectedKeys3 = () => {
     layer.msg(selectedKeys3.value);
   }

   const getCheckData3 = () => {
     layer.msg(tableRef3.value.getCheckData());
   }


   const tableRef2 = ref();

   const selectedKey2 = ref("1");

   const selectedKeys2 = ref(["2", "3", "6", "7"]);

   const changeSelectedKeys2 = () => {
     selectedKeys2.value = ["1", "2", "3"]
   }

   const clearSelectedKeys2 = () => {
     selectedKeys2.value = []
   }

   const getSelectedKeys2 = () => {
     layer.msg(selectedKeys3.value);
   }

   const getCheckData2 = () => {
     layer.msg(tableRef2.value.getCheckData());
   }



   const tableRef1 = ref();

   const selectedKey1 = ref("1");

   const selectedKeys1 = ref(["2", "3", "6", "7"]);

   const changeSelectedKeys1 = () => {
     selectedKeys1.value = ["1", "2", "3"]
   }

   const clearSelectedKeys1 = () => {
     selectedKeys1.value = []
   }

   const getSelectedKeys1 = () => {
     layer.msg(selectedKeys1.value);
   }

   const getCheckData1 = () => {
     layer.msg(tableRef1.value.getCheckData());
   }
       
 
   const selected1 = ref(1);
   const data1 = ref(0);
   const data2 = ref(0);
   const data3 = ref(0);

   return {
    id,
    name,
     stuadd,
     add,
     suret,
     sures,
     columns3,
     columns2,
     columns1,
     dataSource3,
     dataSource1,
     dataSource2,
     selectedKeys3,
     getSelectedKeys3,
     getCheckData3,
     tableRef3,
     changeSelectedKeys3,
     clearSelectedKeys3,
     selectedKey3,
     selectedKeys2,
     getSelectedKeys2,
     getCheckData2,
     tableRef2,
     changeSelectedKeys2,
     clearSelectedKeys2,
     selectedKey2,
     selectedKeys1,
     getSelectedKeys1,
     getCheckData1,
     tableRef1,
     changeSelectedKeys1,
     clearSelectedKeys1,
     selectedKey1,
     selected1,
     data1,
     columns8,
     dataSource8
   }
 }
}
</script>
<style>
.bbbbbox{
  display: flex;
  justify-content: center;
  align-items: center;
}
.wordtable{
  height: 200px;
 box-shadow: 1px 1px 1px 0.5px rgb(151, 151, 151);
 border: 1px solid rgb(135, 135, 135);
}
.box1, .box2, .box3 {
  height: 20rem;
  flex: 1 0 calc(33.33% - 10px); /* 每个盒子占据三分之一的宽度 */
  margin-bottom: 10px;
  border: 1px solid rgb(135, 135, 135);
  box-sizing: border-box; /* 边框和内边距计入盒子的总宽度 */
  display: flex;
  justify-content: center; /* 内容水平居中 */
  align-items: center; /* 内容垂直居中 */
  margin-right: 10px;
}

/* .layui-table {
width: 500px;
} */
.layui-table th {
width: 500px;
}
.allbox{

 margin: 15px auto;
 display: flex;
  flex-wrap: wrap;
 
}

.container-demo {
 border: 1px solid rgb(135, 135, 135);
 box-shadow: 1px 1px 1px 0.5px rgb(151, 151, 151);
 border-radius: 5px;
 margin: 10px 10px 10px 10px;
       width:98%;
       height: 800px;
       background: #e6e6e6;
   }
   .layui-table-tool{
     display: flex;
     justify-content: center;
     align-items: center;
   }
   .layui-table-tool-self{
display: flex;
justify-content: center;
   }
</style>