import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import {
  NzTableLayout,
  NzTablePaginationPosition,
  NzTableSize,
} from 'ng-zorro-antd/table';
import { createCustomElementHsh } from 'src/common/hash';
import { config } from 'src/decorators/config';
import { TABLE_CONFIG } from './table-config';

interface ItemData {
  name: string;
  age: number | string;
  address: string;
  checked: boolean;
  expand: boolean;
  description: string;
  disabled?: boolean;
}

interface Setting {
  bordered: boolean;
  loading: boolean;
  pagination: boolean;
  sizeChanger: boolean;
  title: boolean;
  header: boolean;
  footer: boolean;
  expandable: boolean;
  checkbox: boolean;
  fixHeader: boolean;
  noResult: boolean;
  ellipsis: boolean;
  simple: boolean;
  size: NzTableSize;
  tableScroll: string;
  tableLayout: NzTableLayout;
  position: NzTablePaginationPosition;
}

@config(TABLE_CONFIG)
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  static tagNamePrefix: string = 'my-table';
  @Output('view') view = new EventEmitter();
  @Output('edit') edit = new EventEmitter();
  @Output('delete') delete = new EventEmitter();
  expandSet = new Set<number>();
  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }
  listOfData: ItemData[] = [];
  item = {};
  indeterminate = false;
  fixedColumn = false;
  scrollX: string | null = null;
  scrollY: string | null = null;
  settingValue!: Setting;
  // 数据项
  headers = [
    { label: '年龄', key: 'age', width: '100' },
    { label: '姓名', key: 'name', width: '100' },
  ];
  // 数据项
  // 配置项
  bordered = false;
  loading = false;
  pagination = false;
  sizeChanger = false;
  title = false;
  header = true;
  footer = false;
  expandable = false;
  checkbox = true;
  fixHeader = false;
  noResult = false;
  ellipsis = false;
  simple = false;
  viewBtn = false;
  editBtn = false;
  deleteBtn = false;
  size = 'small';
  paginationType = 'default';
  tableScroll = 'unset';
  tableLayout = 'auto';
  position = 'bottom';
  titleValue = 'Here is Title';
  footerValue = 'Here is Footer';
  setOfCheckedId = new Set<number>();
  listOfCurrentPageData: readonly ItemData[] = [];
  checked = false;
  constructor(private cd: ChangeDetectorRef) {}
  setLoading() {
    this.loading = true;
  }
  // 暴露的方法
  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }
  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshStatus();
  }
  headerWidth() {
    let widthSum =
      this.headers.reduce((pre, cur) => {
        let width = Number(cur.width) || -Infinity;
        return pre + width;
      }, 0) +
      (this.checkbox ? 60 : 0) +
      (this.viewBtn || this.editBtn || this.deleteBtn ? 100 : 0);
    return widthSum;
  }
  // 每一列的宽度
  itemWidth(width) {
    return isNaN(Number(width)) ? 'unset' : width + 'px';
  }
  refreshStatus(): void {
    const checked = this.listOfData.length == this.setOfCheckedId.size;
    this.checked = checked;
    this.indeterminate = !checked;
  }
  // 勾选全部
  checkAll(value: boolean): void {
    if (value) {
      this.setOfCheckedId = new Set(
        this.listOfData.map((item: any) => item.id)
      );
    } else {
      this.setOfCheckedId.clear();
    }
    this.refreshStatus();
  }
  seeRow(row) {
    this.item = row;
    this.view.emit();
  }
  editRow(row) {
    this.item = row;
    this.edit.emit();
  }
  deleteRow(row) {
    this.item = row;
    this.delete.emit();
  }

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
      tagName = `${TableComponent.tagNamePrefix}-${index}`;
    const { html, className } = option;
    const {
      title,
      titleValue,
      header,
      footer,
      footerValue,
      expandable,
      checkbox,
      ellipsis,
      size,
      headers,
      row,
      listOfData,
      viewBtn,
      editBtn,
      deleteBtn,
    } = html[0].config;
    return {
      tagName: `${tagName}`,
      html: `<${tagName} _data="_ngElementStrategy.componentRef.instance" _methods="_ngElementStrategy.componentRef.instance"></${tagName}>`,
      js: `class MyTable${index} extends ${className}{
             constructor(){
                 super();
                 this.title = ${title.value};
                 this.titleValue = '${titleValue.value}';
                 this.header = ${header.value};
                 this.footer = ${footer.value};
                 this.footerValue = '${footerValue.value}';
                 this.expandable = ${expandable.value};
                 this.checkbox = ${checkbox.value};
                 this.ellipsis = ${ellipsis.value};
                 this.size = '${size.value}';
                 this.headers = ${JSON.stringify(headers.value)};
                 this.row = ${row.value};
                 this.listOfData = ${listOfData.value};
                 this.viewBtn = ${viewBtn.value};
                 this.editBtn = ${editBtn.value};
                 this.deleteBtn = ${deleteBtn.value};
             }
         }
         MyTable${index}.ɵcmp = {
          ...MyTable${index}.ɵcmp,
          factory:() => { return new MyTable${index}()},
         };
         (()=>{
            let angularClass = ${createCustomElementHsh}(MyTable${index}, {  injector: injector,});
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
                return this.instance.listOfData;
              }
              set list(data) {
                this.instance.listOfData = data || [];
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
