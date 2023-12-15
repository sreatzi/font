<template>
  <div class="container-demo">
    <lay-field theme="green">
    <template #title >
      欢迎:{{ name }}
    </template>
  </lay-field>
<div class="wordbox">
  <lay-radio 
      v-for="sizeKey of sizeKeys" 
      v-model="sizeSelected" 
      name="action" 
      :value="sizeKey"
       @change="changeSize">
      {{sizeKey}}
    </lay-radio>
    <br><br>
 
  <lay-space :size="spaceSize">
    <div class="box11111">
      
      <lay-radio-button style="   /* 每个盒子占据三分之一的宽度 */
  margin-bottom: 10px;

  box-sizing: border-box; /* 边框和内边距计入盒子的总宽度 */
  display: flex;
  justify-content: center; /* 内容水平居中 */
  align-items: center; /* 内容垂直居中 */
  margin-right: 10px;" type="primary"
   v-model="selected1" name="action" :value="1"
   @change="threetwo(1)"
  >3+2转录计划专业目录核对稿 </lay-radio-button>
    <lay-radio-button  style="   /* 每个盒子占据三分之一的宽度 */
  margin-bottom: 10px;

  box-sizing: border-box; /* 边框和内边距计入盒子的总宽度 */
  display: flex;
  justify-content: center; /* 内容水平居中 */
  align-items: center; /* 内容垂直居中 */
  margin-right: 10px;" type="primary" 
   v-model="selected1" name="action" :value="2"
   @change="threetwo(2)"
  >1+2转录计划专业目录核对稿</lay-radio-button>
    <lay-button style="  f /* 每个盒子占据三分之一的宽度 */
  margin-bottom: 10px;
  border: 1px solid rgb(135, 135, 135);
  box-sizing: border-box; /* 边框和内边距计入盒子的总宽度 */
  display: flex;
  justify-content: center; /* 内容水平居中 */
  align-items: center; /* 内容垂直居中 */
  margin-right: 10px;" type="primary" @click="suc"
  v-model="selected1" name="action" :value="3"
  >核对成功点击</lay-button>
    </div>
    
  </lay-space>
 
</div>
<lay-line  border-style="dashed" border-width="3px" theme="green"></lay-line>
<div class="tablebox">
<lay-table :columns="columns8" :data-source="dataSource8" even></lay-table>
</div>
  </div>
    
  </template>

<script>
import { ref,watch,onMounted } from 'vue';
import { lxxhedui,lxxsuc } from '@/api/api.js';
import { datag } from '@/dataglober.ts';
import {ppapi} from '../../../public/config'
export default {
  
  setup() {
    const id = datag.school.value.userId ? datag.school.value.userId :JSON.parse(localStorage.getItem('school')).userId;
    const name = datag.school.value.schoolName ? datag.school.value.schoolName :JSON.parse(localStorage.getItem('school')).schoolName;
    const selected1 = ref(1);
    const columns8 = [
      {title:"中职专业名称", width:"150px",key:"secondarySchoolPmName"},
      { title:"高职学校名称",width:"150px",key:"higherSchoolName"},
      {title:"高职专业名称",width: "150px",key:"higherPMName"},
      {title:"计划数",width: "150px",key:"plannedNum"},
    
    ]
    var lxxdui;
    const dataSource8 = ref([])
    onMounted(()=>{threetwo(1)})
    
    const threetwo = async(idnex)=>{
      await lxxhedui.api(idnex)
      lxxdui = idnex
      dataSource8.value = datag.stuhedui.value
    }
    const suc = async()=>{
      await lxxsuc.api(lxxdui)
      console.log(datag.result11)
      if(datag.result11 == 0){
        console.log("成功了")
        dataSource8.value=[]
      }else{
        //
      }
     
    }
    
    const sizeKeys = ["xs","sm","md","lg"];
    const spaceSize = ref();
    const sizeSelected = ref("sm");
    const changeSize = function( key ) {spaceSize.value = key;}
    const nm = ref(true)
    const loading = ref(true);
    const active = ref(-1);
    const next = () => {
      if (active.value++ >=2) active.value = 0
    };
    const previous = () => {
      if (active.value-- ===0) active.value = 0
    };
    return {
      id,
      name,
      selected1,
        suc,
        threetwo,
        sizeSelected,
        changeSize,
        spaceSize,
        nm,
        loading,
        active,
        columns8,
      dataSource8
    }
  }
}
</script>
<style>
.tablebox{
  width: 70%;
  display: flex;
  justify-content: center;
  margin: 0 auto;
}

.wordbox{
  display: flex;
  justify-content: center;
   margin: 0 auto;
}
.error-page {
padding-top: 200px;
padding-bottom: 200px;
margin: 10px;

}
.box11111{
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
</style>