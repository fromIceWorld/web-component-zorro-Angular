import { Component, OnInit } from '@angular/core';
import { customWebComponent, transformValue } from 'src/common';
import { config } from 'src/decorators/config';
import { ICON_CONFIG } from './icon-config';

@config(ICON_CONFIG)
@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css'],
})
export class IconComponent extends customWebComponent implements OnInit {
  static tagNamePrefix: string = 'my-icon';
  fontSize = '32px';
  color = 'black';
  icon = '#icon-tubiao';
  constructor() {
    super();
  }
  ngOnInit(): void {
    this.applyData();
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
      tagName = `${IconComponent.tagNamePrefix}-${index}`;
    const { html, css, className } = option;
    let config = {};
    Object.keys(html).map((key) => {
      config[key] = transformValue(html[key]);
    });
    return {
      tagName: `${tagName}`,
      html: `<${tagName} _data="_ngElementStrategy.componentRef.instance" 
                        _methods="_ngElementStrategy.componentRef.instance"></${tagName}>`,
      js: `class MyIcon${index} extends ${className}{
             constructor(){
                 super();
             }
         }
         MyIcon${index}.ɵcmp.factory = () => { return new MyIcon${index}()};
         (()=>{
            let customEl = createCustomElement(MyIcon${index}, {  injector: injector,});
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
}
