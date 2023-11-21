const IMAGE_CONFIG = {
  className: 'ImageComponent', // 暴露出的组件class名称【组件可以注册到window上，并把配置同时暴露】
  html: [
    {
      name: '组件style配置',
      config: {
        width: {
          type: 'string',
          value: 'auto',
        },
        height: {
          type: 'string',
          value: 'auto',
        },
      },
    },
    {
      name: '图片配置',
      config: {
        src: {
          type: 'string',
          value:
            'data:image/png;base64,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',
        },
      },
    },
  ],
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
export { IMAGE_CONFIG };
