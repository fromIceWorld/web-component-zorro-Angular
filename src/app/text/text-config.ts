const TEXT_CONFIG = {
  className: 'TextComponent',
  html: {
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
