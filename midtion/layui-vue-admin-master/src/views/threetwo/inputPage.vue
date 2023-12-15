<template>
  <div class="all1box">
    <div class="xiubox1">
    <span>学费</span> <lay-input 
    v-model="data1" type="number" :max="300" :min="0"></lay-input>
  </div>

  <div class="xiubox2">
    <span>专业备注</span>
   <lay-textarea id="ni" v-model="zybz" placeholder="请输入描述"></lay-textarea>
  </div>
 
  <lay-button style="display: flex; margin: 0 auto;" border="green" @click="stusure">确定</lay-button>
  </div>

  </template>
  
  <script>
  import { ref } from 'vue'
  import { datag } from '@/dataglober.ts';
  import { lxxdle,lxxsallhen,lxxshen,lxxflie,lxxshuapu } from '@/api/api.js';
import { layer } from '@layui/layui-vue';
import {supapi} from '../../../public/config';
  export default {
    setup() {
      const data1 =ref()
      data1.value=datag.rowschool.value.tuition
      const zybz =ref()
      zybz.value = datag.rowschool.value.zybz
      const stusure = async()=>{
        console.log(datag.rowschool.value)
        const box1 = document.querySelector('.xiubox1');
        const box2 = document.querySelector('.xiubox2');
       
      var xuefei = box1.querySelector('input[type="number"]').value;
      var textareas = document.querySelector(".layui-textarea").value;
      if(textareas.length>50){
        layer.msg("备注不能超过50字")
      }else if(xuefei<0){
        layer.msg("学费异常 重新输入")
      }else{
      const lxx = supapi.supapi + "/api/SecondaryEnrollment/updataprofessionalplan"
      const lxxdata = {
        Tuition:xuefei,
        Zybz:textareas,
        PPid:datag.stuppid,
        transcribe:2
      }
      const headers = {
        method:"POST",
        headers:{
          'Authorization':'Bearer '+(JSON.parse(localStorage.getItem('taken'))?.accessToken || datag.takel.accessToken),
          "content-type": "application/json"
        },
        body:JSON.stringify(lxxdata)
      }
   fetch(lxx,headers)
   .then(response=>response.json())
   .then(data=>{
    layer.msg(data.message)
    lxxshuapu.api()
   })
   .then(error=>{
   console.log(error)
   })
    }
  }
  
      return {
        zybz,
        data1,
      stusure,
      }
    }
  }
  </script>
  <style>
  .all1box{
    width: 300px;
  }
  .xiubox1 span{
    margin-top: 10px;
    width: 80px;
  }
  .xiubox2 span{
    margin-top: 10px;
    width: 80px;
  }
.xiubox1{
  margin-bottom: 10px;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  display: flex;
}
.xiubox2{
  margin-bottom: 10px;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  display: flex;
}
</style>