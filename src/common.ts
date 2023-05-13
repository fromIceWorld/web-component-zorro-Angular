function transformValue(obj) {
  const { type, options, value } = obj;
  if (type === 'string' || type === 'array' || type === 'icon') {
    return `'${value}'`;
  } else if (type === 'boolean' || type === 'number') {
    return `${value}`;
  } else if (type === 'list') {
    let arr = options.map((key) => {
      return {
        label: key,
        key,
      };
    });
    return JSON.stringify(arr);
  } else if (type == 'json') {
    return value;
  } else if (type == 'headers') {
    return JSON.stringify(options);
  }
}
export { transformValue };
