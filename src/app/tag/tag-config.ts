const TAG_CONFIG = {
  className: 'TagComponent', // 暴露出的组件class名称【组件可以注册到window上，并把配置同时暴露】
  html: [
    {
      name: '组件配置',
      config: {
        mode: {
          type: 'select',
          options: [
            { label: 'default', value: 'default' },
            { label: 'closeable', value: 'closeable' },
            { label: 'checkable', value: 'checkable' },
          ],
          value: 'default',
        },
        tags: {
          type: 'json',
          value:
            '[{"color":"success","checked":false,"value":"success"},{"color":"processing","checked":false,"value":"processing"},{"color":"error","checked":false,"value":"error"},{"color":"warning","checked":false,"value":"warning"},{"color":"default","checked":false,"value":"default"}]',
        },
      },
    },
  ],
  component: {
    event: [],
    methods: [],
    data: ['tagList'],
    params: [],
  },
};
export { TAG_CONFIG };
