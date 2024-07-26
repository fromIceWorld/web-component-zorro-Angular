import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { createCustomElementHsh } from 'src/common/hash';
import { config } from 'src/decorators/config';
import { COUNTRY_CONFIG } from './country-config';

@config(COUNTRY_CONFIG)
@Component({
  selector: 'app-text',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
})
export class CountryComponent implements OnInit {
  static tagNamePrefix: string = 'my-country';
  inputObj = {
    src: '',
    color: '',
    value: '',
  };
  @Input('input')
  set input(jsonString) {
    this.inputObj = { ...this.inputObj, ...JSON.parse(jsonString) };
  }
  value: string = '姓名';
  fontSize: string = '14px';
  fontFamily: string = '';
  fontWeight: number = 400;
  color: string = 'black';
  left = '0px';
  top = '0px';
  right = '0px';
  bottom = '0px';
  src = '';
  direction = 'ltr';
  constructor(private cd: ChangeDetectorRef) {}

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
      tagName = `${CountryComponent.tagNamePrefix}-${index}`;
    const { html, className } = option;
    const {
      src,
      value,
      fontSize,
      fontWeight,
      color,
      left,
      top,
      right,
      bottom,
      fontFamily,
      direction,
    } = html[0].config;
    return {
      tagName: `${tagName}`,
      html: `<${tagName}></${tagName}>`,
      js: `
          (()=>{
            class MyText${index} extends ${className}{
              constructor(){
                  super();
                  this.src = '${src.value}';
                  this.direction = '${direction.value}';
                  this.value = '${value.value}';
                  this.fontWeight = ${fontWeight.value};
                  this.fontFamily = '${fontFamily ? fontFamily.value : ''}';
                  this.fontSize = '${fontSize.value}${fontSize.postfix}';
                  this.left = '${left.value}${left.postfix}';
                  this.top = '${top.value}${top.postfix}';
                  this.right = '${right.value}${right.postfix}';
                  this.bottom = '${bottom.value}${bottom.postfix}';
                  this.color = '${color.value}';
              }
          }
          MyText${index}.ɵcmp = {
            ...MyText${index}.ɵcmp,
            factory : () => { return new MyText${index}() }
          };
            let angularClass = ${createCustomElementHsh}(MyText${index}, {  injector: injector,});
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
              get text(){
                return this.instance.value;
              }
              set text(value){
                this.instance.value = value;
                this.check();
              }
            }
            customElements.get('${tagName}') || customElements.define('${tagName}',customClass);
         })();
          `,
    };
  }

  ngOnInit(): void {}
}
