import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  static index = 0;
  static tagNamePrefix: string = 'my-input';
  value: string = '';
  regexp: string = '';
  updateOn: string = 'change'; // 默认 【change】 时校验
  placeholder: string = '请输入姓名';
  constructor() {}
  static extends(option) {
    const { html, css, className } = option;
    const index = InputComponent.index++,
      tagName = `${InputComponent.tagNamePrefix}-${index}`;
    const { placeholder, formcontrol, value, updateOn, regexp } = html;
    let config = {
      html: `<${tagName}
                    type="text"
                    placeholder="${placeholder.value}"
                    formcontrol="${formcontrol.value}"
               />`,
      js: `class MyInput${index} extends ${className}{
            constructor(){
                super();
                this.value = '${value.value}';
                this.regexp = '${regexp.value}';
                this.updateOn = '${updateOn.value}';
            }
        };
        MyInput${index}.ɵcmp.factory = () => { return new MyInput${index}()};
        customElements.define('${tagName}',createCustomElement(MyInput${index}, {  injector: injector,}));
        `,
    };
    return config;
  }
  ngOnInit(): void {}
}
