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
        color: {
          type: 'color',
          value: 'black',
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
