const DISPLAY_TABLE_CONFIG = {
  className: 'DisplayTableComponent',
  tag: '',
  html: [
    {
      name: '组件配置',
      config: {
        headerPadding: {
          type: 'string',
          value: '3px 10px',
        },
        headerBackground: {
          type: 'string',
          value:
            'linear-gradient(rgba(47, 108, 211, 0.34), rgba(47, 108, 211, 0.34)), linear-gradient(#0d3469, #0d3469)',
        },
        itemPadding: {
          type: 'string',
          value: '3px 10px',
        },
        itemMargin: {
          type: 'string',
          value: '4px 0',
        },
        itemBackground: {
          type: 'string',
          value: '#00327080',
        },

        header: {
          type: 'boolean',
          value: true,
        },
        headers: {
          type: 'headers',
          value: [
            { label: '保障名称', key: 'name', width: 'auto' },
            { label: '保障开始时间', key: 'time', width: 'auto' },
            { label: '保障结束时间', key: 'end', width: 'auto' },
            { label: '保障单位数', key: 'count', width: 'auto' },
            { label: '攻击告警数', key: 'alarm', width: 'auto' },
            { label: '攻击成功数', key: 'attack', width: 'auto' },
          ],
        },
        row: {
          type: 'number',
          value: 10,
        },
        list: {
          type: 'json',
          value:
            '[{"name":"安全保障任务名称","time":"2024-01-01","end":"2024-01-01","count":230,"alarm":454,"attack":454,"id":1},{"name":"安全保障任务名称","time":"2024-01-01","end":"2024-01-01","count":230,"alarm":454,"attack":454,"id":2},{"name":"安全保障任务名称","time":"2024-01-01","end":"2024-01-01","count":230,"alarm":454,"attack":454,"id":3},{"name":"安全保障任务名称","time":"2024-01-01","end":"2024-01-01","count":230,"alarm":454,"attack":454,"id":4},{"name":"安全保障任务名称","time":"2024-01-01","end":"2024-01-01","count":230,"alarm":454,"attack":454,"id":4}]',
        },
        slots: {
          type: 'slots',
          note: '当前slots与headers一一对应',
          value: [[], [], []],
        },
      },
    },
  ],
  component: {
    event: [
      { label: 'view', value: 'view' },
      { label: 'edit', value: 'edit' },
      { label: 'delete', value: 'delete' },
    ],
    methods: [{ label: 'setLoading', value: 'setLoading' }],
    data: ['list', 'row', 'id', 'selected'],
  },
};
export { DISPLAY_TABLE_CONFIG };
