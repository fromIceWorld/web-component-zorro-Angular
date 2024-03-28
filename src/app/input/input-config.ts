const INPUT_CONFIG = {
  className: 'InputComponent',
  html: [
    {
      name: '基础配置',
      config: {
        placeholder: {
          type: 'string',
          value: '请输入姓名',
        },
        value: {
          type: 'string',
          value: '',
        },
      },
    },
    {
      name: '逻辑配置',
      config: {
        formcontrol: {
          type: 'string',
          value: 'name',
        },
        updateOn: {
          type: 'select',
          options: [
            { label: '不检查', value: '' },
            { label: 'change', value: 'change' },
            { label: 'blur', value: 'circle' },
            { label: 'submit', value: 'round' },
          ],
          value: '',
        },
        regexp: {
          type: 'string',
          value: '/^[1-9]{1,10}$/',
        },
      },
    },
  ],
  component: {
    event: [
      { label: 'validateTrue', value: 'validateTrue' },
      { label: 'validateFalse', value: 'validateFalse' },
      { label: 'change', value: 'change' },
      { label: 'clear', value: 'clear' },
      { label: 'focus', value: 'focus' },
      { label: 'blur', value: 'blur' },
    ],
    methods: [
      { label: 'validate', value: 'validate' },
      { label: 'clearInput', value: 'clearInput' },
    ],
    data: ['value'],
  },
};
export { INPUT_CONFIG };
