import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { transformValue } from 'src/common';
import { config } from 'src/decorators/config';
import { API_CONFIG } from './api-config';
@config(API_CONFIG)
@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css'],
})
export class RequestComponent {
  static tagNamePrefix: string = 'my-api';
  @Output() loading = new EventEmitter();
  @Output() error = new EventEmitter();
  @Output() success200 = new EventEmitter();
  @Output() success500 = new EventEmitter();
  api = '/suger/records';
  method = 'get';
  data;
  list;
  message;
  total = 0;
  constructor(private http: HttpClient) {}
  request() {
    //  获取接口上附加的 params
    let params = {}, //@ts-ignore
      paramsSource = this.request.params || [];
    paramsSource.forEach((item) => {
      const [ins, keys] = item;
      keys.forEach((key) => {
        if (ins[key] instanceof Error) {
        }
        Object.assign(params, ins[key]);
      });
    });
    console.log(paramsSource, params);
    this.loading.emit();
    this.http
      .get(this.api, {
        params,
      })
      .subscribe(
        (res: any) => {
          const { code, data, message } = res;
          const { list, total } = data;
          this.data = data;
          this.list = list;
          this.total = total;
          this.message = message;
          if (code === 200) {
            this.success200.emit();
          } else if (code === 500) {
            this.success500.emit();
          }
        },
        (err) => {
          this.message = err;
          this.error.emit();
        }
      );
  }
  static extends(option): { html: string; js: string } {
    // web component 的索引不能递增，因为索引重置后会重复，而且cache后apply会有冲突。
    const index = String(Math.random()).substring(2),
      tagName = `${RequestComponent.tagNamePrefix}-${index}`;
    const { html: config, css, className } = option;
    const init = Object.keys(config)
      .map((key) => {
        return `this.${key} = ${transformValue(config[key])}`;
      })
      .join('\n');
    return {
      html: `<${tagName} _data="_ngElementStrategy.componentRef.instance" _methods="_ngElementStrategy.componentRef.instance"></${tagName}>`,
      js: `class MyAPI${index} extends ${className}{
               constructor(){
                   super();
                   ${init}
               }
           }
           MyAPI${index}.ɵcmp.factory = () => { return new MyAPI${index}()};
           customElements.define('${tagName}',createCustomElement(MyAPI${index}, {  injector: injector,}));
           `,
    };
  }
}
