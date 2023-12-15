<template>
  <div class="container-demo">
    <lay-field theme="green">
        <template #title >
      欢迎:{{ name }}
    </template>
    </lay-field>
    <div class="scroll-container1">
  <div class="scroll-content">
    <div style="height: 800px;">
      <lay-table
        :resize="false"
        :height="'90%'"
        :columns="columns"
        :default-toolbar="true"
        :data-source="dataSource"
        v-model:selected-keys="selectedKeys"
        @change="change"
      >
        <template #date="{ row }"></template>
        <template #status="{ row }">
          <lay-switch :model-value="row.status" @change="changeStatus($event, row)"></lay-switch>
        </template>

        <template v-slot:toolbar>
          <lay-button size="sm" type="primary" @click="giveall">提交全部申报</lay-button>
        </template>
        
        <template v-slot:operator="{ row }">
          <div class="buttonbox">
          <div class="button-row">
            <p v-if="row.state==1||row.state==2||row.state==4||row.state==5" size="xs" type="primary" style="text-align: center;">暂不可操作</p>
      <lay-button v-if="row.state==0||row.state==3" size="xs" type="primary" @click="give(row)">申报</lay-button>
      <lay-button v-if="row.state==0||row.state==3" size="xs" @click="index(row)">修改</lay-button>
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
      <!-- <lay-button v-if="row.state==0||row.state==3" size="xs" @click="del(row)">删除</lay-button> -->
    </div>
    <div class="button-row">
      <lay-button v-if="row.state==3" size="xs" type="primary" @click="openConfirm(row)">查看原因</lay-button>

      
      

    </div>
  </div>
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
        <template v-slot:Input2="{ row }">
          <lay-input
    v-model="row.planned_Number"
    allowClear
    placeholder="请输入"
    style="width: 180px"
  ></lay-input>
        </template>
      </lay-table>
    </div>
  </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, h,onMounted,watch,provide } from 'vue';
import { lxxlcApi,lxxadd,lxxgive,lxxdele,lxxall,lxxflie,lxxshua} from '@/api/api.js';
import { datag } from '@/dataglober.ts';
import { layer } from '@layui/layui-vue';
import alert from './inputPage.vue'
import {ppapi} from '../../../public/config'

export default {
  
  setup() {
    const id = datag.school.value.userId ? datag.school.value.userId :JSON.parse(localStorage.getItem('school')).userId;
    const name = datag.school.value.schoolName ? datag.school.value.schoolName :JSON.parse(localStorage.getItem('school')).schoolName;
    const dataSource = ref([]);
    const giveall = async()=>{
      lxxshua.api()
      var ddid =[]
      dataSource.value.forEach(item=>{
        ddid.push(item.drid)
      })
      lxxall.api(ddid)
    }
    const handleFileUpload = async (event, row) => {
     
      lxxflie.api(event,row)
     };
    
     const openConfirm = async (row) => {
  layer.confirm(row.auditRemark, { title: '查看原因' });
};
    const del =async(row)=>{
      lxxshua.api()
      await lxxdele.api(row)}
    const give = async(row)=>{
      lxxshua.api()
      await lxxgive.api(row)}
    const index = async(row)=>{
      await fetchData();
      datag.abnormal = row.abnormal
      console.log(row.abnormal)
      datag.onumber = row.orginal_Plan_Number
      datag.studrid = row.drid
      datag.sturow = row
      layer.open({
        type: "page",
        title: "修改相关信息",
        content: h(alert)
      })
      // lxxadd.api(row)
    }
   const fetchData = async () => {
      console.log("成功调用了我")
        const index = 2;
        const lxx = ppapi.apiurl+'/api/TranscriptionPlan32/get_declarationrecord?TranscribeId=2'
    const headers = {
      method:'GET',
      headers:{
    'Authorization':'Bearer '+(JSON.parse(localStorage.getItem('takel'))?.accessToken || datag.takel.accessToken)
      }
    }
    try {
      const response = await fetch(lxx,headers)
      const data = await response.json()
      datag.studata.value = data.data
      console.log( datag.studata.value[0].state)

        dataSource.value = datag.studata.value;
        console.log(dataSource.value);
      } catch (error) {
        console.error('数据获取失败：', error);
      }
    };

    onMounted(() => {fetchData();});
    watch(datag.studata, () => {
        if(dataSource.value==datag.studata.value)
        {
            console.log("一样的")
        }else{
          fetchData();
        }
      
      }, { immediate: true });
      provide('fetchData', fetchData);
    const change = async (page) => {
      loading.value = true;
      try {
        await new Promise((resolve) => {
          setTimeout(() => {
            dataSource.value = loadDataSource(page.current, page.limit);
            resolve();
          }, 1000);
        });
      } catch (error) {
        console.error('数据加载失败：', error);
      } finally {
        loading.value = false;
      }
    };
    const data1 = ref([{ value: "", label: "", closable: false }]);
const data2 = ref([{ value: "", label: "", closable: false }]);

    const inputValue1 = ref("");

    const loading = ref(false);

    const selectedKeys = ref([]);

    const page = reactive({ current: 1, limit: 10, total: 100 });

    const columns = ref([
      { title: "中职学校代码", width: "50", key: "secondary_School_Id", fixed: "left", sort: "desc" },
      { title: "中职学校名称", width: "50", key: "secondary_School_Name", fixed: "left", sort: "desc" },
      { title: "中职专业代码", width: "50px", key: "secondary_Pmid" },
      { title: "中职专业名称", width: "50px", key: "secondary_Pmname" },
      { title: "专业代号", width: "50px", key: "pmMark" },
      { title: "原计划数", width: "40px",  key: "orginal_Plan_Number",scopedSlots: { customRender: "Input1" } },
      { title: "拟计划数", width: "40px", key: "planned_Number"},
      // { title: "电话", width: "20px", key: "phone" },
      // { title: "地址", width: "20px", key: "address" },
      { title: "备注", width: "20px", key: "declarationRemark" },
      { title: "状态", width: "40px", key: "state", customSlot: "word3"},
      { title: "操作", width: "40px", customSlot: "operator", key: "operator", fixed: "right", ignoreExport: true },
    ]);

    const sortChange = (key, sort) => {
      layer.msg(`字段${key} - 排序${sort}, 你可以利用 sort-change 实现服务端排序`)
    }

    const changeStatus = (isChecked, row) => {
      dataSource.value.forEach((item) => {
        if (item.id === row.id) {
          layer.msg("Success", { icon: 1 }, () => {
            item.status = isChecked;
          });
        }
      });
    };

    const remove = () => {
      layer.msg(selectedKeys.value, { area: '50%' })
    }

    return {
      id,
      name,
      fetchData: ref(fetchData), // 使用ref创建响应式对象
      handleFileUpload,
      openConfirm,
      giveall,
      data1,
      del,
      give,
      index,
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
.layui-upload-btn-box{
  width:65px;
  margin-top: 10px;
  height: 25px;
}
.layui-upload-btn-box span{
font-size: 12px;
position: relative;
right: 14px;
bottom: 5px;
margin-bottom: 20px;
margin-right: 100px;
padding-right: 10px;
}

.container-demo {
  border: 1px solid rgb(135, 135, 135);
  box-shadow: 1px 1px 1px 0.5px rgb(151, 151, 151);
  border-radius: 5px;
  margin: 10px 10px 10px 10px;
  width: 98%;
  height: 800px;
  background: #e6e6e6;
}
</style>
