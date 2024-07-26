const PROGRESS_CONFIG = {
  className: 'ProgressComponent', // 暴露出的组件class名称【组件可以注册到window上，并把配置同时暴露】
  html: [
    {
      name: '配置项',
      config: {
        percentage: {
          type: 'number',
          value: 50,
        },
        height: {
          type: 'number',
          value: 5,
        },
        color: {
          type: 'string',
          value: `linear-gradient(-90deg, #ff947b 8%, rgba(255, 148, 123, 0.65) 54%, rgba(255, 148, 123, 0.3) 100%),linear-gradient( #253d50, #253d50)`,
        },
      },
    },
  ],
  component: {
    input: ['color', 'percentage'],
    event: [],
    methods: [],
    data: [],
  },
};
export { PROGRESS_CONFIG };
