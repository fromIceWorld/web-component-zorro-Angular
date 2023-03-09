function method() {
  return function (target, name) {
    if (!target['config']) {
      target['config'] = [];
      window['config'] = [];
    }
    target['config'].push(name);
    return target;
  };
}

export { method };
