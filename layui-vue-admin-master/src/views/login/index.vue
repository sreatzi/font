<template>
  <div class="login-wrap" id="bgd-box">
    <div class="login-root">
      <div class="login-main">
        <img class="login-one-ball"
          src="https://assets.codehub.cn/micro-frontend/login/fca1d5960ccf0dfc8e32719d8a1d80d2.png" />
        <img class="login-two-ball"
          src="https://assets.codehub.cn/micro-frontend/login/4bcf705dad662b33a4fc24aaa67f6234.png" />
        <div class="login-container">
          
          <div class="login-ID">
            <div style="font-size: 22px; margin-bottom: 15px; margin-top: 5px">
              🎯 登录-学校端
            </div>
            <lay-tab type="brief" v-model="method">
              <lay-tab-item title="用户名" id="1">
                <div style="height: 250px">
                  <lay-form-item :label-width="0">
                    <lay-input :allow-clear="true"  prefix-icon="layui-icon-username" placeholder="用户名" id="user" 
                    type="text"></lay-input>
                  </lay-form-item>
                  <lay-form-item :label-width="0">
                    <lay-input :allow-clear="true"  prefix-icon="layui-icon-password"  placeholder="密码" 
                      type="password" id="passwrod"></lay-input>
                  </lay-form-item>
                
                  <lay-checkbox value="" name="like" v-model="remember" skin="primary" label="1" @click="rem">记住密码</lay-checkbox>
                  <lay-form-item :label-width="0">
                
                    <lay-button style="margin-top: 20px" type="primary" :loading="loging" :fluid="true"
                      loadingIcon="layui-icon-loading" @click="loginSubmit">登录</lay-button>
                  </lay-form-item>
                </div>
              </lay-tab-item>
             
            </lay-tab>
            <lay-line>高职转录申报系统</lay-line>
           
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
import axios from 'axios';
import {lxxApi} from '@/api/api.js'
import { datag } from '@/dataglober.ts';
import { login } from '../../api/module/user'
import { verificationImg, loginQrcode } from '../../api/module/commone'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../store/user'
import { layer } from '@layui/layer-vue'
import {ppapi} from '../../../public/config'
export default defineComponent({
  setup() {
    const router = useRouter()
    const userStore = useUserStore()
    const method = ref('1')
    const stats = ref('0');
    const verificationImgUrl = ref('')
    const loging = ref(false);
    const loginQrcodeText = ref('')
    const remember = ref(false)
    const loginForm = reactive({
      account: 'admin',
      password: '123456',
      vercode: 'DqJFN'
    })
    stats.value = 0;
    var i = 0;
    const rem = async () => {
  
  i++;
  console.log(stats.value);
  if (i % 2 === 0) {
    stats.value = 0;
  } else {
    stats.value = 1;
  }
  console.log(stats.value);
}

  const tkk = async()=>{
    // localStorage.clear()
    const takelString = localStorage.getItem('takel');

    // 检查takelString是否存在，因为如果没有存储任何值，getItem会返回null
    if (takelString) {
      // 将JSON字符串转换回对象
      const takelObject = JSON.parse(takelString);
      router.push('/main')
      // 在控制台打印对象
      console.log(takelObject);
    } else {
      // 如果没有找到takel值，打印一个错误或者提示信息
      console.log('No takel value found in localStorage.');
      router.push('/login')
    }
  }

    onMounted(() => {
      tkk()
      // toRefreshImg()
      // toRefreshQrcode()
    })

    const loginSubmit = async () => {
      // lxxppapi.apiurl()
        var username = document.querySelector('input[type="text"]').value;
        var password = document.querySelector('input[type="password"]').value;
        const lxxlc = ppapi.apiurl + "/api/OAuth/login";
        let lxxdata = {
          Account: username,
          Password: password
        };
        const headers = {
        method: 'POST',
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(lxxdata)
        };

        loging.value = true;
        fetch(lxxlc, headers)
        .then((response) => response.json())
        .then((data) => {
          setTimeout(() => {
            loging.value = false;
            if (data.result === 0) {
              layer.msg(data.message, { icon: 1 }, async () => {
                console.log(data);
                datag.passworddd = password
                datag.takel = data.data
                localStorage.setItem('password', JSON.stringify(datag.passworddd));
                if(stats.value == 1){
                  localStorage.setItem('takel', JSON.stringify(datag.takel));
                }else{
                  localStorage.clear()
                }
                
                console.log("Login success!");
              if(data.data.first ==1){
                  router.push('/myfirst')
                  datag.password = password
                  datag.school.value=data.data
                  localStorage.setItem('school',JSON.stringify(datag.school.value))
              }else{
                  router.push('/main')
                  datag.password = password
                  datag.school.value=data.data
                  localStorage.setItem('school',JSON.stringify(datag.school.value))
              }
              });
            } else {
              layer.msg(data.message, { icon: 2 });
              console.log(data);
              console.log("Login failed!");
              // 在这里进行登录失败后的操作
            }
          }, 1000);
        });
    }

    const toRefreshImg = async () => {
      let { data, code, msg } = await verificationImg()
      if (code == 200) {
        verificationImgUrl.value = data.data
      } else {
        layer.msg(data.msg, { icon: 2 })
      }
    }
    const toRefreshQrcode = async () => {
      let { data, code, msg } = await loginQrcode()
      if (code == 200) {
        loginQrcodeText.value = data.data
      } else {
        layer.msg(data.msg, { icon: 2 })
      }
    }

    return {
      stats,
      rem,
      tkk,
      toRefreshQrcode,
      toRefreshImg,
      loginSubmit,
      loginForm,
      remember,
      method,
      loging
    }
  }
})
</script>

<style scoped>
.login-captach {
  display: inline-block;
  vertical-align: bottom;
  width: 108px;
  height: 40px;
  color: var(--global-primary-color);
  margin-left: 8px;
  border-radius: 4px;
  border: 1px solid hsla(0, 0%, 60%, 0.46);
  transition: border 0.2s;
  box-sizing: border-box;
  background: #fff;
  overflow: hidden;
  cursor: pointer;
}

.login-one-ball {
  opacity: 0.4;
  position: absolute;
  max-width: 568px;
  left: -400px;
  bottom: 0px;
}

.login-two-ball {
  opacity: 0.4;
  position: absolute;
  max-width: 320px;
  right: -200px;
  top: -60px;
}

.login-wrap {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: auto;
  min-width: 600px;
  z-index: 9;

  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
}

.login-wrap :deep(.layui-input-block) {
  margin-left: 0 !important;
}

.login-root {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  width: 100%;
  min-width: 320px;
  background-color: initial;
}

.login-main {
  position: relative;
  display: block;
}

.logo-container {
  max-width: calc(100vw - 28px);
  margin-bottom: 40px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-container .logo {
  display: inline-block;
  height: 30px;
  width: 143px;
  background: url() no-repeat 50%;
  background-size: contain;
  cursor: pointer;
}

.login-container {
  position: relative;
  overflow: hidden;
  width: 419px;
  height: 520px;
  max-width: calc(100vw - 28px);
  border-radius: 4px;
  background: hsla(0, 0%, 100%, 0.5);
  backdrop-filter: blur(30px);
  display: flex;
  box-shadow: 6px 6px 12px 4px rgba(0, 0, 0, 0.1);
}

.login-side {
  padding: 40px 20px 20px;
  background-color: var(--global-primary-color);
  flex: 1;
  height: 100%;
}

.login-bg-title {
  flex: 1;
  height: 84%;
  color: #fff;
  text-align: center;

  background-repeat: no-repeat;
  background-position: bottom;
  background-size: contain;
  text-align: center;
  min-width: 200px;
}

.login-ID {
  padding: 20px;
  width: 380px;
  min-width: 380px;
}

.login-container .layui-tab-head {
  background: transparent;
}

.login-container .layui-input-wrapper {
  margin-top: 10px;
  margin-bottom: 10px;
}

.login-container .layui-input-wrapper {
  margin-top: 12px;
  margin-bottom: 12px;
}

.login-container .assist {
  margin-top: 5px;
  margin-bottom: 5px;
  letter-spacing: 2px;
}

.login-container .layui-btn {
  margin: 10px 0px 10px 0px;
  letter-spacing: 2px;
  height: 40px;
}

.login-container .layui-line-horizontal {
  letter-spacing: 2px;
  margin-bottom: 34px;
  margin-top: 24px;
}

.other-ways {
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 14px;
  font-weight: 400;
}

.other-ways li {
  width: 100%;
}

.line-container {
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
}

.line-container .icon {
  height: 28px;
  width: 28px;
  margin-right: 0;
  vertical-align: middle;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 2px 0 rgb(9 30 66 / 4%), 0 1px 4px 0 rgb(9 30 66 / 10%),
    0 0 1px 0 rgb(9 30 66 / 10%);
}

.line-container .text {
  display: block;
  margin: 12px 0 0;
  font-size: 12px;
  color: #8592a6;
}

:deep(.layui-tab-title .layui-this) {
  background-color: transparent;
}
</style>
