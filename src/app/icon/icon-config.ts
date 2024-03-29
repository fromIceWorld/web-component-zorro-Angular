const ICON_CONFIG = {
  className: 'IconComponent',
  html: [
    {
      name: '图标设置',
      config: {
        fontSize: {
          type: 'string',
          value: '32px',
        },
        iconUrl: {
          type: 'iconLink',
          value: '//at.alicdn.com/t/c/font_4017486_q0zvblu8kt.js',
        },
        icon: {
          type: 'icon',
          options: [
            '#icon-sousuotianchong',
            '#icon-IP',
            '#icon-xiangqing',
            '#icon-lingdang',
            '#icon-tubiao',
          ],
          value: '#icon-tubiao',
        },
      },
    },
  ],
  component: {
    event: [],
    methods: [],
    data: [],
    params: [],
  },
};
export { ICON_CONFIG };
