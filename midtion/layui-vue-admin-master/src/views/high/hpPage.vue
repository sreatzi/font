<template>

   <div class="container-demo">
    
      <lay-field theme="green">
    <template #title >
      欢迎:{{ name }}
    </template>
  </lay-field>
  <div class="scroll-container11">
  <div class="scroll-content1">
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
        <lay-button size="sm" type="primary" @click="allshenbao">提交申报</lay-button>
        
      </template>
      <template v-slot:schoolSystem="{ row }">
{{ row.schoolSystem }}年
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
      <template v-slot:xxxsdm="{ row }">
  <p v-if="row.xxxsdm == 1" id="WcCc0">
    脱产
  </p>
  <p v-if="row.xxxsdm == 2" id="WcCc1">
    业余
  </p>
  <p v-if="row.xxxsdm == 3" id="WcCc1">
    函授
  </p>
</template>
<template v-slot:subjectType="{ row }">
  <p v-if="row.subjectType == 0" id="WcCc0">
    初中
  </p>
  <p v-if="row.subjectType == 1" id="WcCc1">
    高中文科
  </p>
  <p v-if="row.subjectType == 5" id="WcCc1">
    高中理科
  </p>
</template>
<template v-slot:zybz="{ row }">
  <p v-if="row.zybz==null">无</p>
 <p v-else>{{ row.zybz }}</p>
</template>
<template v-slot:operator="{ row }">
      <p v-if="row.state==1||row.state==2||row.state==4||row.state==5" size="xs" type="primary" style="text-align: center;">暂不可操作</p>
      <lay-button   v-if="row.state === 0 || row.state === 3"   size="xs" type="primary" @click="shenbao(row)">申报</lay-button>
      <lay-button   v-if="row.state === 0 || row.state === 3"   size="xs" @click="openConfirm(row)">修改</lay-button>
      <lay-button v-if="row.state==3" size="xs" @click="chakan(row)">查看原因</lay-button>
      <lay-button   v-if="row.state === 0 || row.state === 3"   size="xs" @click="del(row)">删除</lay-button>
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
    </lay-table>
  </div>
   </div>
  </div>
   

  
    </template>
    
  <script>

import { ref, watch, reactive,h, resolveComponent,onMounted,defineAsyncComponent  } from 'vue';
  import { layer } from '@layui/layui-vue';
  import {supapi} from '../../../public/config';
  import { datag } from '@/dataglober.ts';
  import alert from './inputPage.vue'
  import { lxxdle,lxxsallhen,lxxshen,lxxflie,lxxmo } from '@/api/api.js';
  export default {

    setup() {
      const dataSource = ref([
      ])
     const id = datag.school.value.userId || (JSON.parse(localStorage.getItem('schooll')) || {}).userId || '无';
const name = datag.school.value.schoolName || (JSON.parse(localStorage.getItem('schooll')) || {}).schoolName || '无';
      const handleFileUpload = async (event, row) => {
      lxxflie.api(event,row)
      lxxmo.api()
    };

    const chakan = async(row)=>{layer.confirm(row.auditRemark)}
      const allshenbao = async()=>{
    const ppppid=[]
    
    datag.stuHcity.value.forEach(item=>{
        ppppid.push(item.ppid)
      
      })
      console.log(ppppid)
      lxxsallhen.api(ppppid)
      lxxmo.api()
   }

      const del = async(row)=>{
      lxxdle.api(row)
      lxxmo.api()
    }

      const shenbao = async(row) =>{
      lxxshen.api(row)
      console.log(row)
      lxxmo.api()
    }
      const lxxapp = async()=>{
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
        dataSource.value = datag.stuAll.value;
        datag.stuHcity.value =[]
        dataSource.value.forEach(item =>{
          if(item.state==0||item.state==3)
          {
            datag.stuHcity.value.push(item)
          }
        })
        
      }catch(error)
      {
        console.log('数据获取失败：', error);
      }
    }
    watch(datag.stuAll, () => {
        if(dataSource.value==datag.stuAll.value)
        {
            console.log("一样的")
        }else{
          lxxapp();
        }
      
      }, { immediate: true });
    const openConfirm = function(row) {
      datag.rowschool.value=row
      datag.oanumber=row.orginal_plan_number
      datag.abnormal = row.abnormal
      datag.stuppid = row.ppid
      layer.open({
        type: "page",
        title: "修改相关信息",
        content: h(alert)
      })
    }

    onMounted(()=>{lxxapp();})
      const data1 = ref([{value:1,label:'',closable: false}]);
      const inputValue1 = ref("");
  
      const loading = ref(false);
  
      const selectedKeys = ref([]);
  
      const page = reactive({ current: 1, limit: 10, total: 100 });
  
      const columns = ref([
      
      { title:"专业代码", width: "50", key:"spmcode", sort: "desc" },
        { title:"专业名称", width: "50", key:"spmname",},
        { title:"招生类别", width: "50", key:"zslbdm" },
        { title:"科类", width: "50", key:"subjectType" ,  customSlot:"subjectType"},
        { title:"学习形式", width: "50", key:"xxxsdm",  customSlot:"xxxsdm"},
        { title:"学制", width: "50", key:"schoolSystem",customSlot:"schoolSystem"},
        { title:"学费", width: "50", key:"tuition"},
        { title:"原计划数", width: "50",  key:"orginal_plan_number", },
        { title:"拟计划数", width: "50", key:"planned_number", },
        { title:"专业备注", width: "50", key:"zybz",customSlot:"zybz" },
        { title:"状态", width: "50",  key:"state", customSlot:"word3"},
        { title:"操作", width: "50", customSlot:"operator", key:"operator", fixed: "right", ignoreExport: true },
  
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
        allshenbao,
        del,
        shenbao,
        openConfirm,
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
  .layui-table-cell-content{
  display: block;
}
.layui-table-cell-content button.layui-btn-xs:first-child {
  margin-left: 10px;
}
.layui-table-cell-content button.layui-btn-xs{
  margin-top: 10px;
}
   .scroll-container11 {
  width: 100%;
  height: 90%;
  overflow: auto;
  margin: 10px auto;
  border: 1px solid #ccc;
}

.layui-upload-btn-box{
  margin-top: 18px;
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