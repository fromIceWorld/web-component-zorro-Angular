import { Component, OnInit } from '@angular/core';
import { customWebComponent, transformValue } from 'src/common';
import { config } from 'src/decorators/config';
import { IMAGE_CONFIG } from './image-config';

@config(IMAGE_CONFIG)
@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css'],
})
export class ImageComponent extends customWebComponent implements OnInit {
  static tagNamePrefix: string = 'my-image';
  width = 'auto';
  height = 'auto';
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
      tagName = `${ImageComponent.tagNamePrefix}-${index}`;
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
      js: `class MyImage${index} extends ${className}{
             constructor(){
                 super();
             }
         }
         MyImage${index}.ɵcmp.factory = () => { return new MyImage${index}()};
         (()=>{
          let customEl = createCustomElement(MyImage${index}, {  injector: injector,});
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

  ngOnInit(): void {
    this.applyData();
  }
  src = 'https://react.docschina.org/images/home/conf2021/cover.svg';
}
