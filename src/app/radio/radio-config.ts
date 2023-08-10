const RADIO_CONFIG = {
  className: 'RadioComponent',
  html: {
    formcontrol: {
      type: 'string',
      value: 'sex',
    },
    options: {
      type: 'list',
      options: ['男', '女'],
      value: '男',
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
    style: {},
  },
  component: {
    event: [{ label: 'change', value: 'change' }],
    methods: [],
    data: ['value'],
    params: [{ label: 'value', value: 'value' }],
  },
};
export { RADIO_CONFIG };
