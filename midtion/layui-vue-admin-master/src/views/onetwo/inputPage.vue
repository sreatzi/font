<template>
  <div class="all1box">
  <div class="xiubox2">
    <span>艺体代码</span>
    <select id="ytdm" v-model="ytdm">
      <option value="1">艺术</option>
      <option value="2">体育</option>
    </select>
  </div>
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
    <span>文化程度</span>
    <select id="whcddm" v-model="whcddm">
      <option value="1">初中毕业生</option>
      <option value="2">初中在校生</option>
      <option value="3">小学毕业生</option>
      <option value="4">小学在校生</option>
      <option value="5">高中毕业生(文科)</option>
      <option value="6">高中毕业生（理科） </option>
      <option value="7">高中毕业生（不区分文理科）</option>
    </select>
  </div>
  <div class="xiubox2">
    <span>专业类别</span>
    <select id="zylbdm" v-model="zylbdm">
      <option value="A">美术</option>
      <option value="B">音乐学(音乐教育)</option>
      <option value="C">音乐史论</option>
      <option value="D">录音艺术</option>
      <option value="E">作曲与作曲技术理论</option>
      <option value="F">音乐表演 </option>
      <option value="G">戏剧影视表演</option>
      <option value="H">播音与主持</option>
      <option value="I">舞蹈</option>
      <option value="J">服装表演</option>
      <option value="K">戏曲表演</option>
      <option value="L">广电编导</option>
      <option value="P">杂技与魔术表演</option>
      <option value="Q">文化服务</option>
      <option value="R">木偶与皮影表演及制作</option>
      <option value="S">导游</option>
      <option value="T">体育</option>
    </select>
  </div>
  <div class="xiubox2">
    <span>是否幼功</span>
    <select id="isJuvenileWorker" v-model="isJuvenileWorker">
      <option value="1">是</option>
      <option value="0">否</option>
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
    <input v-model="schoolSystem" id="schoolSystem" type="number">
    
   
  </div>
 
  <div class="xiubox2">
    <span>学费</span> 
    <input v-model="xuefei" id="tuition" type="number" max="300" min="0">
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
  import { lxxdle,lxxsallhen,lxxshen,lxxflie,lxxshuart } from '@/api/api.js';
  export default {
    setup() {
      const data1 =ref()
      data1.value = datag.rowschool.value.zybz;
      const xuefei = ref()
      xuefei.value = datag.rowschool.value.tuition
      const schoolSystem = ref()
      schoolSystem.value = datag.rowschool.value.schoolSystem
      const xxxsdm =ref()
      xxxsdm.value = datag.rowschool.value.xxxsdm
      const isJuvenileWorker=ref()
      isJuvenileWorker.value=datag.rowschool.value.isJuvenileWorker
      const zylbdm =ref()
      zylbdm.value = datag.rowschool.value.zylbdm
      const whcddm=ref()
      whcddm.value = datag.rowschool.value.whcddm
      const zslbdm=ref()
      zslbdm.value = datag.rowschool.value.zslbdm
      const ytdm=ref()
      ytdm.value = datag.rowschool.value.ytdm

      const stusure = async()=>{
        const tuition = document.getElementById("tuition").value;
        const ytdm = document.getElementById("ytdm").value;
        const zslbdm = document.getElementById("zslbdm").value;
        const whcddm = document.getElementById("whcddm").value;
        const zylbdm = document.getElementById("zylbdm").value;
        const isJuvenileWorker = document.getElementById("isJuvenileWorker").value;
        const xxxsdm = document.getElementById("xxxsdm").value;
        const schoolSystem = document.getElementById("schoolSystem").value;
        var textareas = document.querySelector(".layui-textarea").value;

  // 整合成一个对象
  if(textareas.length>50){
        layer.msg("备注不能超过50字")
      }
      else if(schoolSystem<0||schoolSystem==''){
        layer.msg("学制异常 请重新输入")
      }
      else if(tuition<0||tuition==''){
        layer.msg("学费异常 请重新输入")
      }
      else{
        const formData = {
          PPid:datag.stuppid,
          ytdm: ytdm,
          zslbdm: zslbdm,
          whcddm: whcddm,
          zylbdm: zylbdm,
          xxxsdm: xxxsdm,
          isJuvenileWorker:isJuvenileWorker,
          schoolSystem: schoolSystem,
          tuition: tuition,
          Zybz: textareas,
          transcribe:3
        };

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
            lxxshuart.api()
        })
        .then(error=>{
            console.log(error)
        })
    }
     
      }
      return {
        schoolSystem,
        ytdm,
        zslbdm,
        whcddm,
        zylbdm,
        isJuvenileWorker,
        xxxsdm,
        xuefei,
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