import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { createCustomElementHsh } from 'src/common/hash';
import { config } from 'src/decorators/config';
import { PAGINATION_CONFIG } from './pagination-config';

@config(PAGINATION_CONFIG)
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent {
  static tagNamePrefix: string = 'my-pagination';
  @Output('change') change = new EventEmitter();
  totalCount = 10;
  pageIndex = 1;
  pageSize = 10;
  nzShowSizeChanger = true;
  nzShowQuickJumper = true;
  pageIndexChange() {
    this.change.emit();
  }
  pageSizeChange() {
    this.change.emit();
  }
  constructor(private cd: ChangeDetectorRef) {}
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
      tagName = `${PaginationComponent.tagNamePrefix}-${index}`;
    const { html, className } = option;
    const { pageSize, nzShowSizeChanger, nzShowQuickJumper } = html[0].config;
    return {
      html: `<${tagName} _data="_ngElementStrategy.componentRef.instance" _methods="_ngElementStrategy.componentRef.instance"></${tagName}>`,
      js: `class MyPagination${index} extends ${className}{
              constructor(){
                  super();
                  this.pageSize = '${pageSize.value}';
                  this.nzShowSizeChanger = ${nzShowSizeChanger.value};
                  this.nzShowQuickJumper = ${nzShowQuickJumper.value};
               }
          }
          MyPagination${index}.ɵcmp = {
            ...MyPagination${index}.ɵcmp,
            factory:() => { return new MyPagination${index}()},
          };
          (()=>{
              let angularClass = ${createCustomElementHsh}(MyPagination${index}, {  injector: injector,});
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
                get pageIndex(){
                  return this.instance.pageIndex;
                }
                set pageIndex(value){
                  this.instance.pageIndex = value;
                  this.check();
                }
                get pageSize(){
                  return this.instance.pageSize;
                }
                set pageSize(value){
                 this.instance.pageSize = value;
                 this.check();
                }
                get total(){
                  return this.instance.totalCount;
                }
                set total(value){
                  this.instance.totalCount = value;
                  this.check();
                }
              }  
              customElements.get('${tagName}') || customElements.define('${tagName}',customClass);
          })();
          `,
    };
  }
}
