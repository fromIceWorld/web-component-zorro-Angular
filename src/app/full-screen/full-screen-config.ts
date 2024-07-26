const FULL_SCREEN_CONFIG = {
  className: 'FullScreenComponent',
  html: [
    {
      name: '组件配置',
      config: {
        width: {
          type: 'number',
          value: 30,
        },
        left: {
          type: 'number',
          value: 0,
          postfix: 'px',
        },
        top: {
          type: 'number',
          value: 0,
          postfix: 'px',
        },
        right: {
          type: 'number',
          value: 0,
          postfix: 'px',
        },
        bottom: {
          type: 'number',
          value: 0,
          postfix: 'px',
        },
      },
    },
  ],
  component: {
    input: [],
    event: [{ label: 'point', value: 'point' }],
    methods: [],
    data: ['index'],
  },
};
export { FULL_SCREEN_CONFIG };
