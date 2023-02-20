function method() {
  return function (target, name) {
    console.log('11', name, target, target['config'], arguments);
    if (!target['config']) {
      target['config'] = [];
    }
    console.log('11', name, target['config']);
    target['config'].push(name);
    return target;
  };
}

export { method };
