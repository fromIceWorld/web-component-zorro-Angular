const DIALOG_CONFIG = {
  className: 'DialogComponent',
  html: {
    title: {
      type: 'string',
      value: '对话框',
    },
    width: {
      type: 'number',
      value: 800,
      postfix: 'px',
    },
    height: {
      type: 'number',
      value: 400,
      postfix: 'px',
    },
  },
  css: {
    style: {
      display: 'flex',
    },
    // 'padding-top': {
    //   type: 'number',
    //   value: 10,
    //   postfix: 'px',
    // },
    // 'padding-right': {
    //   type: 'number',
    //   value: 10,
    //   postfix: 'px',
    // },
    // 'padding-bottom': {
    //   type: 'number',
    //   value: 10,
    //   postfix: 'px',
    // },
    // 'padding-left': {
    //   type: 'number',
    //   value: 10,
    //   postfix: 'px',
    // },
    // 'border-width': {
    //   type: 'number',
    //   value: 1,
    //   postfix: 'px',
    // },
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
    event: [
      { label: 'onVisible', value: 'onVisible' },
      { label: 'onHiden', value: 'onHiden' },
      { label: 'onVisibleChange', value: 'onVisibleChange' },
    ],
    methods: [
      { label: 'visible', value: 'visible' },
      { label: 'hiden', value: 'hiden' },
      { label: 'visibleChange', value: 'visibleChange' },
    ],
  },
};
export { DIALOG_CONFIG };
