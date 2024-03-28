const HOOK_CONFIG = {
  className: 'HookComponent', // 暴露出的组件class名称【组件可以注册到window上，并把配置同时暴露】
  html: [
    {
      name: '组件配置',
      config: {
        type: {
          type: 'select',
          options: [
            { label: 'setTimeout', value: 'setTimeout' },
            { label: 'setInterval', value: 'setInterval' },
          ],
          value: 'setTimeout',
        },
        delay: {
          type: 'number',
          value: 1000,
        },
      },
    },
  ],
  component: {
    event: [{ label: 'run', value: 'run' }],
    methods: [{ label: 'start', value: 'start' }],
    data: [],
  },
};
export { HOOK_CONFIG };
