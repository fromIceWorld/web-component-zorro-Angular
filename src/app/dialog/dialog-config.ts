const DIALOG_CONFIG = {
  className: 'DialogComponent',
  html: {
    title: {
      type: 'string',
      value: '对话框',
    },
  },
  css: {
    style: {
      display: 'flex',
    },
    'padding-top': {
      type: 'number',
      value: 10,
      postfix: 'px',
    },
    'padding-right': {
      type: 'number',
      value: 10,
      postfix: 'px',
    },
    'padding-bottom': {
      type: 'number',
      value: 10,
      postfix: 'px',
    },
    'padding-left': {
      type: 'number',
      value: 10,
      postfix: 'px',
    },
  },
  component: {
    event: [
      { label: 'visible', value: 'visible' },
      { label: 'hiden', value: 'hiden' },
      { label: 'visibleChange', value: 'visibleChange' },
    ],
    methods: [
      { label: 'visible', value: 'visible' },
      { label: 'hiden', value: 'hiden' },
      { label: 'visibleChange', value: 'visibleChange' },
    ],
  },
};
export { DIALOG_CONFIG };
