import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { createCustomElementHsh } from 'src/common/hash';
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
  respond;
  message;
  total = 0;
  constructor(private http: HttpClient) {}
  request(params = {}) {
    //  获取接口上附加的 params
    this.xmlHttp(params);
  }
  xmlHttp(params) {
    this.loading.emit();
    this[this.method + 'Http'](params).subscribe(
      (res: any) => {
        const { code, data, message } = res;
        this.message = message;
        // 因为返回值太复杂，api直接存储返回值。
        this.respond = data;
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
  postHttp(params) {
    return this.http.post(
      this.api,
      {
        ...params,
      },
      {
        params,
      }
    );
  }
  getHttp(params) {
    return this.http.get(this.api, {
      params,
    });
  }
  putHttp(params) {
    return this.http.put(
      this.api,
      {
        ...params,
      },
      {
        params,
      }
    );
  }
  deleteHttp(params) {
    return this.http.delete(this.api, {
      params,
    });
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
           MyAPI${index}.ɵcmp = {
            ...MyAPI${index}.ɵcmp,
            factory:() => { return new MyAPI${index}()},
           };
           (()=>{
              let angularClass = ${createCustomElementHsh}(MyAPI${index}, {  injector: injector,});
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
                get respond(){
                  return this._ngElementStrategy.componentRef.instance.respond
                }
                get api(){
                  return this.instance.api
                }
                set api(value){
                 this.instance.api = value
                }
                get method(){
                  return this.instance.method
                }
                set method(value){
                 this.instance.method = value
                }
                request(params){
                  this.instance.request(params);
                }
              }  
              customElements.get('${tagName}') || customElements.define('${tagName}',customClass);
          })();
           `,
    };
  }
}
