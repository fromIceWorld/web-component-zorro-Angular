import { Component, OnInit } from '@angular/core';
import { createCustomElementHsh } from 'src/common/hash';
import { config } from 'src/decorators/config';
import { ROUTER_CONFIG } from './router-config';

@config(ROUTER_CONFIG)
@Component({
  selector: 'app-router',
  templateUrl: './router.component.html',
  styleUrls: ['./router.component.css'],
})
export class RouterComponent implements OnInit {
  static tagNamePrefix: string = 'my-router';
  url = 'https://www.bing.com/';
  target = '_seft';
  constructor() {}
  navigate(params = {}) {
    let urlWithParams = '';
    Object.keys(params).forEach((key, index) => {
      urlWithParams += `${index == 0 ? '?' : '&'}${key}=${encodeURI(
        params[key]
      )}`;
    });
    window.open(this.url + urlWithParams, this.target);
  }
  ngOnInit(): void {}
  static extends(option): { html: string; js: string } {
    // web component 的索引不能递增，因为索引重置后会重复，而且cache后apply会有冲突。
    const index = String(Math.random()).substring(2),
      tagName = `${RouterComponent.tagNamePrefix}-${index}`;
    const { html, className } = option;
    const { url, target } = html[0].config;
    return {
      html: `<${tagName}></${tagName}>`,
      js: `class MyRouter${index} extends ${className}{
               constructor(){
                   super();
                   this.url = '${url.value}';
                   this.target = '${target.value}';
               }
           }
           MyRouter${index}.ɵcmp = {
            ...MyRouter${index}.ɵcmp,
            factory:() => { return new MyRouter${index}()},
           };
           (()=>{
              let angularClass = ${createCustomElementHsh}(MyRouter${index}, {  injector: injector,});
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
                get url(){
                  return this.instance.url
                }
                set url(value){
                 this.instance.url = value
                }
                navigate(params){
                  this.instance.navigate(params);
                }
              }  
              customElements.get('${tagName}') || customElements.define('${tagName}',customClass);
          })();
           `,
    };
  }
}
