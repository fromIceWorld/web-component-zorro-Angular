import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  fontSize: string = '14px';
  fontWeight: number = 400;
  color: string = 'black';
  isSHow: boolean = true;
  left = '0px';
  top = '0px';
  right = '0px';
  bottom = '0px';
  constructor(private cd: ChangeDetectorRef) {}
  show() {
    this.isSHow = true;
  }
  hide() {
    this.isSHow = false;
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
    const { html, className } = option;
    const { value, fontSize, fontWeight, color, left, top, right, bottom } =
      html[0].config;
    return {
      tagName: `${tagName}`,
      html: `<${tagName} _data="_ngElementStrategy.componentRef.instance"
                         _methods="_ngElementStrategy.componentRef.instance" 
                        "></${tagName}>`,
      js: `
          (()=>{
            class MyText${index} extends ${className}{
              constructor(undefined){
                  super();
                  this.value = '${value.value}';
                  this.fontWeight = ${fontWeight.value};
                  this.fontSize = '${fontSize.value}${fontSize.postfix}';
                  this.left = '${left.value}${left.postfix}';
                  this.top = '${top.value}${top.postfix}';
                  this.right = '${right.value}${right.postfix}';
                  this.bottom = '${bottom.value}${bottom.postfix}';
                  this.color = '${color.value}';
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
              // 暴露的接口，供外部调用修改组件
              set text(value){
                this.value = value;
                this.check();
              }
              showChange() {
                this.isSHow = !this.isSHow;
                this.check();
              }
          }
          MyText${index}.ɵcmp = {
            ...MyText${index}.ɵcmp,
            factory : () => { return new MyText${index}() }
          };
            let customEl = createCustomElement(MyText${index}, {  injector: injector,});
            customElements.get('${tagName}') || customElements.define('${tagName}',customEl);
         })();
          `,
    };
  }

  ngOnInit(): void {}
}
