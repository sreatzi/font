<template>
  <div class="all1box">
  
 
  <div class="xiubox2">
    <span>招生类别</span> 
    <select id="zslbdm" v-model="zslbdm">
      <option value="1">五年制高职（师范类）</option>
      <option value="2">五年制高职（非师范类）</option>
      <option value="3">中职（非师范类）</option>
      <option value="4">中职（非师范类）</option>
      <option value="5">职高（师范类）</option>
      <option value="6">职高（非师范类） </option>
      <option value="7">技工学校</option>
    </select>
  </div>

  <div class="xiubox2">
    <span>科类</span> 
    <select id="kl" v-model="kl">
      <option value="0">初中</option>
      <option value="1">高中文科</option>
      <option value="5">高中理科</option>
    </select>
  </div>
  <div class="xiubox2">
    <span>学习形式</span> 
    <select id="xxxsdm" v-model="xxxsdm">
      <option value="1">脱产</option>
      <option value="2">业余</option>
      <option value="3">函授</option>
    </select>
  </div>
  <div class="xiubox2">
    <span>学制</span> 
    <input v-model="schoolSystem" id="schoolSystem" type="number" max="300" min="100">
  </div>
  <div class="xiubox2">
    <span>计划数</span> 
    <input v-model="planNumber" id="planNumber" type="number" max="300" min="100">
  </div>
  <div class="xiubox2">
    <span>学费</span> 
    <input v-model="tuition" id="tuition" type="number" max="300" min="100">
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
  import {supapi} from '../../../public/config';
  import { lxxdle,lxxsallhen,lxxshen,lxxflie,lxxmo } from '@/api/api.js';
import { layer } from '@layui/layui-vue';
  export default {
    setup() {
      const data1 =ref()
      data1.value = datag.rowschool.value.zybz;
      const zslbdm =ref()
      zslbdm.value = datag.rowschool.value.zslbdm;
      const kl =ref()
      kl.value = datag.rowschool.value.subjectType
      const xxxsdm =ref()
      xxxsdm.value= datag.rowschool.value.xxxsdm
      const schoolSystem =ref()
      schoolSystem.value =  datag.rowschool.value.schoolSystem
      const planNumber =ref()
      planNumber.value = datag.rowschool.value.planned_number
      const tuition =ref()
      tuition.value =  datag.rowschool.value.tuition

      const stusure = async()=>{
    const tuition = document.getElementById('tuition').value;
    const zslbdm = document.getElementById('zslbdm').value;
    const xxxsdm = document.getElementById('xxxsdm').value;
    const schoolSystem = document.getElementById('schoolSystem').value;
    const kl = document.getElementById('kl').value;
    const planNumber = document.getElementById('planNumber').value;
    var textareas = document.querySelector(".layui-textarea").value;

    // 创建包含获取的值的对象
    const formData = {
      PPid:datag.stuppid,
      tuition:tuition,
      zslbdm:zslbdm,
      xxxsdm:xxxsdm,
      schoolSystem:schoolSystem,
      subjectType:kl,
      planned_number:planNumber,
      zybz:textareas
    };

  // 打印对象
console.log(formData)
      if (planNumber===''||planNumber==0) {
        layer.msg("拟计划数不能输入为0")
      }else if(tuition<0||tuition==''||tuition==0)
      {
        layer.msg("学费异常 请重新输入")
      }
      else if(schoolSystem<0||schoolSystem==''||schoolSystem==0)
      {
        layer.msg("学制异常 请重新输入")
      }
      else if(planNumber<0){
        layer.msg("拟计划数不能小于0")
      }
      else if((planNumber > datag.oanumber * 1.2 || planNumber < datag.oanumber * 0.8)&&datag.abnormal==0) 
      {
        layer.msg("拟计划数异常 请上传证明材料")
      }else if(textareas.length>50){
        layer.msg("备注不能超过50字")
      }
      else {
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
            lxxmo.api()
        })
        .then(error=>{
            console.log(error)
        })
    }
     
      }
      return {
        planNumber,
        xxxsdm,
        tuition,
        schoolSystem,
        kl,
        zslbdm,
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