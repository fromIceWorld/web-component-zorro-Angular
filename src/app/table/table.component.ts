import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  NzTableLayout,
  NzTablePaginationPosition,
  NzTableSize,
} from 'ng-zorro-antd/table';
import { transformValue } from 'src/common';

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

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  static index = 0;
  static tagNamePrefix: string = 'my-table';
  listOfData: ItemData[] = [];
  displayData: ItemData[] = [];
  allChecked = false;
  indeterminate = false;
  fixedColumn = false;
  scrollX: string | null = null;
  scrollY: string | null = null;
  settingValue!: Setting;
  // 数据项
  headers = [
    { label: 'age:100', value: 'age:100' },
    { label: 'name:200', value: 'name:200' },
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
  size = 'small';
  paginationType = 'default';
  tableScroll = 'unset';
  tableLayout = 'auto';
  position = 'bottom';
  // 配置项
  // 暴露的方法
  setList(list) {
    this.listOfData = list;
  }
  setLoading() {
    this.loading = true;
    this.check();
  }
  // 暴露的方法
  currentPageDataChange($event: ItemData[]): void {
    this.displayData = $event;
    this.refreshStatus();
  }
  headerConfig() {
    return (
      this.headers.reduce((pre, cur) => {
        return pre + Number(cur.label.split(':')[1]);
      }, 0) + (this.checkbox ? 60 : 0)
    );
  }
  refreshStatus(): void {
    const validData = this.displayData.filter((value) => !value.disabled);
    const allChecked =
      validData.length > 0 &&
      validData.every((value) => value.checked === true);
    const allUnChecked = validData.every((value) => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = !allChecked && !allUnChecked;
  }
  // 勾选全部
  checkAll(value: boolean): void {
    this.displayData.forEach((data) => {
      if (!data.disabled) {
        data.checked = value;
      }
    });
    this.refreshStatus();
  }

  constructor(
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef
  ) {}

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
    const index = TableComponent.index++,
      tagName = `${TableComponent.tagNamePrefix}-${index}`;
    const { html: config, css, className } = option;
    const init = Object.keys(config)
      .map((key) => {
        return `this.${key} = ${transformValue(config[key])}`;
      })
      .join('\n');
    return {
      tagName: `${tagName}`,
      html: `<${tagName}></${tagName}>`,
      js: `class MyTable${index} extends ${className}{
             constructor(){
                 super();
                 ${init}
             }
         }
         MyTable${index}.ɵcmp.factory = () => { return new MyTable${index}()};
         customElements.define('${tagName}',createCustomElement(MyTable${index}, {  injector: injector,}));
         `,
    };
  }
}
