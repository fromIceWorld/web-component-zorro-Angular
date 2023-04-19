const INPUT_CONFIG = {
  className: 'InputComponent',
  html: {
    placeholder: {
      type: 'string',
      value: '请输入姓名',
    },
    formcontrol: {
      type: 'string',
      value: 'name',
    },
    value: {
      type: 'string',
      value: '',
    },
    updateOn: {
      type: 'array',
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
  css: {
    classes: '',
    style: {},
  },
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
      { label: 'clear', value: 'clear' },
    ],
    data: ['value'],
    params: ['value'],
  },
};
export { INPUT_CONFIG };
