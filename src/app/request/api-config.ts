const API_CONFIG = {
  className: 'APIComponent', // 暴露出的组件class名称【组件可以注册到window上，并把配置同时暴露】
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
    classes: '',
    style: {},
  },
  component: {
    event: [
      { label: 'loading', value: 'loading' },
      { label: 'error', value: 'error' },
      { label: 'success200', value: 'success200' },
      { label: 'success500', value: 'success500' },
    ],
    methods: [{ label: 'request', value: 'request' }],
    data: ['list', 'total', 'message'],
    params: [],
  },
};
export { API_CONFIG };
