# web component 工厂;

依赖库：['@Angular10', '@ng-zorro-antd']

## 问题

### 依赖注入失效

```typescript
@Inject(HttpClient) http
@Inject(ChangeDetectorRef) cd

子组件 extends 源组件时 传入参数，打乱依赖注入。

`解决`
使用AppComponent包裹一层，所有的自定义组件在AppComponent中暴露出来。
所有的依赖在AppComponent中注入[injector],暴露到沙箱中，在extends时super中传入。
特殊依赖：ChangeDetectorRef  需要特殊寻找后覆盖原cd。
```

### 手动更新

```typescript
手动更新时需要触发两次
```

### 更新问题

```typescript
引入zone后可以包含组件基础的更新功能，但是在外部直接修改组件内的值时，无法更新。
`解决`
引入ChangeDetectorRef,手动更新
```

### proxy劫持

proxy劫持 angular运行环境, 会丢失函数的上下文【setTimeout】

```typescript
let obj = Object.create(null);
let proxyObj = new Proxy(obj,{
    
})
`解决`： 配置Symbol.unscopables[get中] + 劫持setTimeout，setInterval，addEventListener，removeEventListener
```

### zone.js

```typescript
ng-zorro，去除zone之后，部分组件无法手动触发更新。
```

### Symbol

#### Symbol.unscopables

```typescript
指用于指定对象值，其对象自身和继承的从关联对象的 with 环境绑定中排除的属性名称。
在使用with时会判定 属性的unscopables性，如果为true，with中的属性就不会在obj中取值👇

var obj = {
  foo: 1,
  bar: 2,
};

obj[Symbol.unscopables] = {
  foo: false,
  bar: true,
};

with (obj) {
  console.log(foo); // 1
  console.log(bar); // ReferenceError: bar is not defined
}
```