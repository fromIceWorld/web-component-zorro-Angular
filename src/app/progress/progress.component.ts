import { Component, Input } from '@angular/core';
import { createCustomElementHsh } from 'src/common/hash';
import { config } from 'src/decorators/config';
import { PROGRESS_CONFIG } from './progress-config';

@config(PROGRESS_CONFIG)
@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
})
export class ProgressComponent {
  static tagNamePrefix: string = 'my-progress';
  @Input('input')
  set inputConfig(value) {
    this.inputObject = { ...this.inputObject, ...JSON.parse(value) };
  }
  inputObject = {
    percentage: 0,
    height: 0,
    color: '',
  };
  constructor() {}
  percentage = 50;
  height = 50;
  color = `linear-gradient(-90deg, 
		#2999f7 8%, 
		rgba(41, 153, 247, 0.65) 54%, 
		rgba(41, 153, 247, 0.3) 100%), 
	linear-gradient(
		#253d50, 
		#253d50)`;
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
      tagName = `${ProgressComponent.tagNamePrefix}-${index}`;
    const { html, className } = option;
    const { percentage, height, color } = html[0].config;
    return {
      tagName: `${tagName}`,
      html: `<${tagName} _data="_ngElementStrategy.componentRef.instance"
                        _methods="_ngElementStrategy.componentRef.instance" 
                       "></${tagName}>`,
      js: `class MyImage${index} extends ${className}{
             constructor(){
                 super();
                 this.percentage = '${percentage.value}';
                 this.height = '${height.value}';
                 this.color = '${color.value}';
             }
         }
         MyImage${index}.ɵcmp = {
          ...MyImage${index}.ɵcmp,
          factory:() => { return new MyImage${index}()},
         };
         (()=>{
            let customEl = ${createCustomElementHsh}(MyImage${index}, {  injector: injector});
            customElements.get('${tagName}') || customElements.define('${tagName}',customEl);
          })();
          `,
    };
  }
}
