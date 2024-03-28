import { Component, EventEmitter, Output } from '@angular/core';
import { createCustomElementHsh } from 'src/common/hash';
import { config } from 'src/decorators/config';
import { HOOK_CONFIG } from './hook-config';

@config(HOOK_CONFIG)
@Component({
  selector: 'app-hook',
  templateUrl: './hook.component.html',
  styleUrls: ['./hook.component.css'],
})
export class HookComponent {
  static tagNamePrefix: string = 'my-hook';
  @Output() run = new EventEmitter();
  delay = 0;
  // count = 1;
  type = 'setTimeout';
  constructor() {}

  start() {
    let time = window[this.type](() => {
      // if (this.count <= 0) {
      //   clearInterval(time);
      //   return;
      // }
      // this.count--;
      this.run.emit();
    }, this.delay);
  }
  static extends(option): { html: string; js: string } {
    // web component 的索引不能递增，因为索引重置后会重复，而且cache后apply会有冲突。
    const index = String(Math.random()).substring(2),
      tagName = `${HookComponent.tagNamePrefix}-${index}`;
    const { html: config, className } = option;
    const { delay, type } = config[0].config;
    return {
      html: `<${tagName} _data="_ngElementStrategy.componentRef.instance" _methods="_ngElementStrategy.componentRef.instance"></${tagName}>`,
      js: `class MyHook${index} extends ${className}{
               constructor(){
                   super();
                   this.delay = '${delay.value}';
                   this.type = '${type.value}';
               }
              
           }
           MyHook${index}.ɵcmp = {
            ...MyHook${index}.ɵcmp,
            factory:() => { return new MyHook${index}()},
           };
           let angularClass = ${createCustomElementHsh}(MyHook${index}, {  injector: injector,})
           class customClass extends angularClass{
              constructor(){
                super();
              }
              check(){
                // extends的class 无法依赖注入cd,只能自己查找
                let cd = this._ngElementStrategy;
                cd.detectChanges();
              }
              get instance(){
                return this._ngElementStrategy.componentRef.instance
              }
              start(){
                this.instance.start();
               }
           }
           customElements.get('${tagName}') || customElements.define('${tagName}',customClass);
           `,
    };
  }
}
