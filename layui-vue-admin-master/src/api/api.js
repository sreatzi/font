import axios from 'axios';
import { datag } from '@/dataglober.ts';
import { layer } from '@layui/layui-vue';
import exp from 'constants';
import { useRouter } from 'vue-router'
import {ppapi} from '../../public/config'
export const lxxApi ={
    api(router) {
    
    var username = document.querySelector('input[type="text"]').value;
    var password = document.querySelector('input[type="password"]').value;
    const lxxlc = ppapi.apiurl +"/api/OAuth/login"
    let lxxdata = {
        Account:username,
        Password:password
    }
    const headers = {
        method:'POST',
        headers:{
            "content-type": "application/json",
        },
        body:JSON.stringify(lxxdata)
    };
    fetch(lxxlc, headers)
      .then((response) => response.json())
      .then((data) => {
        console.log("连接成功", data);
        if (data.result === 0) {
            datag.result =data.result
          datag.admin = data.data.account;
          
        } else {
          alert("登陆失败");
        }
      })
    }
}


export const lxxlcApi ={
  api(index){
    const lxx = ppapi.apiurl+'/api/TranscriptionPlan32/get_declarationrecord?TranscribeId='+index
    const headers = {
      method:'GET',
      headers:{
    'Authorization':'Bearer '+(JSON.parse(localStorage.getItem('takel'))?.accessToken || datag.takel.accessToken)
      }
    }
    fetch(lxx,headers)
    .then(response =>response.json())
    .then(data =>{
      datag.studata.value = data.data
      console.log( datag.studata.value[0].state)
    })
    .then(error =>{
      console.log("链接失败",error)
     })
  }
}

export const lxxJAPi = {
  async api() {
    const api = ppapi.apiurl + '/api/HomePage/gethomepagedata';
    const headers = {
      method: 'GET',
      headers: {
        "Authorization": "Bearer "+(JSON.parse(localStorage.getItem('takel'))?.accessToken || datag.takel.accessToken)
      }
    };

    try {
      const response = await fetch(api, headers);
      const data = await response.json();
      datag.home = data.data;
      time.value = datag.home.elapsed_Time;
      word5.value = datag.home.declaredNumber;
      principal.value = datag.home.principal;
      date.value = datag.home.first_Time;
      word6.value = datag.home.studentNumber;
    } catch (error) {
      console.log(error, "链接失败");
    }
  }
}

export const lxxadd ={
  api(row){
  const api = ppapi.apiurl+"/api/TranscriptionPlan32/updata_declarationrecord"
  const lxxdata ={
    drid:row.drid,
    orginalPlanNumber:row.orginal_Plan_Number,
    plannedNumber:row.planned_Number,
    DeclarationRemark: "备注"
  }
  const headers = {
    method:'POST',
    headers:{
      "content-type":"application/json",
      "Authorization":"Bearer "+(JSON.parse(localStorage.getItem('takel'))?.accessToken || datag.takel.accessToken)
    },
    body:JSON.stringify(lxxdata)
  }
  fetch(api,headers)
  .then(response=>response.json())
  .then(data=>{
    layer.msg(data.message)
  })
  .then(error=>{
   console.log(error)
  })
  }
}

export const lxxdele={
 api(row){
    const api = ppapi.apiurl+"/api/TranscriptionPlan32/submit_declarationrecord"
    const lxxdata ={
      drid:[row.drid],
      account:datag.result.account
    }
    const headers = {
      method:'POST',
      headers:{
        "content-type":"application/json",
        "Authorization":"Bearer "+(JSON.parse(localStorage.getItem('takel'))?.accessToken || datag.takel.accessToken)
      },
      body:JSON.stringify(lxxdata)
    }
    fetch(api,headers)
    .then(response=>response.json())
    .then(data=>{
      layer.msg(data.message)
    })
    .then(error=>{
     console.log(error)
    })
  } 
}

export const lxxgive={
  api(row){
   const api = ppapi.apiurl+"/api/TranscriptionPlan32/submit_declarationrecord"
   const lxxdata = {
    drId:[row.drid],
    remark: "string",
    planned_number: row.planned_Number,
   }
   const headers = {
    method:'POST',
    headers:{
      "content-type":"application/json",
      "Authorization":"Bearer "+(JSON.parse(localStorage.getItem('takel'))?.accessToken || datag.takel.accessToken)
    },
    body:JSON.stringify(lxxdata)
  }
   fetch(api,headers)
   .then(response=>response.json())
   .then(data=>{
    layer.msg(data.message)
   })
   .then(error=>{
    console.log("失败")
   })
  } 
}

 export const lxxall={
  api(ddid){
    const api = ppapi.apiurl+"/api/TranscriptionPlan32/submit_declarationrecord"
    const lxxdata = {
     drId:ddid,
    }
    const headers = {
     method:'POST',
     headers:{
       "content-type":"application/json",
       "Authorization":"Bearer "+(JSON.parse(localStorage.getItem('takel'))?.accessToken || datag.takel.accessToken)
     },
     body:JSON.stringify(lxxdata)
   }
    fetch(api,headers)
    .then(response=>response.json())
    .then(data=>{
     layer.msg(data.message)
    })
    .then(error=>{
     console.log("失败")
    })
   } 
}

export const lxxflie={
  api(event,row){
    console.log(event.data[0])
    var file=event.data[0]
    console.log(row.drid)
    var filelist=new DataTransfer();
    filelist.items.add(file)
    console.log(filelist.files)
    const api = ppapi.apiurl + "/api/TranscriptionPlan32/upload_exception_file";
    const formData = new FormData();
    formData.append('file', filelist.files[0]);
    formData.append('drid', row.drid);
    const headers = {
      method: 'POST',
      headers: {
        "Authorization": "Bearer "+(JSON.parse(localStorage.getItem('takel'))?.accessToken || datag.takel.accessToken),
        // "Content-Type": "multipart/form-data;"
      },
      body:formData
    };
    fetch(api,headers)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      layer.msg(data.message);
      lxxshua.api()
      // console.log(formData.get('file'));
      // for (var pair of formData.entries()) {
      //   console.log(pair[0] + ': ' + pair[1]);
      // }
      // console.log(data);
    })
    .catch(error => {
      console.log("失败", error);
    });
    }  
}

export const lxxwoce={
  api(){
    const api = ppapi.apiurl+"/api/TranscriptionalRelationship32/getsecondaryschool"
    const headers ={
      method:'GET',
      headers:{
     "Authorization":"Bearer "+(JSON.parse(localStorage.getItem('takel'))?.accessToken || datag.takel.accessToken)
      }
    }
    fetch(api,headers)
    .then(response=>response.json())
    .then(data=>{
      console.log('链接成功',data)
      datag.stupp.value = data.data
    })
    .then(error=>{
     console.log("链接错误")
    })
  }
}

export const lxxjie={
  async api(inputElement){
    console.log(inputElement)
    const api = ppapi.apiurl+"/api/TranscriptionalRelationship32/getSchoolMajorBySearch?keyword="+inputElement+"&PMType=0"
    console.log(api)
    const headers = {
      method:'GET',
      headers:{
    'Authorization':'Bearer '+(JSON.parse(localStorage.getItem('takel'))?.accessToken || datag.takel.accessToken)
      }
    }
    try{
      const response = await fetch(api,headers)
      const data = await response.json()
      datag.studata.value = data.data
      console.log(datag.studata.value)
    }catch(error)
    {
     console.log(error)
    }
  }
  
}

export const lxxj={
  api(inputElement){
    console.log(inputElement)
    const api = ppapi.apiurl+"/api/TranscriptionalRelationship32/getSchoolMajorBySearch?keyword="+inputElement+"&PMType=1"
    console.log(api)
    const headers = {
      method:'GET',
      headers:{
    'Authorization':'Bearer '+(JSON.parse(localStorage.getItem('takel'))?.accessToken || datag.takel.accessToken)
      }
    }
    fetch(api,headers)
    .then(response =>response.json())
    .then(data =>{
      datag.stuh.value = data.data
      datag.stuh.value.forEach(item => {
        item.mojorid1 = item.mojorid
        delete item.mojorid;
        item.majorCode1 = item.majorCode;
        delete item.majorCode;
        item.majorName1 = item.majorName;
        delete item.majorName;
      });
      console.log(datag.stuh.value)
    })
    .then(error =>{
      console.log("链接失败",error)
     })
  }
  
}

export const lxxtianjia={
  api(row){
    const api = ppapi.apiurl+"/api/TranscriptionalRelationship32/SetDeclarationRecordTable"
    const lxxdata ={
      secondary_School_id:row.schoolid+"",
      secondary_PMId:row.mojorid+"",
      higher_PMId:row.mojorid1+"",
      transcribeId:1
    }
    console.log(lxxdata)
    const headers ={
      method:'POST',
      headers:{
         'Content-Type': 'application/json',
         'Authorization':'Bearer '+(JSON.parse(localStorage.getItem('takel'))?.accessToken || datag.takel.accessToken)
      },
      body:JSON.stringify(lxxdata)
    }
    fetch(api,headers)
    .then(response=>response.json())
    .then(data=>{
      layer.msg(data.message)
    })
    .then(error=>{
      console.log(error)
    })
  }
    
}

export const lxxhedui ={
  async api(idnex){
    const api = ppapi.apiurl+'/api/SchoolCheck/DeclarationCheck?TranscribeId='+idnex
    const headers = {
      method:'GET',
      headers:{
        "Authorization":"Bearer "+(JSON.parse(localStorage.getItem('takel'))?.accessToken || datag.takel.accessToken)
      }
    }
    try {
      const response = await fetch(api,headers);
      const data = await response.json();
      console.log(data);
      datag.stuhedui.value = data.data
    } catch (error) {
      console.log(error);
    }
  }
}

export const lxxsuc={
 async api(lxxdui){
    const api = ppapi.apiurl+"/api/SchoolCheck/ConfirmTheCheck?TranscribeId="+lxxdui
    const headers ={
      method:"GET",
     headers:{
       "Authorization":"Bearer "+(JSON.parse(localStorage.getItem('takel'))?.accessToken || datag.takel.accessToken)
     }
    } 
    
   const response =await fetch(api,headers)
   const data = await response.json()
   try{
      layer.msg(data.message)
      console.log(data)
      if(data.result ==0){
     datag.result11 = 0;
      }else{
        datag.result11 = 1;
      }
    }
   catch(error){
      console.log(error)
    }
  }
}

export const lxxsure={
  api(inputElement1,inputElement2,inputElement3,inputElement4,inputElement5){
    const api =ppapi.apiurl+"/api/User/update"
    const router = useRouter()
    const lxxdata = {
      password:inputElement1,
      countryCode:inputElement5,
      Phone:inputElement2,
      Email:inputElement3,
      Principal:inputElement4,
      type:1
    }
    datag.countryCode = inputElement1
    datag.email = inputElement2
    datag.phone = inputElement3
    datag.principal = inputElement4
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
   
    })
    .then(error=>{
      console.log(error)
    })
  }
}

export const lxxsure1={
  api(inputElement1,inputElement2,inputElement3,inputElement4){
    const router = useRouter()

    const api =ppapi.apiurl+"/api/User/update"
    const lxxdata = {
      countryCode:inputElement1,
      Phone:inputElement2,
      Email:inputElement3,
      Principal:inputElement4,
      type:2
    }
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
    })
    .then(error=>{
      console.log(error)
    })
  }
}

export const lxxshua = {
  async api(){
     const lxx = ppapi.apiurl + "/api/TranscriptionPlan32/get_declarationrecord?TranscribeId=1"
     const headers = {
      method:'GET',
      headers:{
    'Authorization':'Bearer '+(JSON.parse(localStorage.getItem('takel'))?.accessToken || datag.takel.accessToken)
      }
    }
  try{
    const response = await fetch(lxx,headers)
    const data = await response.json()
    datag.studata.value = data.data
    console.log(datag.studata.value)
  }catch(error){
    console.log(error)
  }
    }
}

export const lxxshuaT ={
 async api(){
    const lxx = ppapi.apiurl + '/api/TranscriptionPlan32/get_declarationrecord?TranscribeId=1';
    const headers = {
      method: 'GET',
      headers: {
        'Authorization':'Bearer '+(JSON.parse(localStorage.getItem('takel'))?.accessToken || datag.takel.accessToken)
      }
    };
    try {
      const response = await fetch(lxx, headers);
      const data = await response.json();
      datag.studata.value = data.data;
      dataSource.value = datag.studata.value;
      console.log(dataSource.value);
    } catch (error) {
      console.log('数据获取失败：', error);
    }
  }
}

export const lxxperson={
  async api(){
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
     datag.countryCode = data.data.countryCode
     datag.email = data.data.email
     datag.phone = data.data.phone
     datag.principal = data.data.principal
      console.log(data)
    }catch(error)
    {
      console.log('数据获取失败：', error);
    }
  }
}