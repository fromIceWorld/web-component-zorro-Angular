const PAGINATION_CONFIG = {
  className: 'PaginationComponent', // 暴露出的组件class名称【组件可以注册到window上，并把配置同时暴露】
  html: [
    {
      name: '组件配置',
      config: {
        pageSize: {
          type: 'select',
          options: [
            { label: '10', value: '10' },
            { label: '20', value: '20' },
            { label: '30', value: '30' },
            { label: '40', value: '40' },
            { label: '50', value: '50' },
          ],
          value: '10',
        },
        nzShowSizeChanger: {
          type: 'boolean',
          value: true,
        },
        nzShowQuickJumper: {
          type: 'boolean',
          value: true,
        },
      },
    },
  ],
  component: {
    event: [{ label: 'change', value: 'change' }],
    methods: [],
    data: ['total', 'pageIndex', 'pageSize'],
    params: [],
  },
};
export { PAGINATION_CONFIG };
