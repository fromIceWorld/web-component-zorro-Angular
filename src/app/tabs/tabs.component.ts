import { Component, OnInit, TemplateRef, ViewChildren } from '@angular/core';
import { customWebComponent, transformValue } from 'src/common';
import { createCustomElementHsh } from 'src/common/hash';
import { config } from 'src/decorators/config';
import { TABS_CONFIG } from './tabs-config';

@config(TABS_CONFIG)
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
})
export class TabsComponent extends customWebComponent implements OnInit {
  static tagNamePrefix: string = 'my-tabs';
  tabs = [
    { label: 'tab1', value: 'tab1' },
    { label: 'tab2', value: 'tab2' },
  ];
  index = 0;
  @ViewChildren('tmp') temps: TemplateRef<any>;
  liveTemplate: TemplateRef<any>;
  constructor() {
    super();
  }
  change(e) {
    const { index } = e;
    //@ts-ignore
    this.liveTemplate = this.temps._results[index];
  }
  ngAfterViewInit(): void {
    //@ts-ignore
    this.liveTemplate = this.temps._results[0];
  }
  /**
   *
   * @param option 参数配置
   * @returns {
   *      html, js
   * }
   */
  static extends(option): { html: string; js: string } {
    // web component 的索引不能递增，因为索引重置后会重复，而且cache后apply会有冲突。
    const index = String(Math.random()).substring(2),
      tagName = `${TabsComponent.tagNamePrefix}-${index}`;
    const { html, css, className } = option;
    let config = {};
    Object.keys(html).map((key) => {
      config[key] = transformValue(html[key]);
    });
    return {
      html: `<${tagName} _data="_ngElementStrategy.componentRef.instance" _methods="_ngElementStrategy.componentRef.instance"></${tagName}>`,
      js: `class MyTabs${index} extends ${className}{
             constructor(){
                 super();
              }
         }
         MyTabs${index}.ɵcmp = {
          ...MyTabs${index}.ɵcmp,
          factory:() => { return new MyTabs${index}()},
         };
         (()=>{
          let angularClass = ${createCustomElementHsh}(MyTabs${index}, {  injector: injector,});
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
          }  
          customElements.get('${tagName}') || customElements.define('${tagName}',customClass);
          })();
         `,
    };
  }
  ngOnInit() {
    this.applyData();
  }
}
