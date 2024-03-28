const DIALOG_CONFIG = {
  className: 'DialogComponent',
  html: [
    {
      name: '对话框配置',
      config: {
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
    },
  ],

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
    data: ['title'],
  },
};
export { DIALOG_CONFIG };
