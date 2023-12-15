<template>
  <div v-if="!showReplacement">
 <div class="container-demo">
  
    <lay-field theme="green">
  <template #title >
    欢迎:{{ name }}
  </template>
</lay-field>
<div class="scroll-container1">
  <div class="scroll-contentss">
 <lay-table 
      
      :resize="false"
      :height="'90%'"
      :width="'90%'"
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
      <lay-button size="sm" type="primary" @click="showReplacement = true">计划分市州</lay-button>
    </template>
  
    <template v-slot:Input1="{ row }">
      <lay-tag-input 
    v-model="data1" 
    v-model:inputValue="inputValue2" 
    allowClear
    placeholder="请输入" 
    style="width:180px"
    >
  </lay-tag-input>
    </template>
    <template v-slot:zylbdm="{ row }">
  <p v-if="row.zylbdm == 'A'" id="WcCc0">
    美术
  </p>
  <p v-if="row.zylbdm == 'B'" id="WcCc1">
    音乐学(音乐教育) 
  </p>
  <p v-if="row.zylbdm == 'C'" id="WcCc1">
    音乐史论
  </p>
  <p v-if="row.zylbdm == 'D'" id="WcCc1">
    录音艺术
  </p>
  <p v-if="row.zylbdm == 'E'" id="WcCc1">
    作曲与作曲技术理论
  </p>
  <p v-if="row.zylbdm == 'F'" id="WcCc1">
    音乐表演
  </p>
  <p v-if="row.zylbdm == 'G'" id="WcCc1">
    戏剧影视表演
  </p>
  <p v-if="row.zylbdm == 'H'" id="WcCc1">
    播音与主持
  </p>
  <p v-if="row.zylbdm == 'I'" id="WcCc1">
    舞蹈
  </p>
  <p v-if="row.zylbdm == 'J'" id="WcCc1">
    服装表演
  </p>
  <p v-if="row.zylbdm == 'K'" id="WcCc1">
    戏曲表演
  </p>
  <p v-if="row.zylbdm == 'L'" id="WcCc1">
    广电编导
  </p>
  <p v-if="row.zylbdm == 'P'" id="WcCc1">
    杂技与魔术表演
  </p>
  <p v-if="row.zylbdm == 'Q'" id="WcCc1">
    文化服务
  </p>
  <p v-if="row.zylbdm == 'R'" id="WcCc1">
    木偶与皮影表演及制作
  </p>
  <p v-if="row.zylbdm == 'S'" id="WcCc1">
    导游
  </p>
  <p v-if="row.zylbdm == 'T'" id="WcCc1">
    体育
  </p>
</template>
    <template v-slot:whcddm="{ row }">
  <p v-if="row.whcddm == 1" id="WcCc0">
    初中毕业生
  </p>
  <p v-if="row.whcddm == 2" id="WcCc1">
    初中在校生
  </p>
  <p v-if="row.whcddm == 3" id="WcCc1">
    小学毕业生
  </p>
  <p v-if="row.whcddm == 4" id="WcCc1">
    小学在校生
  </p>
  <p v-if="row.whcddm == 5" id="WcCc1">
    高中毕业生(文科)
  </p>
  <p v-if="row.whcddm == 6" id="WcCc1">
    高中毕业生（理科）
  </p>
  <p v-if="row.whcddm == 7" id="WcCc1">
    高中毕业生（不区分文理科）
  </p>
</template>
    <template v-slot:zslbdm="{ row }">
  <p v-if="row.zslbdm == 1" id="WcCc0">
    五年制高职（师范类）
  </p>
  <p v-if="row.zslbdm == 2" id="WcCc1">
    五年制高职（非师范类）
  </p>
  <p v-if="row.zslbdm == 3" id="WcCc1">
    中职（师范类）
  </p>
  <p v-if="row.zslbdm == 4" id="WcCc1">
    中职（非师范类）
  </p>
  <p v-if="row.zslbdm == 5" id="WcCc1">
    职高（师范类）
  </p>
  <p v-if="row.zslbdm == 6" id="WcCc1">
    职高（非师范类）
  </p>
  <p v-if="row.zslbdm == 7" id="WcCc1">
    技工学校
  </p>
</template>
    <template v-slot:ytdm="{ row }">
  <p v-if="row.ytdm == 1" id="WcCc0">
    艺术
  </p>
  <p v-if="row.ytdm == 2" id="WcCc1">
    体育
  </p>
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
<template v-slot:isJuvenileWorker="{ row }">
  <p v-if="row.isJuvenileWorker == '1'" id="WcCc0">
    是
  </p>
  <p v-if="row.isJuvenileWorker == '0'" id="WcCc1">
    否
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

<template v-slot:schoolSystem="{ row }">
{{ row.schoolSystem }}年
</template>
<template v-slot:zybz="{ row }">
  <p v-if="row.zybz==null">无</p>
 <p v-else>{{ row.zybz }}</p>
</template>
    <template v-slot:Input2="{ row }">
      <lay-tag-input 
    v-model="data1" 
    v-model:inputValue="inputValue1" 
    allowClear
    placeholder="请输入" 
    style="width:180px"
    >
  </lay-tag-input>
    </template>
    <template v-slot:operator="{ row }">
      <p v-if="row.state==1||row.state==2||row.state==4||row.state==5" size="xs" type="primary" style="text-align: center;">暂不可操作</p>
      <lay-button   v-if="row.state === 0 || row.state === 3"   size="xs" type="primary" @click="shenbao(row)">申报</lay-button>
      <lay-button   v-if="row.state === 0 || row.state === 3"   size="xs" @click="openConfirm(row)">修改</lay-button>
      <lay-button   v-if="row.state === 0 || row.state === 3"   size="xs" @click="del(row)">删除</lay-button>
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
import ReplacementComponent from './TpPage.vue';
import { ref, watch, reactive,h, resolveComponent,onMounted,defineAsyncComponent  } from 'vue';
import { layer } from '@layui/layui-vue';
import { datag } from '@/dataglober.ts';
import { lxxdle,lxxsallhen,lxxshen,lxxflie,lxxshuart } from '@/api/api.js';
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
    console.log("司马了s")
    const id = datag.school.value.userId || (JSON.parse(localStorage.getItem('schooll')) || {}).userId || '无';
const name = datag.school.value.schoolName || (JSON.parse(localStorage.getItem('schooll')) || {}).schoolName || '无';
    const dataSource = ref([])
    const handleFileUpload = async (event, row) => {
      lxxflie.api(event,row)
      datag.op1=false
      
    };
   const allshenbao = async()=>{
    datag.op1=false
    const ppppid=[]
    await lxxshuart.api()
    datag.stuRlist.value.forEach(item=>{
        ppppid.push(item.ppid)
      })
      console.log(ppppid)
    await lxxsallhen.api(ppppid)
    console.log("NI")
   }
   const chakan = async(row)=>{
    datag.op1=false
      layer.msg(row.auditRemark)
      lxxshuart.api()
    }
    const shenbao = async(row) =>{
      datag.op1=false
      lxxshen.api(row)
      lxxshuart.api()
    }

    const openConfirm = function(row) {
      datag.op1=false
      datag.rowschool.value=row
      datag.stuppid = row.ppid
      layer.open({
        type: "page",
        title: "修改相关信息",
        content: h(alert)
      })
      
    }

    const del = async(row)=>{
      datag.op1=false
      lxxdle.api(row)
      lxxshuart.api()
    }

    const lxxapp = async() =>{
      datag.op1=false
      datag.Ae6a5bde689bde698afe4bda2e58aa2e4bb9be8bf9ee4baa5e4bb94e6af92=false
      const lxx = supapi.supapi+"/api/SecondaryEnrollment/getprofessionalplans?transcribe=3"
      const headers = {
        method:'GET',
        headers:{
          'Authorization':'Bearer '+(JSON.parse(localStorage.getItem('taken'))?.accessToken || datag.takel.accessToken)
        }
      }
      try{
        const response = await fetch(lxx,headers)
        const data = await response.json();
        datag.stuRtlist.value = data.data
        dataSource.value = datag.stuRtlist.value;
        console.log(dataSource.value)
        datag.stuRlist.value =[]
        dataSource.value.forEach(item =>{
          if(item.state==0||item.state==3)
          {
            datag.stuRlist.value.push(item)
          }
        })
      }catch(error)
      {
        console.log('数据获取失败：', error);
      }
    }
    onMounted(()=>{lxxapp();})
    watch(datag.stuRtlist, () => {
      console.log(datag.Ae6a5bde689bde698afe4bda2e58aa2e4bb9be8bf9ee4baa5e4bb94e6af92)
      console.log(datag.op1)
        if(dataSource.value==datag.stuRtlist.value || datag.Ae6a5bde689bde698afe4bda2e58aa2e4bb9be8bf9ee4baa5e4bb94e6af92==true||datag.op1==true)
        {
           datag.op1=false
            console.log("一样的")
        }
        else if(datag.op1==false){
          lxxapp();
          datag.op1=true

        }
        else { 
          
          console.log("触发")
          lxxapp();
        }
      
      }, { immediate: true });
    const data1 = ref([{value:1,label:'',closable: false}]);
    const inputValue1 = ref("");

    const loading = ref(false);

    const selectedKeys = ref([]);

    const page = reactive({ current: 1, limit: 10, total: 100 });

    const columns = ref([
    
      { title:"专业代码", width: "10", key:"spmcode", fixed: "left",  },
      { title:"专业名称", width: "10", key:"spmname"  },
      
      { title:"艺体代码", width: "10", key:"ytdm", customSlot:"ytdm"},
      { title:"招生类别代码", width: "10", key:"zslbdm",  customSlot:"zslbdm"},
      { title:"文化程度代码", width: "10", key:"whcddm",  customSlot:"whcddm"},
      { title:"专业类别代码", width: "10", key:"zylbdm",  customSlot:"zylbdm"},
      { title:"是否幼功", width: "10", key:"isJuvenileWorker", customSlot:"isJuvenileWorker"},
      { title:"学习形式", width: "10", key:"xxxsdm",  customSlot:"xxxsdm"},
      { title:"学制", width: "10", key:"schoolSystem",  customSlot:"schoolSystem"},
      { title:"学费", width: "10", key:"tuition"},
      { title:"专业备注", width: "10", key:"zybz", customSlot:"zybz"},

      { title:"原计划数", width: "10", key:"orginal_plan_number",},
      { title:"拟计划数", width: "10", key:"planned_number" },
      { title:"状态", width: "10", key:"state",customSlot:"word3"},
      { title:"操作", width: "10", customSlot:"operator", fixed: "right", ignoreExport: true },
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
      shenbao,
      del,
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
.layui-table-cell-content button.layui-btn-xs:first-child {
  margin-left: 10px;
}
.layui-table-cell-content button.layui-btn-xs{
  margin-top: 10px;
}
.scroll-container1 {
  width: 100%;
  height: 650px;
  overflow: auto;
  margin: 10px auto;
  border: 1px solid #ccc;
}
.layui-table-cell-content{
  display: block;
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
        width:99%;
        height: 800px;
        background: #e6e6e6;
    }
</style>