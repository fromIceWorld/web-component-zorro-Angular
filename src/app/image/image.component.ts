import { ChangeDetectorRef, Component } from '@angular/core';
import { config } from 'src/decorators/config';
import { IMAGE_CONFIG } from './image-config';

@config(IMAGE_CONFIG)
@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css'],
})
export class ImageComponent {
  static tagNamePrefix: string = 'my-image';
  width = 'auto';
  height = 'auto';
  src = 'https://react.docschina.org/images/home/conf2021/cover.svg';
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
      tagName = `${ImageComponent.tagNamePrefix}-${index}`;
    const { html, className } = option;
    const { width, height } = html[0].config,
      { src } = html[1].config;
    return {
      tagName: `${tagName}`,
      html: `<${tagName} _data="_ngElementStrategy.componentRef.instance"
                        _methods="_ngElementStrategy.componentRef.instance" 
                       "></${tagName}>`,
      js: `class MyImage${index} extends ${className}{
             constructor(){
                 super();
                 this.width = '${width.value}';
                 this.height = '${height.value}';
                 this.src = '${src.value}';
             }
         }
         MyImage${index}.ɵcmp.factory = () => { return new MyImage${index}()};
         (()=>{
            let customEl = createCustomElement(MyImage${index}, {  injector: injector});
            customElements.get('${tagName}') || customElements.define('${tagName}',customEl);
          })();
          `,
    };
  }
}
