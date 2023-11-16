import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
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
  init() {
    this.totalCount = 11;
    this.pageIndex = 1;
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
    const { html, css, className } = option;
    const { pageSize, nzShowSizeChanger, nzShowQuickJumper } = html;
    return {
      html: `<${tagName} _data="_ngElementStrategy.componentRef.instance" _methods="_ngElementStrategy.componentRef.instance"></${tagName}>`,
      js: `class MyPagination${index} extends ${className}{
              constructor(){
                  super();
                  this.pageSize = '${pageSize.value}';
                  this.nzShowSizeChanger = ${nzShowSizeChanger.value};
                  this.nzShowQuickJumper = ${nzShowQuickJumper.value};
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
               get value(){
                return {
                  pageIndex:this.pageIndex,
                  pageSize:this.pageSize,
                }
               }
               set total(value){
                this.totalCount = value;
                this.check();
               }
          }
          MyPagination${index}.ɵcmp.factory = () => { return new MyPagination${index}()};
          (()=>{
              let customEl = createCustomElement(MyPagination${index}, {  injector: injector,});
              // 添加用户自定义数据
              Object.defineProperty(customEl.prototype,'option',{
                get(){
                  return ${JSON.stringify(config)}
                },
                configurable: false,
                enumerable: false
              })
              customElements.define('${tagName}',customEl);
          })();
          `,
    };
  }
}
