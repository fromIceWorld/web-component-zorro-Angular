// angular 的数据转换与react/vue不同，angular是直接将数据赋值到prototype，react/vue是作为字符串插入
function transformValue(obj) {
  const { type, options, value, postfix } = obj;
  if (['string', 'array', 'icon', 'color'].includes(type)) {
    return `${value}${postfix || ''}`;
  } else if (type === 'boolean' || type === 'number') {
    return value;
  } else if (type === 'list') {
    let arr = options.map((key) => {
      return {
        label: key,
        key,
      };
    });
    return arr;
  } else if (type == 'json') {
    return JSON.parse(value);
  } else if (type == 'headers') {
    return options;
  }
}
class customWebComponent {
  cd: any;
  applyData() {
    const root = this['__ngContext__'][20][0];
    const option = root.option;
    if (!root || !option) {
      return;
    }
    Object.keys(option).forEach((key) => {
      this[key] = option[key];
    });
    // 手动更新
    this.cd =
      this[
        '__ngContext__'
      ][13][0]._ngElementStrategy.componentRef.changeDetectorRef;
  }
}
export { customWebComponent, transformValue };
