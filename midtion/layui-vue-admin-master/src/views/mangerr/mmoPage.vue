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
    <lay-radio-button  v-model="selected1" name="action" :value="1" type="primary" @change="puT">中职普通转录计划专业目录核对稿 </lay-radio-button>
    <lay-radio-button  v-model="selected1" name="action" :value="2" type="primary" @change="yiT">艺体类转录计划专业目录核对稿</lay-radio-button>
    <lay-radio-button  v-model="selected1" name="action" :value="3" type="primary" @change="hzZ">高中中专计划专业目录核对稿</lay-radio-button>
    <lay-radio-button  v-model="selected1" name="action" :value="4" type="primary" @change="ontw">1+2计划专业目录核对稿</lay-radio-button>
    <lay-radio-button  v-model="selected1" name="action" :value="5" type="primary" @change="sucee">核对成功点击</lay-radio-button>
  </lay-space>
 
</div>
<lay-line  border-style="dashed" border-width="3px" theme="green"></lay-line>
<div class="tablebox">
<lay-table :columns="columns8" :data-source="dataSource8" even></lay-table>
</div>

  </div>
    
  </template>

<script>
  import { ref, watch, reactive,h, resolveComponent,onMounted,defineAsyncComponent  } from 'vue';
  import { layer } from '@layui/layui-vue';
import { datag } from '@/dataglober.ts';
import { lxxhedui,lxxheduisusec } from '@/api/api.js';
import {supapi} from '../../../public/config';
export default {
  
  setup() {
    const selected1 = ref(1);
    var newValue;
    const id = datag.school.value.userId || (JSON.parse(localStorage.getItem('schooll')) || {}).userId || '无';
const name = datag.school.value.schoolName || (JSON.parse(localStorage.getItem('schooll')) || {}).schoolName || '无';
    const sucee = async()=>{
      console.log(newValue)
     lxxheduisusec.api(newValue)
     dataSource8.value = datag.stuhedui.value
     console.log(dataSource8.value)
    }
  onMounted(()=>{puT()})
    const puT = async () => {
  dataSource8.value = [];
  newValue = 2;
  await lxxhedui.api(newValue);
  console.log(dataSource8.value);
  if (datag.stuhedui.value == null) {
    layer.msg("数据为空，请稍等");
  } else {
    dataSource8.value = datag.stuhedui.value;
  }
};
    const yiT = async()=>{
      dataSource8.value=[]
      newValue = 3
      await lxxhedui.api(newValue);
      console.log(dataSource8.value)
      if(datag.stuhedui.value==null){
      layer.msg("数据为空 请稍等")
     }else{
      dataSource8.value = datag.stuhedui.value
     }
    }
    const hzZ = async()=>{
      dataSource8.value=[]
      newValue = 4
      await lxxhedui.api(newValue);
      console.log(datag.stuhedui.value)
      if(datag.stuhedui.value==null){
      layer.msg("数据为空 请稍等")
     }else{
      dataSource8.value = datag.stuhedui.value
     }
    }

    const ontw = async()=>{
      dataSource8.value=[]
      newValue = 1
      await lxxhedui.api(newValue);
      console.log(dataSource8.value)
      if(datag.stuhedui.value==null){
      layer.msg("数据为空 请稍等")
     }else{
      dataSource8.value = datag.stuhedui.value
     }
    }

    const columns8 = [
      {title:"专业代码", width:"150px",key:"spmcode"},
      { title:"专业名称",width:"150px",key:"spmname"},
      {title:"原计划数",width: "150px",key:"orginal_plan_number"},
      {title:"拟计划数",width: "150px",key:"plannedNum"},
    
    ]
    const dataSource8 = ref([])



    const sizeKeys = ["xs","sm","md","lg"];
    const spaceSize = ref();

    const sizeSelected = ref("sm");
    const changeSize = function( key ) {
      spaceSize.value = key;
    }
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
      sucee,
      ontw,
      puT,
      yiT,
      hzZ,
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
  width: 900px;
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