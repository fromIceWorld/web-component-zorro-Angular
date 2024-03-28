declare var require: any;
const BUTTON_CONFIG = {
  className: 'ButtonComponent', // 暴露出的组件class名称【组件可以注册到window上，并把配置同时暴露】
  html: [
    {
      name: '基础',
      config: {
        name: {
          type: 'string',
          value: 'search',
        },
      },
    },
    {
      name: '样式设置',
      config: {
        shape: {
          type: 'select',
          options: [
            { label: 'default', value: '' },
            { label: 'circle', value: 'circle' },
            { label: 'round', value: 'round' },
          ],
          value: '',
        },
        size: {
          type: 'select',
          options: [
            { label: 'default', value: 'default' },
            { label: 'large', value: 'large' },
            { label: 'small', value: 'small' },
          ],
          value: 'default',
        },
        type: {
          type: 'select',
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
        icon: {
          type: 'icon-class',
          options: require('../../assets/icons.json'),
          value: '',
        },
      },
    },
    {
      name: '状态设置',
      config: {
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

        danger: {
          type: 'boolean',
          value: false,
        },
      },
    },
  ],
  component: {
    event: [{ label: 'click', value: 'click' }],
    methods: [
      { label: 'setLoading', value: 'setLoading' },
      { label: 'setNormal', value: 'setNormal' },
      { label: 'setDisabled', value: 'setDisabled' },
    ],
    data: [],
    params: [],
  },
};
export { BUTTON_CONFIG };
