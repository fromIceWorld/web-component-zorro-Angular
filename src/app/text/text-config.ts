const TEXT_CONFIG = {
  className: 'TextComponent',
  html: {
    value: {
      type: 'string',
      value: '姓名',
    },
  },
  css: {
    'font-size': {
      type: 'number',
      value: 14,
      postfix: 'px',
    },
    color: {
      type: 'string',
      value: 'black',
    },
  },
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
