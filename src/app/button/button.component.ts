import { Component } from '@angular/core';
import { createCustomElementHsh } from 'src/common/hash';
import { config } from 'src/decorators/config';
import { BUTTON_CONFIG } from './button-config';
@config(BUTTON_CONFIG)
@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  providers: [],
})
export class ButtonComponent {
  static tagNamePrefix: string = 'my-button';
  disabled: boolean = false;
  ghost: boolean = false;
  loading: boolean = false;
  shape: string = '';
  size: string = 'default';
  type: string = 'primary';
  block: boolean = false;
  danger: boolean = false;
  icon: string = 'search';
  name: string = 'Search';
  constructor() {}
  setNormal() {
    this.loading = false;
  }
  setLoading() {
    this.loading = true;
  }
  setDisabled() {
    this.disabled = true;
  }
  public loadingChange() {
    this.loading = !this.loading;
  }
  public disabledChange() {
    this.disabled = !this.disabled;
  }
  // 导出渲染数据
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
      tagName = `${ButtonComponent.tagNamePrefix}-${index}`;
    const { html, className } = option;
    const { name } = html[0].config,
      { shape, size, type, block, icon } = html[1].config;

    const { disabled, ghost, loading, danger } = html[2].config;
    return {
      html: `<${tagName} _data="_ngElementStrategy.componentRef.instance" _methods="_ngElementStrategy.componentRef.instance"></${tagName}>`,
      js: `class MyButton${index} extends ${className}{
               constructor(){
                  super();
                  this.disabled = '${disabled.value}';
                  this.ghost = '${ghost.value}';
                  this.loading = '${loading.value}';
                  this.shape = '${shape.value}';
                  this.size = '${size.value}';
                  this.type = '${type.value}';
                  this.block = '${block.value}';
                  this.danger = '${danger.value}';
                  this.icon = '${icon.value}';
                  this.name = '${name.value}';
                }
           }
           MyButton${index}.ɵcmp = {
            ...MyButton${index}.ɵcmp,
            factory:() => { return new MyButton${index}()},
           };
           (()=>{
              let angularClass = ${createCustomElementHsh}(MyButton${index}, {  injector: injector,});
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
                setLoading(){
                  this.instance.loading = true;
                  this.check();
                }
                setNormal(){
                  this.instance.loading = false;
                  this.instance.disabled = false;
                  this.check();
                }
                setDisabled(){
                  this.instance.disabled = true;
                  this.check();
                }
              }  
              customElements.get('${tagName}') || customElements.define('${tagName}',customClass);
           })();
           `,
    };
  }
}
