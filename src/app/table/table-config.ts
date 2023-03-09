const TABLE_CONFIG = {
  className: 'TableComponent',
  tag: '',
  html: {
    bordered: {
      type: 'boolean',
      value: false,
    },
    loading: {
      type: 'boolean',
      value: false,
    },
    pagination: {
      type: 'boolean',
      value: false,
    },
    sizeChanger: {
      type: 'boolean',
      value: false,
    },
    title: {
      type: 'boolean',
      value: false,
    },
    header: {
      type: 'boolean',
      value: true,
    },
    footer: {
      type: 'boolean',
      value: false,
    },
    expandable: {
      type: 'boolean',
      value: false,
    },
    checkbox: {
      type: 'boolean',
      value: false,
    },
    fixHeader: {
      type: 'boolean',
      value: false,
    },
    noResult: {
      type: 'boolean',
      value: false,
    },
    ellipsis: {
      type: 'boolean',
      value: false,
    },
    simple: {
      type: 'boolean',
      value: false,
    },
    size: {
      type: 'array',
      options: [
        { value: 'default', label: 'Default' },
        { value: 'middle', label: 'Middle' },
        { value: 'small', label: 'Small' },
      ],
      value: 'default',
    },
    tableScroll: {
      type: 'array',
      options: [
        { value: 'unset', label: 'Unset' },
        { value: 'scroll', label: 'Scroll' },
        { value: 'fixed', label: 'Fixed' },
      ],
      value: 'unset',
    },
    tableLayout: {
      type: 'array',
      options: [
        { value: 'auto', label: 'Auto' },
        { value: 'fixed', label: 'Fixed' },
      ],
      value: 'auto',
    },
    position: {
      type: 'array',
      options: [
        { value: 'top', label: 'Top' },
        { value: 'bottom', label: 'Bottom' },
        { value: 'both', label: 'Both' },
      ],
      value: 'top',
    },
    headers: {
      type: 'list',
      options: ['Name:100', 'Age:100', 'Address:200'],
      width: [100, 100, 200],
      value: 'Name',
    },
    row: {
      type: 'number',
      value: 10,
    },
  },
  css: {
    classes: '',
    style: {},
  },
  component: {
    event: [],
    methods: [
      { label: 'setList', value: 'setList' },
      { label: 'setLoading', value: 'setLoading' },
    ],
    data: ['list'],
    params: [],
  },
};
export { TABLE_CONFIG };
