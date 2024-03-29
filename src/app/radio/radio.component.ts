import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { createCustomElementHsh } from 'src/common/hash';
import { config } from 'src/decorators/config';

import { RADIO_CONFIG } from './radio-config';
@config(RADIO_CONFIG)
@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.css'],
})
export class RadioComponent {
  static tagNamePrefix: string = 'my-radio';
  @Output('change') change = new EventEmitter();
  control = '男';
  options = [
    {
      label: '男',
      value: '男',
      disabled: false,
    },
    {
      label: '女',
      value: '女',
      disabled: false,
    },
  ];
  constructor(private cd: ChangeDetectorRef) {}
  changeEvent() {
    this.change.emit();
  }
  static extends(option) {
    const { html, css, className } = option;
    // web component 的索引不能递增，因为索引重置后会重复，而且cache后apply会有冲突。
    const index = String(Math.random()).substring(2),
      tagName = `${RadioComponent.tagNamePrefix}-${index}`;
    const { options, formcontrol } = html[0].config;
    let items = options.options.map((item) => {
      let { label, value } = item;
      return {
        label: label,
        value: value || label,
        checked: (value || label) === options.value,
      };
    });
    return {
      html: `<${tagName} _data="_ngElementStrategy.componentRef.instance" _methods="_ngElementStrategy.componentRef.instance"></${tagName}>`,
      js: `class MyRadio${index} extends ${className}{
            constructor(){
                super();
                this.options = ${JSON.stringify(items)};
                this.control = '${options.value}';
            }
        }
        MyRadio${index}.ɵcmp = {
          ...MyRadio${index}.ɵcmp,
          factory:() => { return new MyRadio${index}()},
        };
        (()=>{
          let angularClass = ${createCustomElementHsh}(MyRadio${index}, {  injector: injector,});
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
            get value() {
              return {${formcontrol.value}:this.instance.control};
            }
            set value(target) {
              this.instance.control = target;
              this.check();
            }
          }  
          customElements.get('${tagName}') || customElements.define('${tagName}',customClass);
      })();
        `,
    };
  }
}
