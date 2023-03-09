const BUTTON_CONFIG = {
  className: 'ButtonComponent', // 暴露出的组件class名称【组件可以注册到window上，并把配置同时暴露】
  html: {
    disabled: {
      type: 'boolean',
      value: false,
    },
    ghost: {
      type: 'boolean',
      value: false,
    },
    loading: {
      type: 'boolean',
      value: false,
    },
    shape: {
      type: 'array',
      options: [
        { label: 'default', value: '' },
        { label: 'circle', value: 'circle' },
        { label: 'round', value: 'round' },
      ],
      value: '',
    },
    size: {
      type: 'array',
      options: [
        { label: 'default', value: 'default' },
        { label: 'large', value: 'large' },
        { label: 'small', value: 'small' },
      ],
      value: 'default',
    },
    type: {
      type: 'array',
      options: [
        { label: 'primary', value: 'primary' },
        { label: 'dashed', value: 'dashed' },
        { label: 'link', value: 'link' },
        { label: 'text', value: 'text' },
      ],
      value: 'primary',
    },
    block: {
      type: 'boolean',
      value: false,
    },
    danger: {
      type: 'boolean',
      value: false,
    },
    icon: {
      type: 'string',
      value: 'search',
    },
    name: {
      type: 'string',
      value: 'search',
    },
  },
  css: {
    classes: '',
    style: {
      paddingTop: 0,
      paddingRight: 0,
      paddingBottom: 0,
      paddingLeft: 0,
    },
  },
  component: {
    event: [{ label: 'click', value: 'click' }],
    methods: [
      { label: 'setLoading', value: 'setLoading' },
      { label: 'normal', value: 'normal' },
      { label: 'setDisabled', value: 'setDisabled' },
    ],
    data: [],
    params: [],
  },
};
export { BUTTON_CONFIG };
