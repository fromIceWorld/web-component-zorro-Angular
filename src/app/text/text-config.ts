const TEXT_CONFIG = {
  className: 'TextComponent',
  html: [
    {
      name: '组件配置',
      config: {
        value: {
          type: 'string',
          value: '姓名',
        },
        fontSize: {
          type: 'string',
          value: '14',
          postfix: 'px',
        },
        fontWeight: {
          type: 'number',
          value: 400,
        },
        color: {
          type: 'color',
          value: 'black',
        },
        left: {
          type: 'number',
          value: 0,
          postfix: 'px',
        },
        top: {
          type: 'number',
          value: 0,
          postfix: 'px',
        },
        right: {
          type: 'number',
          value: 0,
          postfix: 'px',
        },
        bottom: {
          type: 'number',
          value: 0,
          postfix: 'px',
        },
        fontFamily: {
          type: 'font-family',
          options: [
            { label: '无', value: '' },
            { label: 'HanYiLingXinTiJian-1', value: 'HanYiLingXinTiJian-1' },
            {
              label: 'REEJI-HonghuangLiGB-Medium-2',
              value: 'REEJI-HonghuangLiGB-Medium-2',
            },
            {
              label: 'DS-DIGI-1',
              value: 'DS-DIGI-1',
            },
            {
              label: 'DS-DIGIB-2',
              value: 'DS-DIGIB-2',
            },
            {
              label: 'DS-DIGII-3',
              value: 'DS-DIGII-3',
            },
            {
              label: 'DS-DIGIT-4',
              value: 'DS-DIGIT-4',
            },
          ],
          value: '',
        },
      },
    },
  ],
  component: {
    event: [],
    methods: [
      { label: 'showChange', value: 'showChange' },
      { label: 'show', value: 'show' },
      { label: 'hide', value: 'hide' },
    ],
    data: ['text'],
    params: [],
  },
};
export { TEXT_CONFIG };
