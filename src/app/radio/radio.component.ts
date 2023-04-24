import { Component, OnInit } from '@angular/core';
import { config } from 'src/decorators/config';

import { RADIO_CONFIG } from './radio-config';
@config(RADIO_CONFIG)
@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.css'],
})
export class RadioComponent implements OnInit {
  static tagNamePrefix: string = 'my-radio';
  control = '';
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
  // form 子组件 校验
  isValid() {
    return true;
  }
  static extends(option) {
    const { html, css, className } = option;
    // web component 的索引不能递增，因为索引重置后会重复，而且cache后apply会有冲突。
    const index = String(Math.random()).substring(2),
      tagName = `${RadioComponent.tagNamePrefix}-${index}`;
    const { options, formcontrol } = html;
    let items = options.options.map((item) => {
      let [label, value] = item.split(':');
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
            get value() {
              return {${formcontrol.value}:this.control};
            }
            set value(target) {
              this.control = target;
            }
        }
        MyRadio${index}.ɵcmp.factory = () => { return new MyRadio${index}()};
        customElements.define('${tagName}',createCustomElement(MyRadio${index}, {  injector: injector}));
        `,
    };
  }

  ngOnInit(): void {}
}
