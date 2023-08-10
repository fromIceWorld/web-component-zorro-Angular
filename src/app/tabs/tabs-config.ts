const TABS_CONFIG = {
  className: 'TabsComponent', // 暴露出的组件class名称【组件可以注册到window上，并把配置同时暴露】
  html: {
    position: {
      type: 'array',
      options: [
        { value: 'top', label: 'top' },
        { value: 'left', label: 'left' },
        { value: 'right', label: 'right' },
        { value: 'bottom', label: 'bottom' },
      ],
      value: 'top',
    },
    tabs: {
      type: 'list',
      options: ['tab1', 'tab2'],
      value: 'tab1',
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
    event: [],
    methods: [],
    data: [],
    params: [],
  },
};
export { TABS_CONFIG };
