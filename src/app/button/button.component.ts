import { Component, OnInit } from '@angular/core';
import { customWebComponent, transformValue } from 'src/common';
import { config } from 'src/decorators/config';
import { BUTTON_CONFIG } from './button-config';

@config(BUTTON_CONFIG)
@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  providers: [],
})
export class ButtonComponent extends customWebComponent implements OnInit {
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
    const { html, css, className } = option;
    let config = {};
    Object.keys(html).map((key) => {
      config[key] = transformValue(html[key]);
    });
    return {
      html: `<${tagName} _data="_ngElementStrategy.componentRef.instance" _methods="_ngElementStrategy.componentRef.instance"></${tagName}>`,
      js: `class MyButton${index} extends ${className}{
               constructor(){
                   super();
                }
           }
           MyButton${index}.ɵcmp.factory = () => { return new MyButton${index}()};
           (()=>{
              let customEl = createCustomElement(MyButton${index}, {  injector: injector,});
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
    console.log('button', this, this['__ngContext__'][20][0]);
    this.applyData();
  }
  ngAfterViewInit() {
    console.log('ngAfterViewInit');
  }
  // 手动检查
  check() {
    this.cd.detectChanges();
  }
  normal() {
    this.loading = false;
    this.check();
  }
  setLoading() {
    this.loading = true;
    this.check();
  }
  setDisabled() {
    this.disabled = true;
    this.check();
  }
  public loadingChange() {
    this.loading = !this.loading;
    this.check();
  }
  public disabledChange() {
    this.disabled = !this.disabled;
    this.check();
  }
}
