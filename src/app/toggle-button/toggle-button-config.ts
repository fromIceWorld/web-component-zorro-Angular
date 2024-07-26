declare var require: any;
const TOGGLE_BUTTON_CONFIG = {
  className: 'ToggleButtonComponent', // 暴露出的组件class名称【组件可以注册到window上，并把配置同时暴露】
  html: [
    {
      name: '基础',
      config: {
        type: {
          type: 'select',
          options: [
            {
              label: '文字',
              value: 'text-button',
            },
            {
              label: '卡片',
              value: 'card-button',
            },
            {
              label: '按钮',
              value: 'btn-button',
            },
          ],
          value: 'text-button',
        },
        list: {
          type: 'json',
          value:
            '[{"lable":"活动保障任务轮播","value":"active","checked":true},{"lable":"视频保障任务轮播","value":"vedio","checked":false}]',
        },
      },
    },
  ],
  component: {
    input: [],
    event: [{ label: 'change', value: 'change' }],
    methods: [],
    data: ['list'],
  },
};
export { TOGGLE_BUTTON_CONFIG };
