<template>
   <Some v-if="!showReplacement">
  <div class="container-demo">
   
    <lay-field theme="green">
    <template #title >
      欢迎:{{ name }}
    </template>
  </lay-field>
   <lay-line  border-style="dashed" border-width="3px" theme="green"></lay-line>
   <div class="allbox">
    
 <div class="boxpp">
   <lay-table 
     height="500px" 
     ref="tableRef3" 
     :columns="columns3" 
     :data-source="dataSource3" 
     :size="sm"
     :default-toolbar="true"
     id="ppid"
     v-model:selectedKey="selectedKey3"
     v-model:selectedKeys="selectedKeys3"
     style="display: flex;
     align-items: center;
     justify-content: center;
     "
     @selectedKey3-change="handleSelectChange"
     >
   <template #toolbar>
    <lay-button size="sm" @click="baocun">保存</lay-button>
     <lay-button size="sm" type="primary" @click="showReplacement = !showReplacement">返回</lay-button>
   </template>
 </lay-table> 
 
 </div>
 <div class="wordtable" style="height: 500px;"> 
 <lay-table 
 :columns="columns8" :data-source="dataSource8" even>
 
   <template v-slot:Input2="{ row }">
    <lay-input  v-model="row.number" allowClear type="number" :max="300" :min="0"></lay-input>
   </template>
 </lay-table>
 </div>
   </div>
 <lay-line  border-style="dashed" border-width="3px" theme="green"></lay-line>

 
</div>
</Some>
    <replacementComponent v-else />
 </template>

<script>
import { ref, watch, reactive,h, resolveComponent,onMounted,defineAsyncComponent  } from 'vue';
import { layer } from "@layui/layui-vue";
import { datag } from '@/dataglober.ts';
import { lxxcity1,lxxcitybocun } from '@/api/api.js';
import {supapi} from '../../../public/config';
const replacementComponent = defineAsyncComponent(() => {
  return import('./pplanPage.vue');
})
export default {
  data() {
    return {
      showReplacement:false,
    };
  },
  components: {
    replacementComponent,
  },
 setup() {
   const id = datag.school.value.userId || (JSON.parse(localStorage.getItem('schooll')) || {}).userId || '无';
const name = datag.school.value.schoolName || (JSON.parse(localStorage.getItem('schooll')) || {}).schoolName || '无';
  const selectedKey3 = ref("1");

const selectedKeys3 = ref(["2", "3", "6", "7"]);

const handleSelectChange = async(selectedKeys, selectedRows)=> {
  // 获取选中的值
  selectedKey3.value = selectedKeys[0];
  console.log("选中的值：", selectedKey3.value);
}
datag.e6a5bde689bde698afe4bda2e58aa2e4bb9be8bf9ee4baa5e4bb94e6af92=true
watch(selectedKey3, (newValue) => {
  const lxx = supapi.supapi + "/api/SecondaryEnrollment/getareapopulation?PPId="+newValue
     const headers = {
        method:"GET",
        headers:{
            'Authorization':'Bearer '+(JSON.parse(localStorage.getItem('taken'))?.accessToken || datag.takel.accessToken),
            "content-type": "application/json",
        },
     }
     fetch(lxx,headers)
     .then(response=>response.json())
     .then(data=>{
        console.log(data)
        datag.stucitynuber.value = data.data
        if(datag.stucitynuber.value==null){
        console.log("有值为空")
        dataSource8.value.forEach((item,index)=>{
        item.number = 0
      })
      }else{
        dataSource8.value.forEach((item,index)=>{
        item.number = datag.stucitynuber.value[index].number
      })
   
      }
      console.log("1132313")
      console.log(dataSource8.value)
     })
     .then(error=>{
        console.log(error)
     })
     
    });

    const baocun = async()=>{
      const region =[]
      const inputBoxes = document.querySelectorAll('input[type="number"]');
    
    for (let index = 0; index < dataSource8.value.length; index++) {
      const rii = {
        regionid:dataSource8.value[index].value,
        regionname:dataSource8.value[index].key,
        number:parseInt(inputBoxes[index].value, 10),
      }
      region.push(rii)
    }
     var stuppid = selectedKey3.value
    //  console.log(region1)
     lxxcitybocun.api(stuppid,region)
    }

  const lxxcity = async()=>{
    datag.e6a5bde689bde698afe4bda2e58aa2e4bb9be8bf9ee4baa5e4bb94e6af92=true
    const lxx1 = supapi.supapi+"/api/SecondaryEnrollment/getregion?key=city"
    const headers = {
            method:"GET",
            headers:{
            'Authorization':'Bearer '+(JSON.parse(localStorage.getItem('taken'))?.accessToken || datag.takel.accessToken),
            "content-type": "application/json",
            }
        }
    fetch(lxx1,headers)
    .then(response=>response.json())
    .then(data=>{
      console.log(data)
      dataSource8.value = data.data
      console.log("12312312313")
     
      for(var i = 0;i<dataSource8.value.length;i++){
        dataSource8.value[i]["number"] =0
      }
      console.log(dataSource8.value)
    })
    .then(error=>{
      console.log(error)
    })
  }

  const dataSource3 = ref([
   ])
   const lxxapi = async()=>{
    datag.e6a5bde689bde698afe4bda2e58aa2e4bb9be8bf9ee4baa5e4bb94e6af92=true
    const lxx = supapi.supapi+"/api/SecondaryEnrollment/getprofessionalplans?transcribe=2&exception=1"
      const headers = {
        method:'GET',
        headers:{
          'Authorization':'Bearer '+(JSON.parse(localStorage.getItem('taken'))?.accessToken || datag.takel.accessToken)
        }
      }
      try{
        const response = await fetch(lxx,headers)
        const data = await response.json();
        console.log(data.data)
       dataSource3.value = data.data
       console.log("123123")
       console.log(dataSource3.value)
      }catch(error)
      {
        console.log('数据获取失败：', error);
      }
    
  }
  onMounted(()=>{lxxcity()})
onMounted(()=>{lxxapi()})
   const columns8 = [
     {title:"市州", width:"200px",key:"key"},
     {title:"计划处", width:"200px", key:"number",customSlot:"Input2",
     scopedSlots: { customRender: "Input2" }
    },
   ]
   const dataSource8 = ref([
   ])



   const tableRef3 = ref();

  

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

   const columns3 = [
     { fixed: "left",width:"10px", type: "radio", title: "单选" },
     { title:"专业代码", width:"10px", key:"spmcode"},
     { title:"专业名称", width: "10px", key:"spmname" },
     { title:"计划总人数", width: "10px", key:"planned_number" },
   ]



   const selected1 = ref(1);
   const data1 = ref(0);

   return {
    id,
    name,
    baocun,
     handleSelectChange,
     lxxapi,
     columns3,
     dataSource3,
     selectedKeys3,
     getSelectedKeys3,
     getCheckData3,
     tableRef3,
     changeSelectedKeys3,
     clearSelectedKeys3,
     selectedKey3,
     selected1,
     data1,
     columns8,
     dataSource8
   }
 }
}
</script>
<style>
.wordtable{
  display: flex;
  margin: 0 auto;
  justify-content: center;
  margin: 0 at;
  width: 35%;
 box-shadow: 1px 1px 1px 0.5px rgb(151, 151, 151);
 border: 1px solid rgb(135, 135, 135);
}
.boxpp
{
  width: 650px;
  margin-left: 150px;
 margin-right: 30px;
 border: 1px solid rgb(135, 135, 135);
}
.box2
{
 margin-right: 30px;
 border: 1px solid rgb(135, 135, 135);
}
.box3{

 border: 1px solid rgb(135, 135, 135);
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
 justify-content: center;
 align-items: center;
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