<template>
    <Some v-if="!showReplacement">
     <div class="container-demo">
     <lay-field theme="green">
    <template #title >
      欢迎:{{ name }}
    </template>
  </lay-field>
  <div class="wordallbox" id="wordallbox">
    <lay-input placeholder="提示信息"  class="shuru" type="text"></lay-input>
  <lay-button type="primary" radius @click="cha">查询</lay-button>
  </div>
  <lay-line  border-style="dashed" border-width="3px" theme="green"></lay-line>
  <div class="ttbox">
  <lay-table 
      
        :resize="true"
        :height="'100%'"
        :columns="columns" 
        :loading="loading"
       
        :data-source="dataSource" 
        v-model:selected-keys="selectedKeys"  
        @change="change"
        @sortChange="sortChange">
      <template #status="{ row }">
        <lay-switch :model-value="row.status" @change="changeStatus($event , row)"></lay-switch>
      </template>
  
      <template v-slot:operator="{ row }">
      <lay-button size="xs" type="primary" @click="stud(row)">添加</lay-button>
    </template>
      <template v-slot:o2erator="{ row }">
        <lay-button size="xs" type="primary">添加</lay-button>
      </template>
    </lay-table>
  </div>
  <lay-line  border-style="dashed" border-width="3px" theme="green"></lay-line>
  <lay-button class="back" type="primary" @click="showReplacement = !showReplacement">返回</lay-button>
  
  
  </div>
  </Some>
  <replacementComponent v-else />
  </template>
  <script>
  
  import { ref, watch, reactive,h, resolveComponent,onMounted,defineAsyncComponent  } from 'vue';
  import { layer } from '@layui/layui-vue';
  import { datag } from '@/dataglober.ts';
  import {supapi} from '../../../public/config';
  import { lxxcha,lxxaddstu3 } from '@/api/api.js';
  const replacementComponent = defineAsyncComponent(() => {
    return import('./hmPage.vue');
  })
  
  export default {
    data() {
      return {
        showReplacement:false,
      };
    },
    components: {
      replacementComponent,
    },
    setup() {
       const id = datag.school.value.userId || (JSON.parse(localStorage.getItem('schooll')) || {}).userId || '无';
const name = datag.school.value.schoolName || (JSON.parse(localStorage.getItem('schooll')) || {}).schoolName || '无';
      const stud = async(row)=>{
        lxxaddstu3.api(row)
        const index = dataSource.value.indexOf(row);
  if (index !== -1) {
    dataSource.value.splice(index, 1); // 删除该行数据
  }
    }
    const cha = async()=>{
      var number = document.querySelector('input[type="text"]').value;
       console.log(number)
       lxxcha.api(number)
       console.log(datag.stuadd.value)
       dataSource.value = datag.stuadd.value
    }
      const loading = ref(false);
  
      const selectedKeys = ref([]);
  
      const page = reactive({ current: 1, limit: 10, total: 100 });
  
      const columns = ref([
      { title:"专业代码", width: "120px", key:"spmcode"},
      { title:"专业名称", width: "120px", key:"spmname"},
      { title:"操作", width: "40px", customSlot:"operator", key:"operator", fixed: "right", ignoreExport: true }
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
  
      const dataSource = ref([])
  
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
        stud,
        cha,
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
  .shuru{
    border-radius: 15px;
  }
  .back{
    display: flex;
    margin: 0 auto;
  }
  .ttbox{
      display: flex;
      justify-content: center;
      margin:0 auto;
  width: 600px;
  }
  
  
  .wordallbox{
      width: 550px;
      display: flex;
      justify-content: center;
      margin:0 auto;
  }
  </style>