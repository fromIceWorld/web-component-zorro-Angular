import { Component, OnInit, TemplateRef, ViewChildren } from '@angular/core';
import { transformValue } from 'src/common';
import { config } from 'src/decorators/config';
import { TABS_CONFIG } from './tabs-config';

@config(TABS_CONFIG)
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
})
export class TabsComponent implements OnInit {
  static tagNamePrefix: string = 'my-tabs';
  tabs = [
    { label: 'tab1', value: 'tab1' },
    { label: 'tab2', value: 'tab2' },
  ];
  index = 0;
  @ViewChildren('tmp') temps: TemplateRef<any>;
  liveTemplate: TemplateRef<any>;
  constructor() {}
  change(e) {
    const { index } = e;
    console.log(this.temps);
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
    const { html: config, css, className } = option;
    const init = Object.keys(config)
      .map((key) => {
        return `this.${key} = ${transformValue(config[key])}`;
      })
      .join('\n');
    return {
      html: `<${tagName} _data="_ngElementStrategy.componentRef.instance" _methods="_ngElementStrategy.componentRef.instance"></${tagName}>`,
      js: `class MyTabs${index} extends ${className}{
             constructor(){
                 super();
                 ${init}
                 this.dep();
              }
              dep(){
                setTimeout(()=>{
                  this.cd = this['__ngContext__'][13][0]._ngElementStrategy.componentRef.changeDetectorRef;
                });
              }
         }
         MyTabs${index}.ɵcmp.factory = () => { return new MyTabs${index}()};
         customElements.define('${tagName}',createCustomElement(MyTabs${index}, {  injector: injector,}));
         `,
    };
  }
  ngOnInit() {}
}
