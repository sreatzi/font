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
  <lay-input 
    id="phone"
    placeholder="手机号" 
    v-model="phone"
    >
  </lay-input>
</div>
<lay-line  border-style="dashed" border-width="1px" theme="green"></lay-line>
<div class="form-item">
  <p>Email:</p>
  <lay-input id="Email"
  
    placeholder="Email" 
    v-model="email"
    >
  </lay-input>
</div>
<lay-line  border-style="dashed" border-width="1px" theme="green"></lay-line>
<div class="form-item">
  <p>旧密码:</p>
  <lay-input 
  id="old"
  placeholder="旧密码" 
  v-model="oldpass"
></lay-input>
</div>
<lay-line  border-style="dashed" border-width="1px" theme="green"></lay-line>
<div class="form-item"> 
  <p>新密码:</p>
  <lay-input 
  id="newpas"
    placeholder="新密码" 
    
    >
  </lay-input>
</div>
<lay-line  border-style="dashed" border-width="1px" theme="green"></lay-line>
<div class="form-item">
  <p>确认密码:</p>
  <lay-input 
  id="surepas"
  
    placeholder="确认密码" 
    
    >
  </lay-input>
</div>
<lay-line  border-style="dashed" border-width="1px" theme="green"></lay-line>
<div class="form-item">
  <p>高职国标码:</p>
  <lay-input 
    id="highcode"
    placeholder="高职国标码" 
    v-model="countryCode"
    >
  </lay-input>
</div>
<lay-line  border-style="dashed" border-width="1px" theme="green"></lay-line>
<div class="form-item">
  <p>负责人:</p>
  <lay-input 
    id="Principal"
    placeholder="负责人" 
    v-model="principal"
    >
  </lay-input>
</div>
<lay-line  border-style="dashed" border-width="1px" theme="green"></lay-line>
<lay-button style="display: flex; margin: 0 auto;" border="green" @click="sure">提交</lay-button>
</div>
  </div>
  </template>

<script>
import { ref,onMounted } from 'vue';
import {supapi} from '../../../public/config';
import { lxxsure } from '@/api/api.js';
import { datag } from '@/dataglober.ts';
import { useRouter } from 'vue-router'
export default {
  
  setup() {
    const router = useRouter()
     const id = datag.school.value.userId || (JSON.parse(localStorage.getItem('schooll')) || {}).userId || '无';
const name = datag.school.value.schoolName || (JSON.parse(localStorage.getItem('schooll')) || {}).schoolName || '无';
    const oldpass=ref(0);
    onMounted(()=>{ llll()})
    const countryCode=ref()
    const email=ref()
    const phone=ref()
    const principal =ref()
    const llll=async()=>{
      const lxx = supapi.supapi+"/api/User/getuserdata"
    const headers = {
      method:'GET',
      headers:{
        "Authorization":"Bearer "+(JSON.parse(localStorage.getItem('taken'))?.accessToken || datag.takel.accessToken),
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
    oldpass.value = datag.password ? datag.password : JSON.parse(localStorage.getItem('password'));
    console.log(datag.password)
    console.log(JSON.parse(localStorage.getItem('password')))
  const sure = async()=>{
    var Password = document.querySelector('#surepas')
    var Phone = document.querySelector('#phone')
    var Email = document.querySelector('#Email')
    var ccccc = document.querySelector('#highcode')
    var Principal = document.querySelector('#Principal')
    const inputElement1 = Password.querySelector('input').value;
    const inputElement2 = Phone.querySelector('input').value;
    const inputElement3 = Email.querySelector('input').value;
    const inputElement4 = Principal.querySelector('input').value;
    const inputElement5 = ccccc.querySelector('input').value;
    router.push('/main')
    lxxsure.api(inputElement1,inputElement2,inputElement3,inputElement4,inputElement5)
  }
  return{
    router,
    principal,
    phone,
    email,
    countryCode,
    llll,
    id,
    name,
    oldpass,
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
.layui-line-text{
  background-color: #e6e6e6;
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