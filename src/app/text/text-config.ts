const TEXT_CONFIG = {
  className: 'TextComponent',
  html: [
    {
      name: '组件配置',
      config: {
        value: {
          type: 'string',
          value: '姓名',
        },
        fontSize: {
          type: 'string',
          value: '14',
          postfix: 'px',
        },
        fontWeight: {
          type: 'number',
          value: 400,
        },
        color: {
          type: 'color',
          value: 'black',
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
    event: [],
    methods: [
      { label: 'showChange', value: 'showChange' },
      { label: 'show', value: 'show' },
      { label: 'hide', value: 'hide' },
    ],
    data: ['text'],
    params: [],
  },
};
export { TEXT_CONFIG };
