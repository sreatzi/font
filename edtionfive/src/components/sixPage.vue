<template>
       <div class="pop-box">
        <div class="input-box">
<p class="red">*</p><p class="word" >手机号:</p>
<input type="text" placeholder="136XXXXXXX" id="Phone">
        </div>


        <div class="input-box">
            <p class="red">*</p><p class="word" >Email:</p>
            <input id="Email" type="text" class="input3" placeholder="admin@axureux.com">
        </div  >


        <div class="input-box">
            <p class="red">*</p><p class="word" >旧密码:</p>
            <input type="text" class="input1" id="oldPassword">
        </div>


        <div class="input-box">
            <p class="red">*</p><p class="word" >新密码:</p>
            <input type="text" class="input1" id="newPassword">
        </div>


        <div class="input-box">
            <p class="red">*</p><p class="word" >确认密码:</p>
            <input type="text" class="input2" id="Password">
        </div>

        <div class="input-box">
            <p class="red">*</p><p class="word">负责人:</p>
            <input type="text" class="input1"  id="Principal">
        </div>
    </div>
    <div class="tjiao">
    <button class="on-c" @click="LXX">提交</button>
</div>


</template>
<script>
import {data1} from './globel/glober.ts'

export default {
data(){
    return{
        Password:'',
        Phone:'',
        Email:'',
        Principal:'',
    }
},
    mounted(){
    this.LXX()
},
 methods:{
    LXX(){
        const Password = document.getElementById("Password").value;
        const Phone = document.getElementById("Phone").value;
        const Email = document.getElementById("Email").value;
        const Principal = document.getElementById("Principal").value;

    const lxxApi = "http://192.168.1.116:5230/api/User/update"
    const lxxdata = {
     Password:Password,
     Phone:Phone,
     Email:Email,
     Principal:Principal
    }

    const lxxre = {
        method:"POST",
        headers:{
            "Content-Type": "application/json",
        "Accept": "*/*",
        "Authorization":"Bearer "+"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6ImFkbWluIiwidXNlcmlkIjoiMSIsImFjY291dCI6ImFkbWluIiwidXNlcnR5cGUiOiIyIiwiZW1pYWwiOiJzdHJpbmciLCJwaG9uZSI6IjExIiwic2Nob29sdHlwZSI6IjAiLCJzY2hvb2xuYW1lIjoiIiwibmJmIjoxNjk0MTQ3MTE1LCJleHAiOjE3MjU2ODMxMTUsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTA2NSIsImF1ZCI6IkhTQ2xpZW50In0.2G4skJyeSuXCvyHcIqfNAgiyGLUPn_1S83YlVIqN4hE"
        },
        body:JSON.stringify(lxxdata)
    }
fetch(lxxApi,lxxdata)
.then(response =>response.json())
.then(data =>{
    console.log("修改成功",data)
})
.then(error =>{
    console.log("连接错误",error)
})
 }
 }
};
</script>
<style scoped>
@import './pop/six.css';

/* 其他样式 */
</style>