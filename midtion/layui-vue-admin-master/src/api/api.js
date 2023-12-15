import axios from 'axios';
import { datag } from '@/dataglober.ts';
import { layer } from '@layui/layui-vue';
import exp from 'constants';
import {supapi} from '../../public/config';

export const lxxdle = {
    api(row){
        const lxx = supapi.supapi +"/api/SecondaryEnrollment/deleteprofessionalplan?ppid="+row.ppid
        const headers = {
            method:"GET",
            headers:{
                'Authorization':'Bearer '+(JSON.parse(localStorage.getItem('taken'))?.accessToken || datag.takel.accessToken),
                "content-type": "application/json",
            }
        }
        fetch(lxx,headers)
        .then(response=>response.json())
        .then(data=>{
            layer.msg(data.message)
        })
        .then(error=>{
            console.log(error)
        })
    }
}

export const lxxshen={
    api(row){
    const lxx = supapi.supapi +"/api/SecondaryEnrollment/submitprofessionalproject"
    const lxxdata = {
        ppId:[row.ppid]
    }
    const headers = {
        method:"POST",
        headers:{
            'Authorization':'Bearer '+(JSON.parse(localStorage.getItem('taken'))?.accessToken || datag.takel.accessToken),
            "content-type": "application/json",
        },
        body:JSON.stringify(lxxdata)
    }
    fetch(lxx,headers)
    .then(response=>response.json())
    .then(data=>{
        console.log(lxxdata)
        layer.msg(data.message)
    })
    .then(error=>{
        console.log(error)
    })
    }
}

export const lxxcha = {
    api(number){
        const lxx = supapi.supapi + "/api/SecondaryEnrollment/getmajor?codeorname="+number
        const headers = {
            method:"GET",
            headers:{
            'Authorization':'Bearer '+(JSON.parse(localStorage.getItem('taken'))?.accessToken || datag.takel.accessToken),
            "content-type": "application/json",
            }
        }
        fetch(lxx,headers)
        .then(response =>response.json())
        .then(data=>{
            console.log("查找成功",data)
            datag.stuadd.value = data.data
        })
    }
}

export const lxxaddstu ={
    api(row){
    const lxx = supapi.supapi +"/api/SecondaryEnrollment/addmajor"
    const lxxdata = {
        spmId:row.spmid,
        transcribe:2
    }
     const headers = {
        method:"POST",
        headers:{
            'Authorization':'Bearer '+(JSON.parse(localStorage.getItem('taken'))?.accessToken || datag.takel.accessToken),
            "content-type": "application/json",
        },
        body:JSON.stringify(lxxdata)
     }
     console.log(lxxdata)
     fetch(lxx,headers)
     .then(response=>response.json())
     .then(data=>{
        layer.msg(data.message)
     })
     .then(error=>{
      console.log(error)
     })
   }
}

export const lxxaddstu3 ={
    api(row){
    const lxx = supapi.supapi +"/api/SecondaryEnrollment/addmajor"
    const lxxdata = {
        spmId:row.spmid,
        transcribe:1
    }
     const headers = {
        method:"POST",
        headers:{
            'Authorization':'Bearer '+(JSON.parse(localStorage.getItem('taken'))?.accessToken || datag.takel.accessToken),
            "content-type": "application/json",
        },
        body:JSON.stringify(lxxdata)
     }
     console.log(lxxdata)
     fetch(lxx,headers)
     .then(response=>response.json())
     .then(data=>{
        layer.msg(data.message)
     })
     .then(error=>{
      console.log(error)
     })
   }
}

export const lxxaddstu1 ={
    api(row){
    const lxx = supapi.supapi +"/api/SecondaryEnrollment/addmajor"
    const lxxdata = {
        spmId:row.spmid,
        transcribe:4
    }
     const headers = {
        method:"POST",
        headers:{
            'Authorization':'Bearer '+(JSON.parse(localStorage.getItem('taken'))?.accessToken || datag.takel.accessToken),
            "content-type": "application/json",
        },
        body:JSON.stringify(lxxdata)
     }
     console.log(lxxdata)
     fetch(lxx,headers)
     .then(response=>response.json())
     .then(data=>{
        layer.msg(data.message)
     })
     .then(error=>{
      console.log(error)
     })
   }
}

export const lxxcity1={
    api(newValue){
     const lxx = supapi.supapi + "/api/SecondaryEnrollment/getareapopulation?PPId="+newValue
     const headers = {
        method:"GET",
        headers:{
            'Authorization':'Bearer '+(JSON.parse(localStorage.getItem('taken'))?.accessToken || datag.takel.accessToken),
            "content-type": "application/json",
        },
     }
     fetch(lxx,headers)
     .then(response=>response.json())
     .then(data=>{
        console.log(data)
        datag.stucitynuber.value = data.data
     })
     .then(error=>{
        console.log(error)
     })
    }
}

export const lxxcitybocun={
    api(stuppid,region){
        const lxx = supapi.supapi+"/api/SecondaryEnrollment/updataNumberprofessionalproject"
        const lxxdata = {
            ppId:stuppid,
            region:region
        }
        const headers = {
            method:"POST",
            headers:{
                'Authorization':'Bearer '+(JSON.parse(localStorage.getItem('taken'))?.accessToken || datag.takel.accessToken),
                "content-type": "application/json",
            },
            body:JSON.stringify(lxxdata)
        }
        console.log(lxxdata)
        fetch(lxx,headers)
        .then(response=>response.json())
        .then(data=>{
           layer.msg(data.message)
        })
        .then(error=>{
              console.log(error)
        })
    }
}

export const lxxsallhen={
    api(ppppid){
    const lxx = supapi.supapi +"/api/SecondaryEnrollment/submitprofessionalproject"
    const lxxdata = {
        ppId:ppppid
    }
    const headers = {
        method:"POST",
        headers:{
            'Authorization':'Bearer '+(JSON.parse(localStorage.getItem('taken'))?.accessToken || datag.takel.accessToken),
            "content-type": "application/json",
        },
        body:JSON.stringify(lxxdata)
    }
    fetch(lxx,headers)
    .then(response=>response.json())
    .then(data=>{
        layer.msg(data.message)
        console.log(data)
    })
    .then(error=>{
        console.log(error)
    })
    }
}

export const lxxaddRstu ={
    api(row){
    const lxx = supapi.supapi +"/api/SecondaryEnrollment/addmajor"
    const lxxdata = {
        spmId:row.spmid,
        transcribe:3
    }
     const headers = {
        method:"POST",
        headers:{
            'Authorization':'Bearer '+(JSON.parse(localStorage.getItem('taken'))?.accessToken || datag.takel.accessToken),
            "content-type": "application/json",
        },
        body:JSON.stringify(lxxdata)
     }
     console.log(lxxdata)
     fetch(lxx,headers)
     .then(response=>response.json())
     .then(data=>{
        layer.msg(data.message)
     })
     .then(error=>{
      console.log(error)
     })
   }
}


export const lxxhedui = {
    async api(newValue) {
      const lxx = supapi.supapi + "/api/SchoolEndEnrollmentAudit/ProfessionalPlanCheck?TranscribeId=" + newValue;
      const headers = {
        method: "GET",
        headers: {
          'Authorization': 'Bearer ' + (JSON.parse(localStorage.getItem('taken'))?.accessToken || datag.takel.accessToken),
          "content-type": "application/json",
        },
      };
  
      try {
        const response = await fetch(lxx, headers);
        const data = await response.json();
        console.log(data);
        datag.stuhedui.value = data.data;
      } catch (error) {
        console.log(error);
      }
    }
  };

export const lxxheduisusec={
    api(newValue){
     const lxx = supapi.supapi + "/api/SchoolEndEnrollmentAudit/ConfirmTheCheck?TranscribeId="+newValue
     const headers = {
        method:"GET",
        headers:{
            'Authorization':'Bearer '+(JSON.parse(localStorage.getItem('taken'))?.accessToken || datag.takel.accessToken),
            "content-type": "application/json",
        },
     }
     fetch(lxx,headers)
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

export const lxxflie={
    api(event,row){
        console.log(event.data[0]);
        var file = event.data[0];
        console.log(row.ppid);
        const api = supapi.supapi + "/api/SecondaryEnrollment/upload_exception_file";
        const formData = new FormData();
        formData.append('file', file);
        formData.append('ppid', row.ppid);
        
        // 打印formData对象中的数据
        for (let [key, value] of formData.entries()) { 
          console.log(key, value);
        }
        
        const headers = {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + (JSON.parse(localStorage.getItem('taken'))?.accessToken || datag.takel.accessToken),
            //   "Content-Type": "multipart/form-data;"
          },
          body: formData
        };
        fetch(api, headers)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            layer.msg(data.message);
            lxxshuapu.api()
            lxxshuart.api()
            lxxHz.api()
            lxxmo.api()
          })
          .catch(error => {
            console.log("失败", error);
          });
      }  
  }
  export const lxxsure1={
    api(inputElement1,inputElement2,inputElement3,inputElement4){
      const api =supapi.supapi+"/api/User/update"
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
        router.push('/main')
      })
      .then(error=>{
        console.log(error)
      })
    }
  }
  
export const lxxsure={
api(inputElement1,inputElement2,inputElement3,inputElement4,inputElement5){
    const api =supapi.supapi+"/api/User/update"
    const lxxdata = {
    Password:inputElement1,
    Phone:inputElement2,
    Email:inputElement3,
    Principal:inputElement4,
    countryCode:inputElement5,
    type:1
    }
    const headers ={
    method:'POST',
    headers:{
        'Content-Type': 'application/json',
        "Authorization":"Bearer "+(JSON.parse(localStorage.getItem('taken'))?.accessToken || datag.takel.accessToken),
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

export const lxxpaicho={
    tekon(){
        if((JSON.parse(localStorage.getItem('taken'))?.accessToken || datag.takel.accessToken)==null){
            console.log("token为空")
            router.push('/login')
        }else{
            console.log("值不为空")
        }
    }
}

export const lxxcui={
  async api(){
        const lxx = supapi.supapi+"/api/HomePageRecruit/urgebyschool"
        const headers = {
            method:"GET",
            headers:{
                'Authorization':'Bearer '+(JSON.parse(localStorage.getItem('taken'))?.accessToken || datag.takel.accessToken),
                "content-type": "application/json",
            },
         }
    try{
      const response = await fetch(lxx,headers)
      const data = await response.json();
      layer.msg(data.message)
    }catch(error){
        console.log(error)
    }
    }
}

export const lxxshuapu={
    async api(){
        const lxx = supapi.supapi+"/api/SecondaryEnrollment/getprofessionalplans?transcribe=2"
      const headers = {
        method:'GET',
        headers:{
          'Authorization':'Bearer '+(JSON.parse(localStorage.getItem('taken'))?.accessToken || datag.takel.accessToken)
        }
      }
      try{
        const response = await fetch(lxx,headers)
        const data = await response.json()
        datag.stupp.value = data.data
      }catch(error)
      {
        console.log('数据获取失败：', error);
      }
    }
}

export const lxxshuart={
    async api(){
        const lxx = supapi.supapi+"/api/SecondaryEnrollment/getprofessionalplans?transcribe=3"
      const headers = {
        method:'GET',
        headers:{
          'Authorization':'Bearer '+(JSON.parse(localStorage.getItem('taken'))?.accessToken || datag.takel.accessToken)
        }
      }
      try{
        const response = await fetch(lxx,headers)
        const data = await response.json()
        datag.stuRtlist.value = data.data
      }catch(error)
      {
        console.log('数据获取失败：', error);
      }
    }
}

export const lxxHz={
    async api(){
      const lxx = supapi.supapi + "/api/SecondaryEnrollment/getprofessionalplans?transcribe=1"
      const headers = {
        method:'GET',
        headers:{
          'Authorization':'Bearer '+(JSON.parse(localStorage.getItem('taken'))?.accessToken || datag.takel.accessToken)
        }
      }
      try{
        const response = await fetch(lxx,headers)
        const data = await response.json()
        datag.stuone.value = data.data
      }catch(error)
      {
        console.log('数据获取失败：', error);
      }
    }
}

export const lxxmo={
    async api(){
        const lxx = supapi.supapi+"/api/SecondaryEnrollment/getprofessionalplans?transcribe=4"
      const headers = {
        method:'GET',
        headers:{
          'Authorization':'Bearer '+(JSON.parse(localStorage.getItem('taken'))?.accessToken || datag.takel.accessToken)
        }
      }
      try{
        const response = await fetch(lxx,headers)
        const data = await response.json()
        datag.stuAll.value = data.data
      }catch(error)
      {
        console.log('数据获取失败：', error);
      }
    }
}

export const lxxperson={
  async api(){
      const lxx = supapi.supapi+"api/User/getuserdata"
    const headers = {
      method:'GET',
      headers:{
        'Authorization':'Bearer '+(JSON.parse(localStorage.getItem('taken'))?.accessToken || datag.takel.accessToken)
      }
    }
    try{
      const response = await fetch(lxx,headers)
      const data = await response.json()
      datag.stuAll.value = data.data
    }catch(error)
    {
      console.log('数据获取失败：', error);
    }
  }
}