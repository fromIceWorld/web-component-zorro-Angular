import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
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
  @Output() validateFalse = new EventEmitter();
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
    this.xmlHttp(params);
  }
  validatorAndRequest() {
    //  获取接口上附加的 params, 及校验结果;
    let params = {},
      invalid = true, //@ts-ignore
      paramsSource = this.validatorAndRequest.params || [];
    paramsSource.forEach((item) => {
      const [ins, keys] = item;
      keys.forEach((key) => {
        let p = ins[key];
        // 如果_valid 存在，而且是false，证明有参数未通过校验
        invalid = p['_valid'] === false;
        delete p['_valid'];
        Object.assign(params, p);
      });
    });
    if (invalid) {
      this.validateFalse.emit();
      return;
    }
    this.xmlHttp(params);
  }
  xmlHttp(params) {
    this.loading.emit();
    this.http
      .get(this.api, {
        params,
      })
      .subscribe(
        (res: any) => {
          const { code, data, message } = res;
          this.message = message;
          // api返回值是动态可配置的，以各种情况下的组件返回值。
          Object.keys(data || {}).forEach((key) => {
            this[key] = data[key];
          });
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
    const { html, className } = option;
    const { method, api } = html[0].config;
    return {
      html: `<${tagName} _data="_ngElementStrategy.componentRef.instance" _methods="_ngElementStrategy.componentRef.instance"></${tagName}>`,
      js: `class MyAPI${index} extends ${className}{
               constructor(){
                   super(injector.get('http'));
                   this.method = '${method.value}';
                   this.api = '${api.value}';
               }
           }
           MyAPI${index}.ɵcmp.factory = () => { return new MyAPI${index}()};
           (()=>{
              let customEl = createCustomElement(MyAPI${index}, {  injector: injector,});
              customElements.get('${tagName}') || customElements.define('${tagName}',customEl);
          })();
           `,
    };
  }
}
