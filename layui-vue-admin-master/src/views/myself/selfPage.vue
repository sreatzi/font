<template>
  <div class="container-demo">
    <lay-field theme="green">
    <template #title >
      欢迎:{{ name }}
    </template>
  </lay-field>
  
  <lay-line  border-style="#e6e6e6" border-width="3px" theme="green"><p style="background-color: #e6e6e6; font-size: 25px;">个人信息</p></lay-line>
  <div class="adaptive-container">
  <div class="form-item">
    <p>手机号:</p>
    <lay-input id="phone" placeholder="手机号"
    v-model="phone"
    >
    </lay-input>
  </div>
  <lay-line class="line" border-style="dashed" border-width="1px" theme="green"></lay-line>
  <div class="form-item">
    <p>Email:</p>
    <lay-input id="Email" placeholder="Email"
    v-model="email"
    ></lay-input>
  </div>
  <lay-line class="line" border-style="dashed" border-width="1px" theme="green"></lay-line>
  <div class="form-item">
    <p>高职国标码:</p>
    <lay-input id="highcode" placeholder="高职国标码"
    v-model="countryCode"
    ></lay-input>
  </div>
  <lay-line class="line" border-style="dashed" border-width="1px" theme="green"></lay-line>
  <div class="form-item">
    <p>负责人:</p>
    <lay-input id="Principal" placeholder="负责人"
    v-model="principal"
    ></lay-input>
  </div>
  <lay-line class="line" border-style="dashed" border-width="1px" theme="green"></lay-line>
  <lay-button class="submit-button" border="green" @click="sure">提交</lay-button>
</div>
  </div>
  </template>

<script>
import { onMounted, ref } from 'vue';
import { lxxsure1,lxxperson } from '@/api/api.js';
import { datag } from '@/dataglober.ts';
import {ppapi} from '../../../public/config'
export default {
  
  setup() {
    onMounted(()=>{ llll()})
    const countryCode=ref()
    const email=ref()
    const phone=ref()
    const principal =ref()
    const llll=async()=>{
      const lxx = ppapi.apiurl+"/api/User/getuserdata"
    const headers = {
      method:'GET',
      headers:{
        'Authorization':'Bearer '+(JSON.parse(localStorage.getItem('takel'))?.accessToken || datag.takel.accessToken)
      }
    }
    try{
      const response = await fetch(lxx,headers)
      const data = await response.json()
      countryCode.value = data.data.countryCode
      email.value  = data.data.email
      phone.value = data.data.phone
      principal.value  = data.data.principal
      console.log(data)
    }catch(error)
    {
      console.log('数据获取失败：', error);
    }
    }
    
    const id = datag.school.value.userId ? datag.school.value.userId :JSON.parse(localStorage.getItem('school')).userId;
    const name = datag.school.value.schoolName ? datag.school.value.schoolName :JSON.parse(localStorage.getItem('school')).schoolName;
  const sure = async()=>{
    
    var Phone = document.querySelector('#phone')
    var Email = document.querySelector('#Email')
    var Principal = document.querySelector('#Principal')
    var ccccc = document.querySelector('#highcode')
    const inputElement1 = ccccc.querySelector('input').value;
    const inputElement2 = Phone.querySelector('input').value;
    const inputElement3 = Email.querySelector('input').value;
    const inputElement4 = Principal.querySelector('input').value;
    lxxsure1.api(inputElement1,inputElement2,inputElement3,inputElement4)
  }
  return{
    llll,
    countryCode,
    email,
    phone,
    principal,
    id,
    name,
    sure,
  }
  }

}
</script>
<style>
.layui-line-text{
  background-color: #e6e6e6;
}
.adaptive-container {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-item {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}
.form-item p{
  width: 150px;
}
.line {
  width: 100%;
  margin: 5px 0;
}

.submit-button {
  margin-top: 10px;
}
.nopbox{
  
  width: 34%;
  display: block;
  margin: 25px auto;
}
.nopbox div{
  display: flex;
  
}
.nopbox div p{
  display: flex;
  justify-content: center;
  align-items: center;
text-align: center;
}
.nopbox .layui-input{
  width: 80%;
  display: flex;
  margin: 10px auto;
  background-color: white;
  border: none;
  justify-content: flex-end;
  margin-left: auto; /* 新增的样式 */
}
.layui-input input{
  justify-content: flex-end;
  margin-left: auto; /* 新增的样式 */
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