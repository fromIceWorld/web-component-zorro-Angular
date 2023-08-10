// 用于将组件发布到数据库系统中。

/**
 * view 节点的范围 [1:只在视图区, 2:只在关系区, 3:即在视图区也在关系区]
 */
const components = [
    {
      id: 'text',
      type: 'node',
      icon: 'font-size',
      title: `文本:
                  Angular@10+ng-zorro-antd`,
      color: '#dd0031',
      view: 0,
      family: 'base',
      des: '基础的text文本组件',
      component: 'TextComponent',
    },
    {
      id: 'icon',
      type: 'node',
      icon: 'sketch',
      title: `图标:
                  Angular@10+ng-zorro-antd`,
      color: '#dd0031',
      view: 0,
      family: 'base',
      des: '基础的icon组件',
      component: 'IconComponent',
    },
    {
      id: 'button',
      type: 'node',
      icon: 'tool',
      title: `按钮:
                 Angular@10+ng-zorro-antd`,
      color: '#dd0031',
      view: 0,
      family: 'base',
      des: '基础的按钮组件',
      component: 'ButtonComponent',
    },
    {
      id: 'image',
      type: 'node',
      icon: 'picture',
      title: `图片:
                 Angular@10+ng-zorro-antd`,
      color: '#dd0031',
      view: 0,
      family: 'base',
      des: '图片组件',
      component: 'ImageComponent',
    },
    // {
    //   id: 'container',
    //   type: 'combo',
    //   icon: 'border-outer',
    //   title: `布局容器:
    //               Angular@10+ng-zorro-antd`,
    //   color: '#dd0031',
    //   view: 0,
    //   family: 'layout',
    //   des: '基础的布局组件',
    //   component: 'ContainerComponent',
    // },
    {
      id: 'input',
      type: 'node',
      title: `输入框:
                  Angular@10+ng-zorro-antd`,
      color: '#dd0031',
      icon: 'edit',
      view: 0,
      family: 'form',
      des: '基础的输入框组件',
      component: 'InputComponent',
    },
    {
      id: 'radio',
      type: 'node',
      title: `单选框:
                  Angular@10+ng-zorro-antd`,
      color: '#dd0031',
      icon: 'aim',
      view: 0,
      family: 'form',
      des: '基础的单选框组件',
      component: 'RadioComponent',
    },
    {
      id: 'select',
      type: 'node',
      title: `选择列:
                  Angular@10+ng-zorro-antd`,
      color: '#dd0031',
      icon: 'down',
      view: 0,
      family: 'form',
      des: '基础的下拉选择组件',
      component: 'SelectComponent',
    },
    {
      id: 'table',
      type: 'node',
      icon: 'table',
      title: `表格:
                 Angular@10+ng-zorro-antd`,
      color: '#dd0031',
      view: 0,
      family: 'table',
      des: '基础的table组件',
      component: 'TableComponent',
    },
    {
      id: 'pagination',
      type: 'node',
      icon: 'delivered-procedure',
      title: `分页:
                 Angular@10+ng-zorro-antd`,
      color: '#dd0031',
      view: 0,
      family: 'table',
      des: '基础的分页组件',
      component: 'PaginationComponent',
    },
    {
      id: 'tag',
      type: 'node',
      icon: 'tags',
      title: `标签:
                 Angular@10+ng-zorro-antd`,
      color: '#dd0031',
      view: 0,
      family: 'tag',
      des: '基础的标签组件',
      component: 'TagComponent',
    },
    {
      id: 'dialog',
      type: 'combo',
      node: 'dialog', // 当前节点在视图上对应的图形
      color: '#dd0031',
      icon: 'switcher',
      title: `弹窗:
                Angular@10+ng-zorro-antd`,
      view: 2,
      family: 'dialog',
      des: '基础的弹窗组件',
      component: 'DialogComponent',
    },
    {
      id: 'api',
      type: 'node',
      icon: 'radar-chart',
      title: `接口:
                Angular@10+ng-zorro-antd`,
      color: '#dd0031',
      node: 'api',
      view: 3,
      family: 'api',
      des: '基础的http组件',
      component: 'RequestComponent',
    },
    {
      id: 'hook',
      type: 'node',
      icon: 'field-time',
      title: `hook:
                Angular@10+ng-zorro-antd`,
      color: '#dd0031',
      node: 'hook',
      view: 3,
      family: 'hook',
      des: '页面hook',
      component: 'HookComponent',
    },
  ],
  file = 'dist/';
const http = require('http'),
  request = require('request');
const filesName = [
  { name: 'main.js', decorator: { defer: true } },
  { name: 'polyfills.js', decorator: { defer: true } },
  { name: 'runtime.js', decorator: { defer: true } },
  { name: 'vendor.js', decorator: { defer: true } },
  'styles.css',
];
let options = {
  url: 'http://127.0.0.1:3000/upload',
  method: 'POST',
  json: true,
  headers: {
    'content-type': 'application/json',
  },
  body: {},
};
let files = [],
  area = 'base';
filesName.forEach((fileName) => {
  let name = typeof fileName == 'string' ? fileName : fileName.name;
  let content = require('fs').readFileSync(file + name);
  let buffer = Buffer.from(content);
  files.push({
    name,
    content: buffer.toString(),
  });
});
// 引入 图标js文件
let iconJS = Buffer.from(
  require('fs').readFileSync('./iconfont/iconfont.js')
).toString();
files.push({
  name: 'iconfont.js',
  content: iconJS,
});

let componentsConfig = components.map((item) => {
  return {
    ...item,
    filesName: [...filesName, { name: 'iconfont.js', decorator: {} }],
    area,
  };
});
request(
  {
    ...options,
    body: {
      code: 200,
      data: {
        components: componentsConfig,
        content: files,
        area,
      },
    },
  },
  (err, res, body) => {
    if (res.statusCode === 200) {
      console.log(filesName, res.statusCode, '上传完成');
    } else {
      console.log(body);
    }
  }
);
