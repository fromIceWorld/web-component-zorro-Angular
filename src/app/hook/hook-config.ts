const HOOK_CONFIG = {
  className: 'HookComponent', // 暴露出的组件class名称【组件可以注册到window上，并把配置同时暴露】
  html: {
    delay: {
      type: 'number',
      value: 0,
    },
    count: {
      type: 'number',
      value: 1,
    },
    interval: {
      type: 'number',
      value: 10000,
      postfix: 'ms',
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
  },
  component: {
    event: [{ label: 'connectedCallback', value: 'connectedCallback' }],
    methods: [],
    data: [],
    params: [],
  },
};
export { HOOK_CONFIG };