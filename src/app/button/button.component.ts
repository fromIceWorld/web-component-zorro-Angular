import { Component } from '@angular/core';
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

    const {
      disabled,
      ghost,
      loading,

      danger,
    } = html[2].config;
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
                // extends的class 无法依赖注入cd,只能自己查找
                get cd(){
                  const dom = document.querySelector('${tagName}');
                  return dom._ngElementStrategy;
                }
                set cd(value){}
                check(){
                  this.cd.detectChanges();
                  setTimeout(()=>this.cd.detectChanges())
                }
                setLoading(){
                  this.loading = true;
                  this.check();
                }
                setNormal(){
                  this.loading = false;
                  this.disabled = false;
                  this.check();
                }
                setDisabled(){
                  this.disabled = true;
                  this.check();
                }
           }
           MyButton${index}.ɵcmp = {
            ...MyButton${index}.ɵcmp,
            factory:() => { return new MyButton${index}()},
           };
           (()=>{
              let customEl = createCustomElement(MyButton${index}, {  injector: injector,});
              customElements.get('${tagName}') || customElements.define('${tagName}',customEl);
           })();
           `,
    };
  }
}
