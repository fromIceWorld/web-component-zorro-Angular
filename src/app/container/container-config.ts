const CONTAINER_CONFIG = {
  className: 'ContainerComponent',
  html: {},
  css: {
    style: {
      display: 'flex',
    },
    border: {
      type: 'boolean',
      value: false,
    },
    'border-width': {
      type: 'number',
      value: 1,
      postfix: 'px',
    },
    'border-style': {
      type: 'array',
      options: [
        { label: 'none', value: 'none' },
        { label: 'solid', value: 'solid' },
        // { label: 'dotted', value: 'dotted' },
        { label: 'dashed', value: 'dashed' },
        // { label: 'double', value: 'double' },
        // { label: 'groove', value: 'groove' },
      ],
      value: 'solid',
    },
    'border-color': {
      type: 'string',
      value: '#b1a7a7d9',
    },
    'padding-top': {
      type: 'number',
      value: 10,
      postfix: 'px',
    },
    'padding-right': {
      type: 'number',
      value: 10,
      postfix: 'px',
    },
    'padding-bottom': {
      type: 'number',
      value: 10,
      postfix: 'px',
    },
    'padding-left': {
      type: 'number',
      value: 10,
      postfix: 'px',
    },
  },
};
export { CONTAINER_CONFIG };
