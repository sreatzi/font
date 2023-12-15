<template>
  <div class="all1box">


  <div class="xiubox2">
    <span>科类</span> 
    <select id="kl" v-model="subjectType">
      <option value="0">初中</option>
      <option value="1">高中文科</option>
      <option value="5">高中理科</option>
    </select>
  </div>
  <div class="xiubox2">
    <span>计划数</span> 
    <input v-model="planned_number" id="planNumber" type="number" max="300" min="0">
  </div>
  <div class="xiubox2">
    <span>专业备注</span>
    <lay-textarea id="ni" placeholder="请输入描述" v-model="data1"></lay-textarea>
   
  </div>   

  <lay-button style="display: flex; margin: 0 auto;" border="green" @click="stusure">确定</lay-button>
  </div>

  </template>
  
  <script>
  import { ref } from 'vue'
  import { datag } from '@/dataglober.ts';
  import { lxxdle,lxxsallhen,lxxshen,lxxflie,lxxHz } from '@/api/api.js';
  import {supapi} from '../../../public/config';
  
  export default {
    setup() {
      const subjectType =ref()
      subjectType.value=datag.rowschool.value.subjectType;
      const planned_number =ref();
      planned_number.value = datag.rowschool.value.planned_number;
     const data1 =ref()
     data1.value = datag.rowschool.value.zybz;
      const stusure = async()=>{
        const kl = document.getElementById("kl").value;
        const planNumber = document.getElementById("planNumber").value;
        var textareas = document.querySelector(".layui-textarea").value;

  // 整合成一个对象

        const formData = {
          PPid:datag.stuppid,
          subjectType: kl,
          Zybz: textareas,
          planned_number:parseInt(planNumber),
          transcribe:1
        };
        if (planNumber===''||planNumber==0||planNumber<0) {
        layer.msg("拟计划数不能输入为0或小于0")
      }
      else if((planNumber > datag.oanumber * 1.2 || planNumber < datag.oanumber * 0.8)&&datag.abnormal==0) 
      {
        layer.msg("拟计划数异常 请上传证明材料")
      }else if(textareas.length>50){
        layer.msg("备注不能超过50字")
      }
      else {
  // 打印对象
console.log(formData)
      const lxx =supapi.supapi+"/api/SecondaryEnrollment/updataprofessionalplan"
      const headers ={
        method:"POST",
        headers:{
            'Authorization':'Bearer '+(JSON.parse(localStorage.getItem('taken'))?.accessToken || datag.takel.accessToken),
            "content-type": "application/json",
      
        },
        body:JSON.stringify(formData)
      }
      fetch(lxx,headers)
        .then(response=>response.json())
        .then(data=>{
            layer.msg(data.message)
            console.log(data)
            lxxHz.api()
        })
        .then(error=>{
            console.log(error)
        })
    
  }
      }
      return {
        data1,
        planned_number,
        subjectType,
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