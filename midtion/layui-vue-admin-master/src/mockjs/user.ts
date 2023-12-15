import { Result } from "../types/result";
import { User } from "../types/user";

let user: User = {
  'userId': '1992',
  'username': 'admin',
}

const menus = [
  {
    id: "/main",
    icon: "layui-icon-home",
    title: "首页",
   
  },
  {
    id: "/3+2/plan",
    icon: "layui-icon-table",
    title: "中职普通",
    children: [
      {
        id: "/3+2/plan",
        icon: "layui-icon-form",
        title: "中职普通专业管理"
      }, {
        id: "/3+2/me",
        icon: "layui-icon-form",
        title: "中职普通计划管理"
      }
      , 
    ]
  },
  {
    id: "/1+2",
    icon: "layui-icon-align-left",
    title: "三年艺体类",
    children: [
      {
        id: "/1+2/plan",
        icon: "layui-icon-form",
        title: "三年艺体类专业管理"
      }, {
        id: "/1+2/me",
        icon: "layui-icon-form",
        title: "三年艺体类计划管理"
      }
      , 
    ]
  },
  {
    id: "/high",
    icon: "layui-icon-align-left",
    title: "高中中专",
    children: [
      {
        id: "/high/plan",
        icon: "layui-icon-form",
        title: "高中中专专业管理"
      }, {
        id: "/high/me",
        icon: "layui-icon-form",
        title: "高中中专计划管理"
      }
      , 
    ]
  },
  {
    id: "/onetwo",
    icon: "layui-icon-align-left",
    title: "1+2招生",
    children: [
      {
        id: "/onetwo/plan",
        icon: "layui-icon-form",
        title: "1+2招生专业管理"
      }, {
        id: "/onetwo/me",
        icon: "layui-icon-form",
        title: "1+2招生计划管理"
      }
      , 
    ]
  },
  {
    id: "/save/m",
    icon: "layui-icon-template",
    title: "核对管理",
   
  }, 


]

const getInfo = (req: any, res: any) => {
  let item = JSON.parse(req.body);
  let token = item ? item.token : null;
  let result: Result = {
    code: 200,
    msg: "操作成功",
    data: user,
    success: true
  }
  if (item || token) {
    result.code = 99998;
    result.msg = "请重新登录";
    result.success = false;
  }
  return result;
}

const getPermission = (req: any, res: any) => {
  let item = JSON.parse(req.body);
  let token = item ? item.token : null;
  let result: Result = {
    code: 200,
    msg: "操作成功",
    data: ['sys:user:add', 'sys:user:edit', 'sys:user:delete', 'sys:user:import', 'sys:user:export'],
    success: true
  }
  if (item || token) {
    result.code = 99998;
    result.msg = "请重新登录";
    result.success = false;
  }
  return result;
}

const getMenu = (req: any, res: any) => {
  let item = JSON.parse(req.body);
  let token = item ? item.token : null;
  let result: Result = {
    code: 200,
    msg: "操作成功",
    data: menus,
    success: true
  }
  if (item || token) {
    result.code = 99998;
    result.msg = "请重新登录";
    result.success = false;
  }
  return result;
}

const getLogin = (req: any, res: any) => {
  let item = JSON.parse(req.body);
  let account = item.account;
  let password = item.password;
  if (account === 'admin' && password === '123456') {
    return {
      'code': 200,
      'msg': '登陆成功',
      'data': {
        'userId': '35002',
        'token': 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOiJhZG1pbiIsInVzZXJOYW1lIjoiYWRtaW4iLCJvcmdDb2RlIjoiMzUwMDAiLCJkZXB0Q29kZSI6IjM1MDAwIiwiYXVkIjoiYWRtaW4iLCJpc3MiOiJhZG1pbiIsImV4cCI6MTU5MzUzNTU5OH0.0pJAojRtT5lx6PS2gH_Q9BmBxeNlgBL37ABX22HyDlebbr66cCjVYZ0v0zbLO_9241FX9-FZpCkEqE98MQOyWw',
      }
    }
  } else {
    return {
      'code': 500,
      'msg': '登陆失败,账号密码不正确'
    }
  }
}

const getUpload = (req: any, res: any) => {
  return {
    'code': 200,
    'msg': '上传成功',
    'success': true
  }
}

export default {
  getInfo, getMenu, getLogin, getPermission, getUpload
}