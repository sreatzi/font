<template>
    <div v-if="!showReplacement">
   <div class="container-demo">
    
      <lay-field theme="green">
    <template #title >
      欢迎:{{ name }}
    </template>
  </lay-field>
    <div style="height: 800px;">
   <lay-table 
        
        :resize="true"
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
        
        <lay-button size="sm" type="primary" @click="showReplacement = true">添加专业</lay-button>
      </template>
      <template v-slot:operator="{ row }">
        
        <p>不可操作</p>
      <lay-button size="xs" type="primary">修改</lay-button>
      <lay-button size="xs">删除</lay-button>
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
<template v-slot:zybz="{ row }">
  <p v-if="row.zybz==null">无</p>
 <p v-else>{{ row.zybz }}</p>
</template>
<template v-slot:schoolSystem="{ row }">
{{ row.schoolSystem }}年
</template>
    </lay-table>
  </div>
   </div>
  
    </div>
     <div v-else class="replacement-wrapr">
        <ReplacementComponent />
      </div>
    </template>
  <script>
  import ReplacementComponent from './ThPage.vue';
  import { ref, watch, reactive,h, resolveComponent,onMounted,defineAsyncComponent  } from 'vue';
  import { layer } from '@layui/layui-vue';
  import { datag } from '@/dataglober.ts';
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
      const dataSource = ref([
      ])
      const id = datag.school.value.userId || (JSON.parse(localStorage.getItem('schooll')) || {}).userId || '无';
const name = datag.school.value.schoolName || (JSON.parse(localStorage.getItem('schooll')) || {}).schoolName || '无';
      const fechdata = async()=>{
        const lxx = supapi.supapi + "/api/SecondaryEnrollment/getprofessionalplans?transcribe=1"
        const headers= {
          method:'GET',
          headers:{
            'Authorization':'Bearer '+(JSON.parse(localStorage.getItem('taken'))?.accessToken || datag.takel.accessToken)
          }
        }
        try{
          const response = await fetch(lxx,headers)
          const data = await response.json()
          datag.stuone.value = data.data
          dataSource.value = datag.stuone.value;
          console.log(dataSource.value)
        }catch(error){
          console.log('数据获取失败',error)
        }
      }
      onMounted(()=>{fechdata()})
      const data1 = ref([{value:1,label:'',closable: false}]);
      const inputValue1 = ref("");
  
      const loading = ref(false);
  
      const selectedKeys = ref([]);
  
      const page = reactive({ current: 1, limit: 10, total: 100 });
  
      const columns = ref([
      
        { title:"专业代码", width: "50px", key:"spmcode", fixed: "left", sort: "desc" },
        { title:"专业名称", width: "50px", key:"spmname", sort: "desc" },
        { title:"原计划数", width: "50px", key:"orginal_plan_number" },
        { title:"拟计划数", width: "50px", key:"planned_number", totalRow: true},
        { title:"专业备注", width: "50px", key:"zybz", totalRow: true,customSlot:"zybz"},
        { title:"状态", width: "40px", customSlot: "word3", key:"state", },
      
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