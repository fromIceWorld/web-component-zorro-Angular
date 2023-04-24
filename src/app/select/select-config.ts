const SELECT_CONFIG = {
  className: 'SelectComponent', // 暴露出的组件class名称【组件可以注册到window上，并把配置同时暴露】
  html: {
    placeholder: {
      type: 'string',
      value: '请选择',
    },
    formcontrol: {
      type: 'string',
      value: 'sex',
    },
    options: {
      type: 'list',
      options: ['男', '女'],
      value: '',
    },
    method: {
      type: 'array',
      options: [
        { label: 'get', value: 'get' },
        { label: 'post', value: 'post' },
        { label: 'put', value: 'put' },
        { label: 'delete', value: 'delete' },
      ],
      value: 'get',
    },
    ['注意']: {
      type: 'note',
      value: 'api为空,options将使用默认值;非空将启用下拉懒加载。',
    },
    api: {
      type: 'string',
      value: 'https://api.randomuser.me/?results=10',
    },
  },
  css: {
    classes: '',
    style: {},
  },
  component: {
    event: [],
    methods: [{ label: 'clear', value: 'clear' }],
    data: ['value'],
    params: [],
  },
};
export { SELECT_CONFIG };
