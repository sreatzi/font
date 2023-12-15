<template>
  <div>
   <h3>拟计划数异常 需要上传异常证明文件</h3>
    
    
  </div>
</template>

<script>
import { ref } from 'vue';
import { layer } from '@layui/layui-vue';
import { lxxflie } from '@/api/api.js';
import {ppapi} from '../../../public/config'
export default {
  setup() {
    const row = ref(null);

    const handleFileUpload = async (event, row) => {
      await fetchData();
      lxxflie.api(event, row);
    };

    const stusure = () => {
      // 点击确定按钮的逻辑
    };

    return {
      row,
      handleFileUpload,
      stusure
    };
  }
}
</script>

<style>
h3{
  margin-left: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-right: 10px;
  color: rgb(237, 93, 93);
}
</style>
