import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { transformValue } from 'src/common';
import { config } from 'src/decorators/config';
import { TAG_CONFIG } from './tag-config';
@config(TAG_CONFIG)
@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css'],
})
export class TagComponent implements OnInit {
  static tagNamePrefix: string = 'my-tag';
  tags = [
    {
      color: 'success',
      checked: false,
      value: 'success',
    },
    {
      color: 'processing',
      checked: false,
      value: 'processing',
    },
    {
      color: 'error',
      checked: false,
      value: 'error',
    },
    {
      color: 'warning',
      checked: false,
      value: 'warning',
    },
    {
      color: 'default',
      checked: false,
      value: 'default',
    },
  ];
  mode = 'default';
  checkChange(tag) {
    tag.checked = !tag.checked;
  }
  check() {
    this.cd.detectChanges();
  }
  constructor(private cd: ChangeDetectorRef) {}
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
      tagName = `${TagComponent.tagNamePrefix}-${index}`;
    const { html: config, css, className } = option;
    const init = Object.keys(config)
      .map((key) => {
        return `this.${key} = ${transformValue(config[key])}`;
      })
      .join('\n');
    return {
      html: `<${tagName} _data="_ngElementStrategy.componentRef.instance" _methods="_ngElementStrategy.componentRef.instance"></${tagName}>`,
      js: `class MyTag${index} extends ${className}{
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
              set tagList(value){
                this.tags = value || [];
                this.check();
              }
         }
         MyTag${index}.ɵcmp.factory = () => { return new MyTag${index}()};
         customElements.define('${tagName}',createCustomElement(MyTag${index}, {  injector: injector,}));
         `,
    };
  }
  ngOnInit(): void {}
}