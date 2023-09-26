<template>
  <div>
    <div id="bgd-box">
      <div class="container" id="container">
        <div class="bgd">
          <div class="green-box" id="green-box">
            <div class="topb"></div>
            <p class="top1">中职计划上报审核系统</p>
            <input type="text" v-model="username" placeholder="用户名" id="username" />
            <input type="password" v-model="password" placeholder="密码" id="password" /><br>
            <button class="login-button" @click="callAPI">登录</button>
          </div>
        </div>
      </div>
    </div>

    <div class="bgd-box1" id="bgd-box1">
      <div class="content1" id="content1">
        <div class="bcgd1" id="bcgd1">
          <div class="logon1">
            <div class="topb1"></div>
            <p class="top-1">中职计划上报审核系统</p>
            <p class="top-2">初次登陆必须修改密码</p>
            <input class="pw1" id="principal" type="text" name="username" placeholder="请输入负责人" >
            <input class="pw1" id="old" type="text" name="username" placeholder="请输入旧密码">
            <input class="pw1" id="email" type="text" name="username" placeholder="请输入Email">
            <input class="pw1" id="phone"  type="text" name="username" placeholder="请输入手机号">
            <input class="pw1" id="name" type="text" name="username" placeholder="请输入用户名">
            <input class="pw1" id="new-pas"  type="password" name="password" placeholder="请输入新密码"><br>
            <input class="pw1" id="sure-pas"  type="password" name="password" placeholder="请确认密码"><br>
            <button class="login-button1" @click="callAPI1()">确认修改</button>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import {data1} from '@/components/globel/glober.ts'
export default {
created() {
  this.$router = useRouter();
},
// ...



data() {
  return {
    username: '',
    password: ''
  }
},

methods: {
  async callAPI1() {
    const apiUrl1 = "http://192.168.1.114:5230/api/User/update";
    const password = this.password;
    const principal = document.getElementById("principal").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    const data = {
      Password: password,
      Phone: phone,
      Email: email,
      Principal: principal
    };

    const requestOptions1 = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "*/*",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6ImFkbWluIiwidXNlcmlkIjoiMSIsImFjY291dCI6ImFkbWluIiwidXNlcnR5cGUiOiIyIiwiZW1pYWwiOiJzdHJpbmciLCJwaG9uZSI6IjExIiwic2Nob29sdHlwZSI6IjAiLCJzY2hvb2xuYW1lIjoiIiwibmJmIjoxNjk0MTQ3MTE1LCJleHAiOjE3MjU2ODMxMTUsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTA2NSIsImF1ZCI6IkhTQ2xpZW50In0.2G4skJyeSuXCvyHcIqfNAgiyGLUPn_1S83YlVIqN4hE"
      },
      body: JSON.stringify(data)
    };

    try {
      const response = await fetch(apiUrl1, requestOptions1);
      if (!response.ok) {
        throw new Error("请求失败");
      }
      const responseData = await response.json();
      console.log("连接成功", responseData);
      window.location.href = "other-page.html";
      if (responseData.result == 0) {
        alert("修改成功");
        this.$router.push({ path: '/firstPage' })
  
      } else {
        alert("失败");
      }
    } catch (error) {
      console.log("连接失败", error);
    }
  },
  chu_1() {
    
    document.getElementById("bgd-box").style.width = "1px";
    document.getElementById("bgd-box").style.zIndex = "-2";
    document.getElementById("container").style.zIndex = "-3";
    document.getElementById("green-box").style.zIndex = "-4";
    document.getElementById("green-box").style.height = "1px";
    document.getElementById("container").style.width = "1px";
    document.getElementById("bgd-box").style.opacity = "0";
    document.getElementById("bgd-box1").style.zIndex = "2";
    document.getElementById("bgd-box1").style.opacity = "1";
    document.getElementById("bcgd1").style.zIndex = "2";
    document.getElementById("bgd-box1").style.opacity = "1";
    document.getElementById("content1").style.zIndex = "1";
    document.getElementById("bgd-box1").style.transform = "opacity 0.3s ease-in";
    document.getElementById("bgd-box").style.transform = "opacity 0.3s ease-in";
  },
  async callAPI() {
   
    const apiUrl = "http://192.168.1.116:5230/api/OAuth/login";

    const password = this.password;
    const username = this.username;

    const user_model = {
      Account: username,
      Password: password
    };

    console.log(user_model);

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "*/*"
      },
      body: JSON.stringify(user_model)
    };

    try {
      const response = await fetch(apiUrl, requestOptions);
      if (!response.ok) {
        throw new Error("请求失败");
      }
    else
{
  
  const responseData = await response.json();
  console.log("连接成功", responseData);
  if (responseData.result === 0) {
    
    if (responseData.data.userType === 0) {
        if (responseData.data.first === 1) {
          this.$router.push({ path: '/firstPage' })
  
        }else{
         this.chu_1()
        }
      }
      else{
        alert("登陆失败")
      }
    }
      

}      
      

      
    } catch (error) {
      console.log("连接失败", error);
    }
  }
}
}


</script>

<style scoped>
@import './pop/flex-main.css';

/* 其他样式 */
</style>


