import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { transformValue } from 'src/common';
window['ChangeDetectorRef'] = ChangeDetectorRef;

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  providers: [],
})
export class ButtonComponent implements OnInit {
  static index = 0;
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
    const index = ButtonComponent.index++,
      tagName = `${ButtonComponent.tagNamePrefix}-${index}`;
    const { html: config, css, className } = option;
    const init = Object.keys(config)
      .map((key) => {
        return `this.${key} = ${transformValue(config[key])}`;
      })
      .join('\n');
    return {
      html: `<${tagName}></${tagName}>`,
      js: `class MyButton${index} extends ${className}{
               constructor(){
                   super();
                   ${init}
               }
           }
           MyButton${index}.ɵcmp.factory = () => { return new MyButton${index}()};
           customElements.define('${tagName}',createCustomElement(MyButton${index}, {  injector: injector,}));
           `,
    };
  }
  constructor(private cd: ChangeDetectorRef) {
    console.log('this ChangeDetectorRef', cd);
  }
  onClick() {
    this.loading = true;
  }
  ngOnInit(): void {}
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
