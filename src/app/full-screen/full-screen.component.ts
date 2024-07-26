import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { createCustomElementHsh } from 'src/common/hash';
import { config } from 'src/decorators/config';
import { FULL_SCREEN_CONFIG } from './full-screen-config';

@config(FULL_SCREEN_CONFIG)
@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styleUrls: ['./full-screen.component.css'],
})
export class FullScreenComponent implements OnInit {
  static tagNamePrefix: string = 'my-fullscreen';
  @Output() point = new EventEmitter();
  constructor() {}
  onClick() {
    this.index++;
    this.index %= 2;
    this.point.emit();
  }
  ngOnInit(): void {}
  index = 0;
  width = 30;
  left = '0px';
  top = '0px';
  right = '0px';
  bottom = '0px';
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
      tagName = `${FullScreenComponent.tagNamePrefix}-${index}`;
    const { html, className } = option;
    const { width, left, top, right, bottom } = html[0].config;
    return {
      tagName: `${tagName}`,
      html: `<${tagName}></${tagName}>`,
      js: `
          (()=>{
            class MyFullScreen${index} extends ${className}{
              constructor(){
                  super();
                  this.width = ${width.value};
                  this.left = '${left.value}${left.postfix}';
                  this.top = '${top.value}${top.postfix}';
                  this.right = '${right.value}${right.postfix}';
                  this.bottom = '${bottom.value}${bottom.postfix}';
              }
          }
          MyFullScreen${index}.ɵcmp = {
            ...MyFullScreen${index}.ɵcmp,
            factory : () => { return new MyFullScreen${index}() }
          };
            let angularClass = ${createCustomElementHsh}(MyFullScreen${index}, {  injector: injector,});
            class customClass extends angularClass{
              constructor(){
                super();
              }
              get instance(){
                return this._ngElementStrategy.componentRef.instance
              }
              get index(){
                return this.instance.index;
              }
            }
            customElements.get('${tagName}') || customElements.define('${tagName}',customClass);
         })();
          `,
    };
  }
}
