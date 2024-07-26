const COUNTRY_CONFIG = {
  className: 'CountryComponent',
  html: [
    {
      name: '组件配置',
      config: {
        src: {
          type: 'string',
          value:
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAMCAMAAABcOc2zAAAAt1BMVEW9FyDLJjHKKjCwDxa/FR27GR+6HiS7FR67GR+uDRSwDhTBJCqvDhOxFRqrDRKtDhPIIi3KJTDLJzHtGSHrFR3uGiPuHCXsFx/sGCDvHSfpExrvISvwJC7vHyixDhXAExrwKDDYEhnGHyjIExu5EhnwIyvGGiPXICrxOS3qKDPyUh/LGiLSFx/CFyCrCxH0bx/JJC7xYSf80grfExriExnhEhjwMynKDhT2hh3pSy/fLDfNKTXLJzOYq9JTAAAAE3RSTlNxk8+5yz46IEyT1THhMcjgueHgRqUxcQAAAJFJREFUCNclzNEOwiAMheFDKTCNCToTX8b3fxcvjBpdYI5CHfPyy39a6xudhiV+MQRiamyuqi8McwO4wJkPm2TiLceUQFIVkaaMLBISdTcLBh7AYdpycwp+N9E9PVd214UhShOk02pdX0P/a6zzCg/mIrKxZw9Q6HZb7j4yzln6ZcNozP2SDYsj+DLvlkBWS/0B7KFVHvCyRgEAAAAASUVORK5CYII=',
        },
        value: {
          type: 'string',
          value: '中国',
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
        direction: {
          type: 'select',
          options: [
            { label: 'ltr', value: 'ltr' },
            { label: 'rtl', value: 'rtl' },
          ],
          value: 'ltr',
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
    input: ['src', 'color', 'value'],
    event: [],
    methods: [],
    data: ['text'],
  },
};
export { COUNTRY_CONFIG };
