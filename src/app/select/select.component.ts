import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { customWebComponent } from 'src/common';
import { config } from 'src/decorators/config';
import { SELECT_CONFIG } from './select-config';

@config(SELECT_CONFIG)
@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
})
export class SelectComponent extends customWebComponent implements OnInit {
  static tagNamePrefix: string = 'my-select';
  static copyHttp;
  method = 'get';
  api =
    'https://www.fastmock.site/mock/14c2723aefa052a75b2a6feeed0cf387/suger/list';
  options: any[] = [];
  selected = null;
  isLoading = false;
  placeholder = '请选择';
  constructor(private http: HttpClient) {
    super();
    //@ts-ignore
    SelectComponent.copyHttp = http;
  }
  /* eslint-disable @typescript-eslint/no-explicit-any */
  getRandomNameList = this.http.get(`${this.api}`);
  loadMore(): void {
    // 无api时，options就是枚举类，有api时就是懒加载。
    if (!this.api) {
      return;
    }
    this.isLoading = true;
    this.getRandomNameList.subscribe((e: any) => {
      this.isLoading = false;
      this.options = [...this.options, ...e.data.list];
    });
  }
  static extends(option) {
    const { html, css, className } = option;
    // web component 的索引不能递增，因为索引重置后会重复，而且cache后apply会有冲突。
    const index = String(Math.random()).substring(2),
      tagName = `${SelectComponent.tagNamePrefix}-${index}`;
    const { placeholder, options, formcontrol, api } = html;
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
      js: `class MySelect${index} extends ${className}{
            constructor(){
                super(SelectComponent.copyHttp);
                this.options = ${JSON.stringify(items)};
                this.selected = '${options.value}';
                this.api = '${api.value}';
                this.placeholder = '${placeholder.value}';
                console.log(this.http);
                this.loadMore();
            }
            get value() {
              return {${formcontrol.value}:this.selected};
            }
            set value(target) {
              this.selected = target;
            }
        }
        MySelect${index}.ɵcmp.factory = () => { return new MySelect${index}()};
        (()=>{
          let customEl = createCustomElement(MySelect${index}, {  injector: injector,});
          // 添加用户自定义数据
          Object.defineProperty(customEl.prototype,'option',{
            get(){
              return ${JSON.stringify(config)}
            },
            configurable: false,
            enumerable: false
          })
          customElements.define('${tagName}',customEl);
       })();
        `,
    };
  }

  ngOnInit(): void {
    this.applyData();
  }
}
