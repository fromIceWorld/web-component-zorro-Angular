const TABLE_CONFIG = {
  className: 'TableComponent',
  html: [
    {
      name: '组件配置',
      config: {
        // bordered: {
        //   type: 'boolean',
        //   value: false,
        // },
        // loading: {
        //   type: 'boolean',
        //   value: false,
        // },
        // pagination: {
        //   type: 'boolean',
        //   value: false,
        // },
        // sizeChanger: {
        //   type: 'boolean',
        //   value: false,
        // },
        title: {
          type: 'boolean',
          value: false,
        },
        titleValue: {
          type: 'string',
          value: 'Here is Title',
        },
        header: {
          type: 'boolean',
          value: true,
        },
        footer: {
          type: 'boolean',
          value: false,
        },
        footerValue: {
          type: 'string',
          value: 'Here is Footer',
        },
        expandable: {
          type: 'boolean',
          value: false,
        },
        checkbox: {
          type: 'boolean',
          value: false,
        },
        // fixHeader: {
        //   type: 'boolean',
        //   value: false,
        // },
        // noResult: {
        //   type: 'boolean',
        //   value: false,
        // },
        ellipsis: {
          type: 'boolean',
          value: false,
        },
        // simple: {
        //   type: 'boolean',
        //   value: false,
        // },
        size: {
          type: 'select',
          options: [
            { value: 'middle', label: 'Middle' },
            { value: 'small', label: 'Small' },
          ],
          value: 'middle',
        },
        // tableScroll: {
        //   type: 'select',
        //   options: [
        //     { value: 'unset', label: 'Unset' },
        //     { value: 'scroll', label: 'Scroll' },
        //     { value: 'fixed', label: 'Fixed' },
        //   ],
        //   value: 'unset',
        // },
        // tableLayout: {
        //   type: 'select',
        //   options: [
        //     { value: 'auto', label: 'Auto' },
        //     { value: 'fixed', label: 'Fixed' },
        //   ],
        //   value: 'auto',
        // },
        // position: {
        //   type: 'select',
        //   options: [
        //     { value: 'top', label: 'Top' },
        //     { value: 'bottom', label: 'Bottom' },
        //     { value: 'both', label: 'Both' },
        //   ],
        //   value: 'top',
        // },
        headers: {
          type: 'headers',
          value: [
            { label: '名称', key: 'name', width: '100' },
            { label: '年龄', key: 'age', width: '100' },
            { label: '地址', key: 'address', width: 'auto' },
          ],
        },
        row: {
          type: 'number',
          value: 10,
        },
        listOfData: {
          type: 'json',
          value:
            '[{"name":"ts","age":13,"address":"海淀区","id":1,"description":"展开后的详情"}]',
        },
        ['viewBtn']: {
          type: 'boolean',
          value: false,
        },
        ['editBtn']: {
          type: 'boolean',
          value: false,
        },
        ['deleteBtn']: {
          type: 'boolean',
          value: false,
        },
      },
    },
  ],
  component: {
    event: [],
    methods: [],
    data: ['list', 'row', 'id', 'selected'],
  },
};
export { TABLE_CONFIG };
