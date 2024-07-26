import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { createCustomElementHsh } from 'src/common/hash';
import { config } from 'src/decorators/config';
import { TOGGLE_BUTTON_CONFIG } from './toggle-button-config';

@config(TOGGLE_BUTTON_CONFIG)
@Component({
  selector: 'app-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.css'],
})
export class ToggleButtonComponent implements OnInit {
  @Output() change = new EventEmitter();
  static tagNamePrefix: string = 'blue-toggle-button';
  type = 'text-button';
  list = [
    { lable: '活动保障任务轮播', value: 'active', checked: true },
    { lable: '视频保障任务轮播', value: 'vedio', checked: false },
  ];
  constructor() {}
  checked(i) {
    let change = false,
      value = '';
    this.list = this.list.map((item, index) => {
      if (index == i && !item.checked) {
        change = true;
        value = item.value;
      }
      if (index == i) {
        item.checked = true;
      } else {
        item.checked = false;
      }
      return item;
    });
    if (change) {
      this.change.emit(value);
    }
  }
  ngOnInit(): void {}
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
      tagName = `${ToggleButtonComponent.tagNamePrefix}-${index}`;
    const { html, className } = option;
    const { list, type } = html[0].config;

    return {
      html: `<${tagName} _data="_ngElementStrategy.componentRef.instance" _methods="_ngElementStrategy.componentRef.instance"></${tagName}>`,
      js: `class MyToggleButton${index} extends ${className}{
              constructor(){
                 super();
                 this.list = ${list.value};
                 this.type = '${type.value}';
               }
          }
          MyToggleButton${index}.ɵcmp = {
           ...MyToggleButton${index}.ɵcmp,
           factory:() => { return new MyToggleButton${index}()},
          };
          (()=>{
             let angularClass = ${createCustomElementHsh}(MyToggleButton${index}, {  injector: injector,});
             class customClass extends angularClass{
               constructor(){
                 super();
               }
               get instance(){
                return this._ngElementStrategy.componentRef.instance
              }
              get list(){
                return this.instance.list;
              }
               get value(){
                 let select = this.instance.list.find(i=>i.checked);
                 return select ? select.value : '';
               }
               set value(k){
                this.instance.list = this.instance.list.map(item=>{
                  item.checked = false;
                  if(item.value == k){
                    item.checked = true;
                  }
                })
               }
             }  
             customElements.get('${tagName}') || customElements.define('${tagName}',customClass);
          })();
          `,
    };
  }
}
