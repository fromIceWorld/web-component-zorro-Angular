// 用于将组件发布到数据库系统中。

/**
 * view 节点的范围 [1:只在视图区, 2:只在关系区, 3:即在视图区也在关系区]
 */
const components = [
    {
      id: 'text',
      name: '文本',
      type: 'node',
      icon: '#icon-wenben',
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
      name: '图标',
      type: 'node',
      icon: '#icon-tubiao',
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
      name: '按钮',
      type: 'node',
      icon: '#icon-anniu1',
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
      name: '图片',
      type: 'node',
      icon: '#icon-tupian',
      title: `图片:
                 Angular@10+ng-zorro-antd`,
      color: '#dd0031',
      view: 0,
      family: 'base',
      des: '图片组件',
      component: 'ImageComponent',
    },
    {
      id: 'input',
      name: '输入框',
      type: 'node',
      title: `输入框:
                  Angular@10+ng-zorro-antd`,
      color: '#dd0031',
      icon: '#icon-wenbenshurukuang',
      view: 0,
      family: 'form',
      des: '基础的输入框组件',
      component: 'InputComponent',
    },
    {
      id: 'radio',
      name: '单选框',
      type: 'node',
      title: `单选框:
                  Angular@10+ng-zorro-antd`,
      color: '#dd0031',
      icon: '#icon-radioBoxList',
      view: 0,
      family: 'form',
      des: '基础的单选框组件',
      component: 'RadioComponent',
    },
    {
      id: 'select',
      name: '下拉框',
      type: 'node',
      title: `下拉框:
                  Angular@10+ng-zorro-antd`,
      color: '#dd0031',
      icon: '#icon-xialakuang',
      view: 0,
      family: 'form',
      des: '基础的下拉选择组件',
      component: 'SelectComponent',
    },
    {
      id: 'table',
      name: '表格',
      type: 'node',
      icon: '#icon-biaoge',
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
      name: '分页器',
      type: 'node',
      icon: '#icon-fenyeqi',
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
      name: '标签',
      type: 'node',
      icon: '#icon-Tag',
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
      name: '弹窗',
      type: 'combo',
      node: 'dialog', // 当前节点在视图上对应的图形
      color: '#dd0031',
      icon: '#icon-danchuang',
      title: `弹窗:
                Angular@10+ng-zorro-antd`,
      view: 2,
      family: 'dialog',
      des: '基础的弹窗组件',
      component: 'DialogComponent',
    },
    {
      id: 'api',
      name: 'API接口',
      type: 'node',
      icon: '#icon-jiekou',
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
      id: 'router',
      name: '路由接口',
      type: 'node',
      icon: '#icon-jiekou',
      title: `路由:
                Angular@10+ng-zorro-antd`,
      color: '#dd0031',
      node: 'router',
      view: 3,
      family: 'router',
      des: '基础的路由组件',
      component: 'RouterComponent',
    },
    {
      id: 'hook',
      name: 'hook',
      type: 'node',
      icon: '#icon-hook',
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
  folderPath = './dist';
const fs = require('fs'),
  path = require('path'),
  request = require('request');
const filesName = [
  { name: 'main.js', decorator: { defer: true } },
  { name: 'polyfills.js', decorator: { defer: true } },
  { name: 'runtime.js', decorator: { defer: true } },
  { name: 'vendor.js', decorator: { defer: true } },
  'styles.css',
];
const area = 'base';
components.map((item) => {
  item['filesName'] = filesName;
  item['area'] = area;
});
//@ts-ignore
let options = {
  url: 'http://127.0.0.1:3000/upload',
  method: 'POST',
  headers: {
    'content-type': 'multipart/form-data',
  },
  formData: {
    files: [],
    area,
    components: JSON.stringify(components),
  },
};
// 递归遍历文件夹中的所有文件
function uploadFolder(folderPath, dir) {
  const files = fs.readdirSync(folderPath);
  files.forEach((file) => {
    const filePath = folderPath + '/' + file;
    // 判断是否为文件夹
    if (fs.statSync(filePath).isDirectory()) {
      // 递归上传子文件夹
      uploadFolder(filePath, dir + '/' + file);
    } else {
      // 上传文件
      uploadFile(filePath, dir, file);
    }
  });
}

// 缓存上传文件
function uploadFile(filePath, dir, fileName) {
  const content = fs.readFileSync(path.resolve(__dirname, filePath));
  options.formData.files.push({
    content: Buffer.from(content).toString(),
    dir,
    fileName,
  });
}
// 将文件缓存
uploadFolder(folderPath, '');
console.log('共上传文件数：', options.formData.files.length);
//@ts-ignore
options.formData.files = JSON.stringify(options.formData.files);
request(options, (err, res, body) => {
  if (res.statusCode === 200) {
    console.log('上传完成');
  } else {
    console.log(body);
  }
});
