import { Component, OnInit } from '@angular/core';
import { createCustomElementHsh } from 'src/common/hash';
import { config } from 'src/decorators/config';
import { TOP5_CONFIG } from './top5-config';

@config(TOP5_CONFIG)
@Component({
  selector: 'app-top5',
  templateUrl: './top5.component.html',
  styleUrls: ['./top5.component.css'],
})
export class Top5Component implements OnInit {
  static tagNamePrefix: string = 'my-blue-top5';

  list = [
    {
      name: '中国移动',
      percent: 100,
      count: 890,
    },
    {
      name: '南方电网',
      percent: 90,
      count: 890,
    },
    {
      name: '中国社会科学院',
      percent: 80,
      count: 890,
    },
    {
      name: '国家气象服务中心',
      percent: 60,
      count: 890,
    },
    {
      name: '生态环境部',
      percent: 20,
      count: 345,
    },
  ];
  constructor() {}

  ngOnInit(): void {}
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
      tagName = `${Top5Component.tagNamePrefix}-${index}`;
    const { html, className } = option;
    return {
      tagName: `${tagName}`,
      html: `<${tagName}></${tagName}>`,
      js: `
         (()=>{
           class MyTopN${index} extends ${className}{
             constructor(){
                 super();
             }
         }
         MyTopN${index}.ɵcmp = {
           ...MyTopN${index}.ɵcmp,
           factory : () => { return new MyTopN${index}() }
         };
           let angularClass = ${createCustomElementHsh}(MyTopN${index}, {  injector: injector,});
           class customClass extends angularClass{
             constructor(){
               super();
             }
             get instance(){
              return this._ngElementStrategy.componentRef.instance
            }
             check(){
               // extends的class 无法依赖注入cd,只能自己查找
               let cd = this._ngElementStrategy;
               cd.detectChanges();
             }
             set list(arr){
              this.instance.list = arr;
              this.check();   
             }
             get list(){
              return this.instance.list;
             }
           }
           customElements.get('${tagName}') || customElements.define('${tagName}',customClass);
        })();
         `,
    };
  }
}
