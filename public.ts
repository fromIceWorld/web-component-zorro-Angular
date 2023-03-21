// 用于将组件发布到数据库系统中。

/**
 * view 节点的范围 [1:只在视图区, 2:只在关系区, 3:即在视图区也在关系区]
 */
const components = [
    {
      id: 'text',
      type: 'node',
      icon: 'font-size',
      title: '文本',
      view: 3,
      family: 'base',
      des: '基础的text文本组件',
      component: 'TextComponent',
    },
    {
      id: 'button',
      type: 'node',
      icon: 'tool',
      title: '按钮',
      view: 3,
      family: 'base',
      des: '基础的按钮组件',
      component: 'ButtonComponent',
    },
    {
      id: 'container',
      type: 'combo',
      icon: 'border-outer',
      title: '布局容器',
      view: 1,
      family: 'layout',
      des: '基础的布局组件',
      component: 'ContainerComponent',
    },
    {
      id: 'input',
      type: 'node',
      title: '输入框',
      icon: 'edit',
      view: 3,
      family: 'form',
      des: '基础的输入框组件',
      component: 'InputComponent',
    },
    {
      id: 'radio',
      type: 'node',
      title: '单选框',
      icon: 'aim',
      view: 3,
      family: 'form',
      des: '基础的单选框组件',
      component: 'RadioComponent',
    },
    {
      id: 'table',
      type: 'node',
      icon: 'ordered-list',
      title: 'table',
      view: 3,
      family: 'table',
      des: '基础的table组件',
      component: 'TableComponent',
    },
    {
      id: 'dialog_model',
      type: 'combo',
      icon: 'switcher',
      title: 'dialog_model',
      view: 3,
      family: 'dialog',
      des: '基础的弹窗组件',
      component: 'DialogComponent',
    },
    {
      id: 'api',
      type: 'node',
      icon: 'radar-chart',
      title: 'api',
      node: 'api',
      view: 3,
      family: 'api',
      des: '基础的http组件',
      component: 'APIComponent',
    },
  ],
  fileName = 'con';
const http = require('http'),
  request = require('request');
const filesName = [
  'main.js',
  'polyfills.js',
  'runtime.js',
  'styles.js',
  'vendor.js',
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
  let content = require('fs').readFileSync('dist/' + fileName);
  let buffer = Buffer.from(content);
  files.push({
    fileName,
    content: buffer.toString(),
  });
});
let componentsConfig = components.map((item) => {
  return {
    ...item,
    filesName,
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
    }
  }
);
