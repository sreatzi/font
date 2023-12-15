<template>
  <div class="all1box">
    <div class="xiubox1">
    <span>拟计划数</span> <lay-input v-model="data1" type="number" :max="300" :min="0"></lay-input>
  </div>

  <div class="xiubox2">
    <span>备注</span> <lay-textarea id="ni" placeholder="请输入描述" v-model="declarationRemark"></lay-textarea>
  </div>
  <lay-button style="display: flex; margin: 0 auto;" border="green" @click="stusure">确定</lay-button>
  </div>
  </template>
  
  <script>
  import { ref } from 'vue'
  import { datag } from '@/dataglober.ts';
  import {ppapi} from '../../../public/config'
  import { lxxlcApi,lxxadd,lxxgive,lxxdele,lxxall,lxxflie,lxxshua} from '@/api/api.js';
  export default {
    setup() {
      const data1 =ref(datag.sturow.planned_Number)
    const declarationRemark =ref(datag.sturow.declarationRemark)
      const stusure = async()=>{
         // lxxadd.api(row)
        
        const box1 = document.querySelector('.xiubox1');
        const box2 = document.querySelector('.xiubox2');
        var textareas = document.querySelector(".layui-textarea").value;
        var xuefei = box1.querySelector('input[type="number"]').value;
        if (xuefei===''||xuefei==0||xuefei<0) {
        layer.msg("拟计划数错误 请重新输入")
      }else if((xuefei > datag.onumber * 1.2 || xuefei < datag.onumber * 0.8)&&datag.abnormal==0) 
      {
        layer.msg("拟计划数异常 请上传证明材料")
      }else if(xuefei>500){
        layer.msg("拟计划数不能大于500")
      }else if(textareas.length>50){
        layer.msg("备注不能超过50字")
      }else{
        console.log(datag.onumber)
      const api = ppapi.apiurl+"/api/TranscriptionPlan32/updata_declarationrecord"
      const lxxdata ={
        drid:datag.studrid,
        plannedNumber:xuefei,
        DeclarationRemark: textareas,

    }
  const headers = {
    method:'POST',
    headers:{
      "content-type":"application/json",
      "Authorization":"Bearer "+(JSON.parse(localStorage.getItem('takel'))?.accessToken || datag.takel.accessToken)
    },
    body:JSON.stringify(lxxdata)
  }
  console.log(lxxdata)
  fetch(api,headers)
  .then(response=>response.json())
  .then(data=>{
    layer.msg(data.message)
    lxxshua.api()
  })
  .then(error=>{
   console.log(error)
  })
    }
  }
     
  
      return {
        declarationRemark,
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
  .xiubox3 span{
    margin-top: 10px;
    width: 80px;
  }
  .xiubox4 span{
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
.xiubox4{
  margin-bottom: 10px;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  display: flex;
}
.xiubox3{
  margin-bottom: 10px;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  display: flex;
}
</style>