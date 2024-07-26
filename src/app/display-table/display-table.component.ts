import { Component } from '@angular/core';
import { createCustomElementHsh } from 'src/common/hash';
import { config } from 'src/decorators/config';
import { DISPLAY_TABLE_CONFIG } from './display-table-config';

@config(DISPLAY_TABLE_CONFIG)
@Component({
  selector: 'app-display-table',
  templateUrl: './display-table.component.html',
  styleUrls: ['./display-table.component.css'],
})
export class DisplayTableComponent {
  static tagNamePrefix: string = 'my-display-table';
  headerPadding = '3px 10px';
  headerBackground =
    'linear-gradient(rgba(47, 108, 211, 0.34), rgba(47, 108, 211, 0.34)), linear-gradient(#0d3469, #0d3469)';
  itemPadding = '3px 10px';
  itemMargin = '4px 0';
  itemBackground = '#00327080';
  header = true;
  headers = [
    { label: '保障名称', key: 'name', width: 'auto' },
    { label: '保障开始时间', key: 'time', width: 'auto' },
    { label: '保障结束时间', key: 'end', width: 'auto' },
    { label: '保障单位数', key: 'count', width: 'auto' },
    { label: '攻击告警数', key: 'alarm', width: 'auto' },
    { label: '攻击成功数', key: 'attack', width: 'auto' },
  ];
  list = [
    {
      name: '安全保障任务名称',
      time: '2024-01-01',
      end: '2024-01-01',
      count: 230,
      alarm: 454,
      attack: 454,
      id: 1,
    },
    {
      name: '安全保障任务名称',
      time: '2024-01-01',
      end: '2024-01-01',
      count: 230,
      alarm: 454,
      attack: 454,
      id: 2,
    },
    {
      name: '安全保障任务名称',
      time: '2024-01-01',
      end: '2024-01-01',
      count: 230,
      alarm: 454,
      attack: 454,
      id: 3,
    },
    {
      name: '安全保障任务名称',
      time: '2024-01-01',
      end: '2024-01-01',
      count: 230,
      alarm: 454,
      attack: 454,
      id: 4,
    },
    {
      name: '安全保障任务名称',
      time: '2024-01-01',
      end: '2024-01-01',
      count: 230,
      alarm: 454,
      attack: 454,
      id: 4,
    },
  ];
  slots: any[] = [[], [], []];

  // 导出渲染数据
  /**
   *
   * @param option 参数配置
   * @returns {
   *      html, js
   * }
   */
  static extends(
    option,
    preTagName?: string
  ): { tagName: string; html: string; js: string } {
    // web component 的索引不能递增，因为索引重置后会重复，而且cache后apply会有冲突。
    const index = String(Math.random()).substring(2),
      tagName = `${DisplayTableComponent.tagNamePrefix}-${index}`;
    const { html, className } = option;
    const {
      headerPadding,
      headerBackground,
      itemPadding,
      itemMargin,
      itemBackground,
      header,
      headers,
      list,
      slots,
    } = html[0].config;
    return {
      tagName: `${tagName}`,
      html: `<${tagName} _data="_ngElementStrategy.componentRef.instance" _methods="_ngElementStrategy.componentRef.instance"></${tagName}>`,
      js: `class MyDisplayTable${index} extends ${className}{
             constructor(){
                 super();
                 this.headerPadding = '${headerPadding.value}';
                 this.headerBackground = '${headerBackground.value}';
                 this.itemPadding = '${itemPadding.value}';
                 this.itemMargin = '${itemMargin.value}';
                 this.itemBackground = '${itemBackground.value}';
                 this.header = ${header.value};
                 this.headers = ${JSON.stringify(headers.value)};
                 this.list = ${list.value};
                 this.slots = ${JSON.stringify(slots.value)};

             }
         }
         MyDisplayTable${index}.ɵcmp = {
          ...MyDisplayTable${index}.ɵcmp,
          factory:() => { return new MyDisplayTable${index}()},
         };
         (()=>{
            let angularClass = ${createCustomElementHsh}(MyDisplayTable${index}, {  injector: injector,});
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
              get list() {
                return this.instance.list;
              }
              set list(data) {
                this.instance.list = data || [];
                this.check();
              }
              get selected() {
               return Array.from(this.instance.setOfCheckedId);
              }
              get id() {
               return this.instance.item && this.instance.item.id;
              }
              get row(){
                return this.instance.item;
              }
              setLoading() {
               this.instance.loading = true;
               this.check();
             }
            }  
            customElements.get('${tagName}') || customElements.define('${tagName}',customClass);
        })();
         `,
    };
  }
}
