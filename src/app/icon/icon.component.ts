import { Component, OnInit } from '@angular/core';
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
  fontSize = '32px';
  color = 'black';
  iconUrl = '//at.alicdn.com/t/c/font_4017486_q0zvblu8kt.js';
  icon = 'icon-tubiao';
  constructor() {}
  ngOnInit(): void {
    this.fetchIcon();
  }
  fetchIcon() {
    fetch(this.iconUrl, {
      cache: 'force-cache',
    }).then((res) => {
      let newStyle = document.createElement('style');
      res.text().then((str) => {
        newStyle.innerHTML = str;
        document.head.appendChild(newStyle);
      });
    });
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
    const { html, className } = option;
    const { fontSize, iconUrl, icon } = html[0].config;
    return {
      tagName: `${tagName}`,
      html: `<${tagName} _data="_ngElementStrategy.componentRef.instance" 
                        _methods="_ngElementStrategy.componentRef.instance"></${tagName}>`,
      js: `class MyIcon${index} extends ${className}{
             constructor(){
                 super();
                 this.fontSize = '${fontSize.value}';
                 this.iconUrl = '${iconUrl.value}';
                 this.icon = '${icon.value}';
             }
         }
         MyIcon${index}.ɵcmp = {
          ...MyIcon${index}.ɵcmp,
          factory:() => { return new MyIcon${index}()}
         };
         (()=>{
            let customEl = createCustomElement(MyIcon${index}, {  injector: injector,});
            customElements.get('${tagName}') || customElements.define('${tagName}',customEl);
        })();
         `,
    };
  }
}
