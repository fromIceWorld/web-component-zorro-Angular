import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import {
  NzTableLayout,
  NzTablePaginationPosition,
  NzTableSize,
} from 'ng-zorro-antd/table';
import { transformValue } from 'src/common';
import { method } from 'src/decorators';
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
export class TableComponent implements OnInit {
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
  @method()
  setLoading() {
    this.loading = true;
    this.check();
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
  // 配置table宽度，如果有明确的width，table有固定宽度，否的话就自适应
  headerConfig() {
    let widthSum = this.headerWidth();
    let widthAttribute = widthSum > 0 ? widthSum + 'px' : '100%';
    // 有固定宽度，table就是一个 inline-block
    return (
      `width:${widthAttribute};` + (widthSum > 0 ? 'display:inline-block' : '')
    );
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
  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {}
  check() {
    this.cd.detectChanges();
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
    const { html: config, css, className } = option;
    const init = Object.keys(config)
      .map((key) => {
        return `this.${key} = ${transformValue(config[key])}`;
      })
      .join('\n');
    return {
      tagName: `${tagName}`,
      html: `<${tagName} _data="_ngElementStrategy.componentRef.instance" _methods="_ngElementStrategy.componentRef.instance"></${tagName}>`,
      js: `class MyTable${index} extends ${className}{
             constructor(){
                 super();
                 ${init};
                 this.dep();
             }
             dep(){
              setTimeout(()=>{
                this.cd = this['__ngContext__'][13][0]._ngElementStrategy.componentRef.changeDetectorRef;
              });
             }
             // 配置项
             get list() {
               return this.listOfData;
             }
             set list(data) {
               this.listOfData = data || [];
               this.check();
             }
             get selected() {
              return {selected:Array.from(this.setOfCheckedId)};
             }
             get id() {
              return {id:this.item && this.item.id};
             }
         }
         MyTable${index}.ɵcmp.factory = () => { return new MyTable${index}()};
         customElements.define('${tagName}',createCustomElement(MyTable${index}, {  injector: injector,}));
         `,
    };
  }
}
