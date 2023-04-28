import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { transformValue } from 'src/common';
import { config } from 'src/decorators/config';
import { PAGINATION_CONFIG } from './pagination-config';
@config(PAGINATION_CONFIG)
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
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
    this.check();
  }
  check() {
    this.cd.detectChanges();
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
    const { html: config, css, className } = option;
    const init = Object.keys(config)
      .map((key) => {
        return `this.${key} = ${transformValue(config[key])}`;
      })
      .join('\n');
    return {
      html: `<${tagName} _data="_ngElementStrategy.componentRef.instance" _methods="_ngElementStrategy.componentRef.instance"></${tagName}>`,
      js: `class MyPagination${index} extends ${className}{
              constructor(){
                  super();
                  ${init}
                  this.dep();
               }
               dep(){
                 setTimeout(()=>{
                   this.cd = this['__ngContext__'][13][0]._ngElementStrategy.componentRef.changeDetectorRef;
                 });
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
          customElements.define('${tagName}',createCustomElement(MyPagination${index}, {  injector: injector,}));
          `,
    };
  }
  ngOnInit(): void {}
}
