import { Component, OnInit } from '@angular/core';
import { transformValue } from 'src/common';
import { config } from 'src/decorators/config';
import { ICON_CONFIG } from './icon-config';

@config(ICON_CONFIG)
@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css'],
})
export class IconComponent implements OnInit {
  static tagNamePrefix: string = 'my-icon';
  fontSize = '16px';
  color = 'black';
  icon = '#icon-tubiao';
  constructor() {}
  ngOnInit(): void {}
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
    const { html: config, css, className } = option;
    let init = Object.keys(config)
      .map((key) => {
        return `this['${key}'] = ${transformValue(config[key])}`;
      })
      .join('\n');
    return {
      tagName: `${tagName}`,
      html: `<${tagName} _data="_ngElementStrategy.componentRef.instance" 
                        _methods="_ngElementStrategy.componentRef.instance"></${tagName}>`,
      js: `class MyIcon${index} extends ${className}{
             constructor(){
                 super();
                 ${init}
             }
         }
         MyIcon${index}.ɵcmp.factory = () => { return new MyIcon${index}()};
         customElements.define('${tagName}',createCustomElement(MyIcon${index}, {  injector: injector}));
         `,
    };
  }
}
