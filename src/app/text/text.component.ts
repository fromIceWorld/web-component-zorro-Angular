import { Component, OnInit } from '@angular/core';
import { customWebComponent, transformValue } from 'src/common';
import { method } from 'src/decorators';
import { config } from 'src/decorators/config';
import { TEXT_CONFIG } from './text-config';
@config(TEXT_CONFIG)
@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css'],
})
export class TextComponent extends customWebComponent implements OnInit {
  static tagNamePrefix: string = 'my-text';
  value: string = '姓名';
  fontSize: string = '14px';
  color: string = 'black';
  isSHow: boolean = true;
  showChange() {
    this.isSHow = !this.isSHow;
    this.cd.detectChanges();
  }
  @method()
  show() {
    this.isSHow = true;
    this.cd.detectChanges();
  }
  check() {
    this.cd.detectChanges();
  }
  hide() {
    this.isSHow = false;
    this.cd.detectChanges();
  }
  // 导出渲染数据
  /**
   *
   * @param option 参数配置
   * @returns {
   *      html, js
   * }
   */
  static extends(option): { tagName: string; html: string; js: string } {
    // web component 的索引不能递增，因为索引重置后会重复，而且cache后apply会有冲突。
    const index = String(Math.random()).substring(2),
      tagName = `${TextComponent.tagNamePrefix}-${index}`;
    const { html, css, className } = option;
    let styleStr = '';
    for (let [key, value] of Object.entries(css)) {
      // @ts-ignore
      styleStr += `${key}:${value.value}${value.postfix || ''};`;
    }
    let config = {};
    Object.keys(html).map((key) => {
      config[key] = transformValue(html[key]);
    });
    return {
      tagName: `${tagName}`,
      html: `<${tagName} _data="_ngElementStrategy.componentRef.instance"
                         _methods="_ngElementStrategy.componentRef.instance" 
                        style="${styleStr}"></${tagName}>`,
      js: `class MyText${index} extends ${className}{
              constructor(){
                  super();
              }
              set text(value){
                this.value = value;
                this.check();
              }
          }
          MyText${index}.ɵcmp.factory = () => { return new MyText${index}()};
          (()=>{
            let customEl = createCustomElement(MyText${index}, {  injector: injector,});
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
  constructor() {
    super();
  }
  ngOnInit(): void {}
}
