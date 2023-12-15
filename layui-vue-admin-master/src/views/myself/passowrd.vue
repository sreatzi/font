<template>
  <div class="container-demo">
    <lay-field theme="green">
    <template #title >
      欢迎:{{ name }}
    </template>
  </lay-field>
  
  <lay-line  border-style="#e6e6e6" border-width="3px" theme="green"><p style="background-color: #e6e6e6; font-size: 25px;">个人信息</p></lay-line>
  <div class="adaptive-container">
  <lay-line class="line" border-style="dashed" border-width="1px" theme="green"></lay-line>
  <div class="form-item">
    <p>旧密码:</p>
    <lay-input id="old" placeholder="旧密码" v-model="oldpass"></lay-input>
  </div>
  <lay-line class="line" border-style="dashed" border-width="1px" theme="green"></lay-line>
  <div class="form-item">
    <p>新密码:</p>
    <lay-input id="newpas" placeholder="新密码"></lay-input>
  </div>
  <lay-line class="line" border-style="dashed" border-width="1px" theme="green"></lay-line>
  <div class="form-item">
    <p>确认密码:</p>
    <lay-input id="surepas" placeholder="确认密码"></lay-input>
  </div>
  <lay-line class="line" border-style="dashed" border-width="1px" theme="green"></lay-line>
  <lay-button class="submit-button" border="green" @click="sure">提交</lay-button>
</div>
  </div>
  </template>

<script>
import { ref } from 'vue';
import { lxxsure1 } from '@/api/api.js';
import { datag } from '@/dataglober.ts';
import {ppapi} from '../../../public/config'
export default {
 
  setup() {
    const oldpass =ref(0)
    const id = datag.school.value.userId ? datag.school.value.userId :JSON.parse(localStorage.getItem('school')).userId;
    const name = datag.school.value.schoolName ? datag.school.value.schoolName :JSON.parse(localStorage.getItem('school')).schoolName;
    oldpass.value =  datag.passworddd ?  datag.passworddd : JSON.parse(localStorage.getItem('password'));
    console.log(datag.passworddd)
    console.log(JSON.parse(localStorage.getItem('password')))
  const sure = async()=>{
    var Password = document.querySelector('#surepas')
    var newpas = document.querySelector('#newpas')
    var old = document.querySelector('#old')
    
    const inputElement2 = newpas.querySelector('input').value;
    const inputElement1 = Password.querySelector('input').value;
    const inputElement3 = old.querySelector('input').value;
    if (inputElement1 === inputElement2 && inputElement3===oldpass.value && inputElement1!='' && inputElement3!='') {  
          const api =ppapi.apiurl+"/api/User/update"
            const lxxdata = {
              Password:inputElement1,
              type:3
            }
            console.log(lxxdata)
            const headers ={
              method:'POST',
              headers:{
                'Content-Type': 'application/json',
                "Authorization":"Bearer "+(JSON.parse(localStorage.getItem('takel'))?.accessToken || datag.takel.accessToken)
              },
              body:JSON.stringify(lxxdata)
            }
            console.log(lxxdata)
            fetch(api,headers)
            .then(response=>response.json())
            .then(data=>{
              console.log(data)
              layer.msg(data.message)
              datag.passworddd=inputElement1,
              localStorage.setItem('password', JSON.stringify(datag.passworddd));
              router.push('/login')
            })
            .then(error=>{
              console.log(error)
            })
        } else if(inputElement1 !== inputElement2) {
         layer.msg("请重新确认密码是否相同")
        } else if(inputElement3!==oldpass.value){
          layer.msg("与旧密码不相同")
        }else{
          layer.msg("不能输入为空")
        }
            
  }
  return{
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
.nopbox{
  
  width: 34%;
  display: block;
  margin: 25px auto;
}
.adaptive-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-item {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.line {
  width: 100%;
  margin: 5px 0;
}

.submit-button {
  margin-top: 10px;
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