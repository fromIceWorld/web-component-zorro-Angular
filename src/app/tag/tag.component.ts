import { Component } from '@angular/core';
import { createCustomElementHsh } from 'src/common/hash';
import { config } from 'src/decorators/config';
import { TAG_CONFIG } from './tag-config';

@config(TAG_CONFIG)
@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css'],
})
export class TagComponent {
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
    const { html, className } = option;
    const { mode, tags } = html[0].config;
    return {
      html: `<${tagName} _data="_ngElementStrategy.componentRef.instance" _methods="_ngElementStrategy.componentRef.instance"></${tagName}>`,
      js: `class MyTag${index} extends ${className}{
             constructor(){
                 super();
                 this.mode = '${mode.value}';
                 this.tags = ${tags.value};
              }
         }
         MyTag${index}.ɵcmp = {
          ...MyTag${index}.ɵcmp,
          factory:() => { return new MyTag${index}()},
         };
         (()=>{
          let angularClass = ${createCustomElementHsh}(MyTag${index}, {  injector: injector,});
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
            set tagList(value){
              this.instance.tags = value || [];
              this.check();
            }
            get tagList(){
              return this.instance.tags  || [];
            }
          }  
          customElements.get('${tagName}') || customElements.define('${tagName}',customClass);
         })();  
         `,
    };
  }
}
