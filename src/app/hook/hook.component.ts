import { Component, EventEmitter, Output } from '@angular/core';
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
  @Output() connectedCallback = new EventEmitter();
  delay = 0;
  count = 1;
  interval = 10000;
  constructor() {}
  runAndEmit() {
    let initInterval = this.interval;
    this.interval = 0;
    let time = setInterval(() => {
      this.count--;
      if (this.count <= 0) {
        clearInterval(time);
      }
    }, this.interval);
    this.interval = initInterval;
  }
  static extends(option): { html: string; js: string } {
    // web component 的索引不能递增，因为索引重置后会重复，而且cache后apply会有冲突。
    const index = String(Math.random()).substring(2),
      tagName = `${HookComponent.tagNamePrefix}-${index}`;
    const { html: config, className } = option;
    const { delay, count, interval } = config[0].config;
    return {
      html: `<${tagName} _data="_ngElementStrategy.componentRef.instance" _methods="_ngElementStrategy.componentRef.instance"></${tagName}>`,
      js: `class MyHook${index} extends ${className}{
               constructor(){
                   super();
                   this.delay = '${delay.value}';
                   this.count = '${count.value}';
                   this.interval = '${interval.value}';
                   if (this.delay) {
                      setTimeout(() => {
                        this.count--;
                        this.connectedCallback.emit();
                        this.runAndEmit();
                      }, this.delay);
                    } else {
                      this.runAndEmit();
                    }
               }
               connectedCallback(){
                this.connectedCallback.emit();
               }
           }
           MyHook${index}.ɵcmp.factory = () => { return new MyHook${index}()};
           customElements.get('${tagName}') || customElements.define('${tagName}',createCustomElement(MyHook${index}, {  injector: injector,}));
           `,
    };
  }
}
