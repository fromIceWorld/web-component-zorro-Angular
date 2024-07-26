const TEXT_CONFIG = {
  className: 'DoubleTextComponent',
  html: [
    {
      name: 'left',
      config: {
        value: {
          type: 'string',
          value: '14.32万',
        },
        fontSize: {
          type: 'string',
          value: '18',
          postfix: 'px',
        },
        fontWeight: {
          type: 'number',
          value: 400,
        },
        color: {
          type: 'color',
          value: '#d0f9ff',
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
          value: 'REEJI-HonghuangLiGB-Medium-2',
        },
      },
    },
    {
      name: '分隔符',
      config: {
        splitter: {
          type: 'string',
          value: '',
        },
      },
    },
    {
      name: 'right',
      config: {
        value2: {
          type: 'string',
          value: '个',
        },
        fontSize2: {
          type: 'string',
          value: '12',
          postfix: 'px',
        },
        fontWeight2: {
          type: 'number',
          value: 400,
        },
        color2: {
          type: 'color',
          value: 'black',
        },
        left2: {
          type: 'number',
          value: 0,
          postfix: 'px',
        },
        top2: {
          type: 'number',
          value: 0,
          postfix: 'px',
        },
        right2: {
          type: 'number',
          value: 0,
          postfix: 'px',
        },
        bottom2: {
          type: 'number',
          value: 0,
          postfix: 'px',
        },
        fontFamily2: {
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
          value2: 'REEJI-HonghuangLiGB-Medium-2',
        },
      },
    },
  ],
  component: {
    input: [],
    event: [],
    methods: [],
    data: ['text', 'suffix'],
  },
};
export { TEXT_CONFIG };
