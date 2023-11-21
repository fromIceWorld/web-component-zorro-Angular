const RADIO_CONFIG = {
  className: 'RadioComponent',
  html: [
    {
      name: '数据配置',
      config: {
        formcontrol: {
          type: 'string',
          value: 'sex',
        },
        options: {
          type: 'tags',
          options: [
            { label: '男', value: '男' },
            { label: '女', value: '女' },
          ],
          value: '男',
        },
      },
    },
  ],
  component: {
    event: [{ label: 'change', value: 'change' }],
    methods: [],
    data: ['value'],
    params: [{ label: 'value', value: 'value' }],
  },
};
export { RADIO_CONFIG };
