<template>
    <div class="container-demo">
      <lay-field theme="green">
    <template #title >
      欢迎:{{ name }}
    </template>
  </lay-field>
  <lay-line  border-style="dashed" border-width="3px" theme="green"></lay-line>
    
    <lay-step :active="active" center>
        <lay-step-item title="" content="">申报<span style="color: red;">{{ word5 }}</span>专业<span style="color: blue;">{{ word6 }}</span>个转录学生信息
            <template #pace>    
                <lay-icon type="layui-icon-ok"></lay-icon>
                
            </template>
        </lay-step-item>
        <lay-step-item title="" content="初审"></lay-step-item>
        <lay-step-item title="" content="待核对"></lay-step-item>
        <lay-step-item title="" content="已退回"></lay-step-item>
        <lay-step-item title="" content="待定稿"></lay-step-item>
        <lay-step-item title="" content="已完成"></lay-step-item>
    </lay-step>
    <lay-space direction="vertical" fill>
 
      <lay-line  border-style="dashed" border-width="3px" theme="green"></lay-line>
</lay-space>
  
<lay-quote  style="width: 120px;"> 计划处  <p>·耗时{{ time }}</p></lay-quote>

<lay-quote style="width: 200px;">{{principal}} 时间{{ date }}</lay-quote>
<lay-line  border-style="dashed" border-width="3px" theme="green"></lay-line>
</div>

</template>
<script>
import { ref, reactive, onMounted } from 'vue';
import { datag } from '@/dataglober.ts';
import { lxxJAPi } from '@/api/api.js';
import {ppapi} from '../../../public/config'

export default {
  // data() {
  //   return {
  //     time:datag.home.elapsed_Time,
  //     word5: datag.home.declaredNumber,
  //     principal:datag.home.principal,
  //     date: datag.home.first_Time,
  //     word6: datag.home.studentNumber,
  //   };
  // },
  setup() {
    const id = datag.school.value.userId ? datag.school.value.userId :JSON.parse(localStorage.getItem('school')).userId;
    const name = datag.school.value.schoolName ? datag.school.value.schoolName :JSON.parse(localStorage.getItem('school')).schoolName;
    console.log(JSON.parse(localStorage.getItem('school')))
    const time = ref(datag.home.elapsed_Time);
    const word5 = ref(datag.home.declaredNumber);
    const principal = ref(datag.home.principal);
    const date = ref(datag.home.first_Time);
    const word6 = ref(datag.home.studentNumber);
    const lxxJ = async()=>{
      const api = ppapi.apiurl + '/api/HomePage/gethomepagedata';
    const headers = {
      method: 'GET',
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzOTc1IiwibmFtZSI6IjE0MzkzIiwidXNlcmlkIjoiMzk3NSIsImFjY291bnQiOiIxNDM5MyIsInVzZXJ0eXBlIjoiMCIsImVtaWFsIjoiIiwicGhvbmUiOiIiLCJzY2hvb2x0eXBlIjoiMSIsInNjaG9vbG5hbWUiOiLlt53ljJflubzlhL_luIjojIPpq5jnrYnkuJPnp5HlrabmoKEiLCJuYmYiOjE2OTk3NTUxMDMsImV4cCI6MTczMTI5MTEwMywiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDY1IiwiYXVkIjoiSFNDbGllbnQifQ.5G_Q4leGvJ7SWzh9AgKOv_nqGpSfUJizukSUKZ0CZ70"
      }
    };

    try {
      const response = await fetch(api, headers);
      const data = await response.json();
      datag.home = data.data;
      console.log(data)
      time.value = datag.home.elapsed_Time;
      word5.value = datag.home.declaredNumber;
      principal.value = datag.home.principal;
      date.value = datag.home.first_Time;
      word6.value = datag.home.studentNumber;
    } catch (error) {
      console.log(error, "链接失败");
    }
      console.log(datag.home)
    }
    const nm = ref(true)
    const loading = ref(true);
    
    const active = ref(datag.home.node);
    const next = () => {
      if (active.value++ >=2) active.value = 0
    };
    const previous = () => {
      if (active.value-- ===0) active.value = 0
    };
    onMounted(() => {
      lxxJ();
    });
    return {
      id,
      name,
      time,
      word5,
      principal,
      date,
      word6,
      lxxJ,
        nm,
        loading,
        active
    }
  }
}
</script>
<style>
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