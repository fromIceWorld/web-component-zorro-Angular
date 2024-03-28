const ROUTER_CONFIG = {
  className: 'RouterComponent', // 暴露出的组件class名称【组件可以注册到window上，并把配置同时暴露】
  html: [
    {
      name: '路由配置',
      config: {
        url: {
          type: 'string',
          value: 'https://www.bing.com/',
        },
        target: {
          type: 'select',
          options: [
            { label: '_self', value: '_self' },
            { label: '_blank', value: '_blank' },
            { label: '_parent', value: '_parent' },
            { label: '_top', value: '_top' },
          ],
          value: '_self',
        },
      },
    },
  ],
  component: {
    event: [],
    methods: [{ label: 'navigate', value: 'navigate' }],
    data: ['url'],
    params: [],
  },
};
export { ROUTER_CONFIG };
