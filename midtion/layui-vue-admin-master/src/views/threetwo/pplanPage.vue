<template>
  <div v-if="!showReplacement">
 <div class="container-demo">
  
    <lay-field theme="green">
  <template #title >
    欢迎:{{ name }}
  </template>
</lay-field>

<div class="scroll-container1">
  <div class="scroll-contents">
 <lay-table 
      
      :resize="false"
      :height="'90%'"
      :columns="columns" 
      :loading="loading"
      :default-toolbar="true"
      :data-source="dataSource" 
      v-model:selected-keys="selectedKeys"  
      @change="change"
      @sortChange="sortChange">
      <template #date="{ row }">
    </template>
    <template #status="{ row }">
  
      <lay-switch :model-value="row.status" @change="changeStatus($event , row)"></lay-switch>
    </template>
    
    <template v-slot:toolbar>
      <lay-button size="sm" type="primary" @click="shenbao">提交申报</lay-button>
      <lay-button size="sm" type="primary" @click="showReplacement = true">计划分市州</lay-button>
    </template>
    <template v-slot:operator="{ row }">
      
      <p v-if="row.state==1||row.state==2||row.state==4||row.state==5" size="xs" type="primary" style="text-align: center;">暂不可操作</p>
      <lay-button v-if="row.state==0||row.state==3" size="xs" type="primary" @click="shen(row)">申报</lay-button>
      <lay-button v-if="row.state==0||row.state==3" size="xs"  @click="openConfirm(row)">修改</lay-button>
      <lay-button v-if="row.state==0||row.state==3" size="xs" @click="del(row)">删除</lay-button>
      <lay-button v-if="row.state==3" size="xs" @click="chakan(row)">查看原因</lay-button>
      <lay-upload   
  :multiple="true"
  :size="10240"
  text="上传文件"
  acceptMime="application/pdf"
  style="margin-left: 10px;" 
  v-if="row.abnormal==0&&(row.state==0||row.state==3)"  
  :headers="{Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzOTc1IiwibmFtZSI6IjE0MzkzIiwidXNlcmlkIjoiMzk3NSIsImFjY291bnQiOiIxNDM5MyIsInVzZXJ0eXBlIjoiMCIsImVtaWFsIjoiIiwicGhvbmUiOiIiLCJzY2hvb2x0eXBlIjoiMSIsInNjaG9vbG5hbWUiOiLlt53ljJflubzlhL_luIjojIPpq5jnrYnkuJPnp5HlrabmoKEiLCJuYmYiOjE2OTk3NTUxMDMsImV4cCI6MTczMTI5MTEwMywiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDY1IiwiYXVkIjoiSFNDbGllbnQifQ.5G_Q4leGvJ7SWzh9AgKOv_nqGpSfUJizukSUKZ0CZ70'}"
  :data="row.ddird"
  @done="handleFileUpload($event, row)"
>
</lay-upload>
<lay-upload   
  :multiple="true"
  :size="10240"
  text="重新上传"
  acceptMime="application/pdf"
  style="margin-left: 10px;" 
  v-if="row.abnormal==2&&(row.state==0||row.state==3)"  
  :headers="{Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzOTc1IiwibmFtZSI6IjE0MzkzIiwidXNlcmlkIjoiMzk3NSIsImFjY291bnQiOiIxNDM5MyIsInVzZXJ0eXBlIjoiMCIsImVtaWFsIjoiIiwicGhvbmUiOiIiLCJzY2hvb2x0eXBlIjoiMSIsInNjaG9vbG5hbWUiOiLlt53ljJflubzlhL_luIjojIPpq5jnrYnkuJPnp5HlrabmoKEiLCJuYmYiOjE2OTk3NTUxMDMsImV4cCI6MTczMTI5MTEwMywiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDY1IiwiYXVkIjoiSFNDbGllbnQifQ.5G_Q4leGvJ7SWzh9AgKOv_nqGpSfUJizukSUKZ0CZ70'}"
  :data="row.ddird"
  @done="handleFileUpload($event, row)"
>
</lay-upload>
    </template>
    <template v-slot:Input1="{ row }">
      <lay-input 
      v-model="row.orginal_plan_number"
    placeholder="请输入" 
    style="width:180px"
    >
  </lay-input>
    </template>
    <template v-slot:Input2="{ row }">
      <lay-input 
      v-model="row.planned_number"
    placeholder="请输入" 
    style="width:180px"
    >
  </lay-input>
    </template>
    <template v-slot:zybz="{ row }">
  <p v-if="row.zybz==null">无</p>
 <p v-else>{{ row.zybz }}</p>
</template>
    <template v-slot:word3="{ row }">
  <p v-if="row.state === 0" id="WcCc0" style="color: rgb(123, 123, 123);">
    待提交
  </p>
  <p v-if="row.state === 1" id="WcCc1" style="color: rgb(36, 135, 255);">
    审核中
  </p>
  <p v-if="row.state === 2" id="WcCc2" style="color: rgb(26,188,156);">
    待核对
  </p>
  <p v-if="row.state === 3" id="WcCc3" style="color: rgb(248, 50, 10);">
    已退回
  </p>
  <p v-if="row.state === 4" id="WcCc4" style="color: rgb(36, 135, 255);">
    待定稿
  </p>
  <p v-if="row.state === 5" id="WcCc5" style="color: rgb(0, 0, 0);">
    已定稿
  </p>

</template>
  </lay-table>
</div>
 </div>
</div>
 </div>


   <div v-else class="replacement-wrapr">
      <ReplacementComponent />
    </div>
  </template>
<script>
import ReplacementComponent from './ThpPage.vue';
import { ref, watch, reactive,h, resolveComponent,onMounted,defineAsyncComponent  } from 'vue';
import { layer } from '@layui/layui-vue';
import { datag } from '@/dataglober.ts';
import { lxxdle,lxxsallhen,lxxshen,lxxflie,lxxshuapu } from '@/api/api.js';
import alert from './inputPage.vue'
import {supapi} from '../../../public/config';
export default {
  components: {
    ReplacementComponent
  },
  data() {
    return {
      showReplacement:false,
    };
  },
  setup() {
    const id = datag.school.value.userId || (JSON.parse(localStorage.getItem('schooll')) || {}).userId || '无';
const name = datag.school.value.schoolName || (JSON.parse(localStorage.getItem('schooll')) || {}).schoolName || '无';
    const dataSource = ref([])
    const shenbao = async() =>{
      datag.op=false
      const ppppid=[]
      console.log(datag.stucity.value)
      lxxshuapu.api()
    }
    const chakan = async(row)=>{layer.confirm(row.auditRemark)}
    const handleFileUpload = async (event, row) => {
      datag.op=false
      lxxflie.api(event,row)
      lxxshuapu.api()
    };
    const openConfirm = function(row) {
      datag.op=false
      datag.rowschool.value=row
      datag.stuppid = row.ppid
      console.log(datag.stuppid)
      layer.open({
        type: "page",
        title: "修改相关信息",
        content: h(alert)
      })
      lxxshuapu.api()
    }

    const shen = async(row)=>{
      datag.op=false
      lxxshen.api(row)
      lxxshuapu.api()
    }

    const del = async(row)=>{
      datag.op=false
     console.log(row.ppid)
     lxxdle.api(row)
     lxxshuapu.api()
    }

    const lxxdata = async() =>{
      datag.op=false
      datag.e6a5bde689bde698afe4bda2e58aa2e4bb9be8bf9ee4baa5e4bb94e6af92=false
      const lxx = supapi.supapi+"/api/SecondaryEnrollment/getprofessionalplans?transcribe=2"
      const headers = {
        method:'GET',
        headers:{
          'Authorization':'Bearer '+(JSON.parse(localStorage.getItem('taken'))?.accessToken || datag.takel.accessToken)
        }
      }
      try{
        datag.stucity = ref([])
        const response = await fetch(lxx,headers)
        const data = await response.json()
        datag.stupp.value = data.data
        dataSource.value = datag.stupp.value;
        dataSource.value.forEach(item =>{
          if(item.state==0||item.state==3)
          {
            datag.stucity.value.push(item)
          }
        })
        console.log(dataSource.value)
      }catch(error)
      {
        console.log('数据获取失败：', error);
      }
    }
    onMounted(()=>{lxxdata();})
    
    const data1 = ref([{value:1,label:'',closable: false}]);
    const inputValue1 = ref("");

    const loading = ref(false);

    const selectedKeys = ref([]);

    const page = reactive({ current: 1, limit: 10, total: 100 });

    const columns = ref([
    
    { title:"专业代码", width:"50", key:"spmcode", sort: "desc" },
      { title:"专业名称", width:"50", key:"spmname",},
       { title:"原计划数", width:"50", key:"orginal_plan_number", },
      { title:"拟计划数",width:"50", key:"planned_number", },
      { title:"学费",width:"50", key:"tuition" },
      { title:"专业备注",width:"60", key:"zybz", customSlot:"zybz"},
      { title:"联系电话", width:"60", key:"tel" },
      { title:"学校地址",width:"60", key:"address" },
      { title:"状态",width:"50", key:"state",customSlot:"word3"},
      { title:"操作",  customSlot:"operator", key:"operator", fixed: "right", ignoreExport: true },
    ]);

    const change = (page) => {
      loading.value = true;
      setTimeout(() => {
        dataSource.value = loadDataSource(page.current, page.limit);
        loading.value = false;
      }, 1000);
    }

    const sortChange = (key, sort) => {
      layer.msg(`字段${key} - 排序${sort}, 你可以利用 sort-change 实现服务端排序`)
    }
    
   
    watch(datag.stupp, () => {
      console.log(datag.e6a5bde689bde698afe4bda2e58aa2e4bb9be8bf9ee4baa5e4bb94e6af92)
      console.log(datag.op)
        if(dataSource.value==datag.stupp.value || datag.e6a5bde689bde698afe4bda2e58aa2e4bb9be8bf9ee4baa5e4bb94e6af92==true||datag.op==true)
        {
          datag.op=false
            console.log("一样的")
        }
        else if(datag.op==false){
          lxxdata();
          datag.op=true

        }
        else { 
          
          console.log("触发")
          lxxdata();
        }
      
      }, { immediate: true });
    const changeStatus = (isChecked, row) => {
      dataSource.value.forEach((item) => {
        if(item.id === row.id) {
          layer.msg("Success", { icon: 1 }, () => {
            item.status = isChecked;
          })
        }
      })
    }

    const remove = () => {
      layer.msg(selectedKeys.value, { area: '50%'})
    }

    const loadDataSource = (page, pageSize) => {
      var response = [];
      var startIndex = ((page - 1) * pageSize) + 1;
      var endIndex = page * pageSize;
      for (var i = startIndex; i <= endIndex; i++) {
          response.push({
            id:`${i}`, 
            age:"18",
            sex: "男", 
            name:`张三${i}`, 
            email: "test@qq.com",
            remark: '花开堪折直须折,莫待无花空折枝.',  
            joinTime: "2022-02-09", 
            city: "浙江杭州", 
            status: true
          })
      }
      return response;
    }

    return {
      id,
      name,
      chakan,
      handleFileUpload,
      shenbao,
      openConfirm,
      shen,
      del,
      data1,
      inputValue1,
      columns,
      dataSource,
      selectedKeys,
      page,
      change,
      changeStatus,
      remove
    }
  }
}
</script>
<style>
.layui-upload-btn-box{
  margin-top: 10px;
  width:60px;
  height: 25px;
}
.layui-upload-btn-box span{
font-size: 11.75px;
position: relative;
right: 12.25px;
bottom: 6px;
margin-bottom: 20px;
margin-right: 100px;
padding-right: 10px;
}
.button-row {
  display: flex;
  margin: 0 auto;
  margin-bottom: 10px; /* 设置按钮行的间距 */
}
.scroll-container1 {
  width: 100%;
  height: 90%;
  overflow: auto;
  margin: 10px auto;
  border: 1px solid #ccc;
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