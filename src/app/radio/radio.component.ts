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
  static index = 0;
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
    const index = RadioComponent.index++,
      tagName = `${RadioComponent.tagNamePrefix}-${index}`;
    const { options, formcontrol } = html;
    let items = options.options.map((item) => {
      return {
        label: item,
        value: item,
        checked: item === options.value,
      };
    });
    return {
      html: `<${tagName} pre="_ngElementStrategy.componentRef.instance" ></${tagName}>`,
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
