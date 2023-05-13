const TABLE_CONFIG = {
  className: 'TableComponent',
  tag: '',
  html: {
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
      type: 'array',
      options: [
        { value: 'middle', label: 'Middle' },
        { value: 'small', label: 'Small' },
      ],
      value: 'middle',
    },
    // tableScroll: {
    //   type: 'array',
    //   options: [
    //     { value: 'unset', label: 'Unset' },
    //     { value: 'scroll', label: 'Scroll' },
    //     { value: 'fixed', label: 'Fixed' },
    //   ],
    //   value: 'unset',
    // },
    // tableLayout: {
    //   type: 'array',
    //   options: [
    //     { value: 'auto', label: 'Auto' },
    //     { value: 'fixed', label: 'Fixed' },
    //   ],
    //   value: 'auto',
    // },
    // position: {
    //   type: 'array',
    //   options: [
    //     { value: 'top', label: 'Top' },
    //     { value: 'bottom', label: 'Bottom' },
    //     { value: 'both', label: 'Both' },
    //   ],
    //   value: 'top',
    // },
    headers: {
      type: 'headers',
      options: [
        { label: '名称', key: 'name', width: '100' },
        { label: '年龄', key: 'age', width: '100' },
        { label: '地址', key: 'address', width: 'auto' },
      ],
      value: 'Name',
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
  css: {
    classes: '',
    style: {},
  },
  component: {
    event: [
      { label: 'view', value: 'view' },
      { label: 'edit', value: 'edit' },
      { label: 'delete', value: 'delete' },
    ],
    methods: [{ label: 'setLoading', value: 'setLoading' }],
    data: ['list', 'item', 'id', 'selected'],
    params: ['selected'],
  },
};
export { TABLE_CONFIG };
