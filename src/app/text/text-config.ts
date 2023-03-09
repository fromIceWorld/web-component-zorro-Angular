const TEXT_CONFIG = {
  className: 'TextComponent',
  html: {
    text: {
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
    data: [{ label: 'text', value: 'text' }],
    params: [{ label: 'text', value: 'text' }],
  },
};
export { TEXT_CONFIG };
