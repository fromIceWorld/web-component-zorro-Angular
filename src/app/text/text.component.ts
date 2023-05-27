import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { transformValue } from 'src/common';
import { method } from 'src/decorators';
import { config } from 'src/decorators/config';
import { TEXT_CONFIG } from './text-config';
@config(TEXT_CONFIG)
@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css'],
})
export class TextComponent implements OnInit {
  static tagNamePrefix: string = 'my-text';
  value: string = '姓名';
  isSHow: boolean = true;
  showChange() {
    this.isSHow = !this.isSHow;
    this.cd.detectChanges();
  }
  @method()
  show() {
    this.isSHow = true;
    this.cd.detectChanges();
  }
  check() {
    this.cd.detectChanges();
  }
  hide() {
    this.isSHow = false;
    this.cd.detectChanges();
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
      tagName = `${TextComponent.tagNamePrefix}-${index}`;
    const { html: config, css, className } = option;
    let styleStr = '';
    for (let [key, value] of Object.entries(css)) {
      // @ts-ignore
      styleStr += `${key}:${value.value}${value.postfix || ''};`;
    }
    const init = Object.keys(config)
      .map((key) => {
        return `this.${key} = ${transformValue(config[key])}`;
      })
      .join('\n');
    return {
      tagName: `${tagName}`,
      html: `<${tagName} _data="_ngElementStrategy.componentRef.instance"
                         _methods="_ngElementStrategy.componentRef.instance" 
                        style="${styleStr}"></${tagName}>`,
      js: `class MyText${index} extends ${className}{
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
              set text(value){
                this.value = value;
                this.check();
              }
          }
          MyText${index}.ɵcmp.factory = () => { return new MyText${index}()};
          customElements.define('${tagName}',createCustomElement(MyText${index}, {  injector: injector,}));
          `,
    };
  }
  constructor(private cd: ChangeDetectorRef) {}
  ngOnInit(): void {}
}
