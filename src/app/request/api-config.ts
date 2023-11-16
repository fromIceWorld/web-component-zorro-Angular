const API_CONFIG = {
  className: 'RequestComponent', // 暴露出的组件class名称【组件可以注册到window上，并把配置同时暴露】
  html: {
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
    api: {
      type: 'string',
      value:
        'https://www.fastmock.site/mock/14c2723aefa052a75b2a6feeed0cf387/suger/records',
    },
  },
  css: {
    width: {
      type: 'number',
      value: 0,
      postfix: 'px',
    },
    height: {
      type: 'number',
      value: 0,
      postfix: 'px',
    },
    style: {},
  },
  component: {
    event: [
      { label: 'validateFalse', value: 'validateFalse' },
      { label: 'loading', value: 'loading' },
      { label: 'error', value: 'error' },
      { label: 'success200', value: 'success200' },
      { label: 'success500', value: 'success500' },
    ],
    methods: [
      { label: 'request', value: 'request' },
      { label: 'validatorAndRequest', value: 'validatorAndRequest' },
    ],
    data: ['list', 'total', 'message'],
    params: [],
  },
};
export { API_CONFIG };
