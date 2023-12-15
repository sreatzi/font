<template>
    <div v-if="!showReplacement">
      <div class="all1box">
    <div class="xiubox1">
    <span>拟计划数</span> 
    <lay-input v-model="data1" type="number" :max="500" :min="0"></lay-input>
  </div>

  <div class="xiubox2">
    <span>备注</span> 
    <lay-textarea id="ni" placeholder="请输入描述" v-model="declarationRemark"></lay-textarea>
    <!-- <lay-input v-model="data1" type="text" :max="300" :min="0">
    </lay-input> -->
  </div>
  <div class="xiubox3">
    <span>学校地址</span> <lay-input v-model="fixadress" type="text" :max="300" :min="0"></lay-input>
  </div>
  <div class="xiubox4">
    <span>联系电话</span> <lay-input v-model="fixphone" type="text" :max="300" :min="0"></lay-input>
  </div>

  <lay-button style="display: flex; margin: 0 auto;" border="green" @click="stusure">确定</lay-button>
  </div>
    </div>
    <div v-else class="replacement-wrapr">
      <ReplacementComponent />
    </div>
  </template>
  
  <script>
  import { ref,inject } from 'vue'
import { datag } from '@/dataglober.ts';
import { layer } from '@layui/layui-vue';
import {ppapi} from '../../../public/config'
import ReplacementComponent from './flie.vue'
import { lxxlcApi,lxxadd,lxxgive,lxxdele,lxxall,lxxflie,lxxshua,lxxshuaT} from '@/api/api.js';

export default {
  components: {
    ReplacementComponent
  },
  setup() {
    console.log(datag.sturow)
    const data1 =ref(datag.sturow.planned_Number)
    const declarationRemark =ref(datag.sturow.declarationRemark)
    const showReplacement = ref(false);
    const fixadress = ref(datag.fixadress);
    const fixphone = ref(datag.fixphone);

    const stusure = async() => {
     
      console.log(textareas)
      const box1 = document.querySelector('.xiubox1');
      const box2 = document.querySelector('.xiubox2');
      const box3 = document.querySelector('.xiubox3');
      const box4 = document.querySelector('.xiubox4');
      var textareas = document.querySelector(".layui-textarea").value;
      var xuefei = box1.querySelector('input[type="number"]').value;
      console.log(xuefei)
      console.log(datag.abnormal)
      if (xuefei===''||xuefei==0||xuefei<0) {
        layer.msg("拟计划数错误 请重新输入")
      }else if((xuefei > datag.onumber * 1.2 || xuefei < datag.onumber * 0.8)&&datag.abnormal==0) 
      {
        layer.msg("拟计划数异常 请上传证明材料")
      }else if(xuefei>500){
        layer.msg("拟计划数不能大于500")
      }else if(textareas.length>50){
        layer.msg("备注不能超过50字")
      }
      else {
        var address = box3.querySelector('input[type="text"]').value;
        var phone = box4.querySelector('input[type="text"]').value;
        
        const api = ppapi.apiurl+"/api/TranscriptionPlan32/updata_declarationrecord";
        const lxxdata ={
          drid:datag.studrid,
          plannedNumber:xuefei,
          DeclarationRemark: textareas,
          address:address,
          phone:phone,
        }
        const headers = {
          method:'POST',
          headers:{
            "content-type":"application/json",
            "Authorization":"Bearer "+(JSON.parse(localStorage.getItem('takel'))?.accessToken || datag.takel.accessToken)
          },
          body:JSON.stringify(lxxdata)
        }
        console.log(lxxdata)
        fetch(api,headers)
          .then(response => response.json())
          .then(data => {
            layer.msg(data.message);
            lxxshuaT.api()
          })
          .catch(error => {
            console.log(error);
          })        
      }
    }
  
    return {
      data1,
      declarationRemark,
      showReplacement,
      fixphone,
      fixadress,
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
  .xiubox3 span{
    margin-top: 10px;
    width: 80px;
  }
  .xiubox4 span{
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
.xiubox4{
  margin-bottom: 10px;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  display: flex;
}
.xiubox3{
  margin-bottom: 10px;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  display: flex;
}
</style>