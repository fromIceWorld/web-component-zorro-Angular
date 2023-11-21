import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { config } from 'src/decorators/config';
import { SELECT_CONFIG } from './select-config';

@config(SELECT_CONFIG)
@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
  providers: [],
}) //@ts-ignore
export class SelectComponent implements OnInit {
  @ViewChild('select') select;
  static tagNamePrefix: string = 'my-select';
  method = 'get';
  api =
    'https://www.fastmock.site/mock/14c2723aefa052a75b2a6feeed0cf387/suger/list';
  options: any[] = [
    { label: '男', value: '男' },
    { label: '女', value: '女' },
  ];
  selected;
  isLoading = false;
  placeholder = '请选择';
  getRandomNameList;
  constructor(private cd: ChangeDetectorRef, private http: HttpClient) {
    //@ts-ignore
    // this.http = SelectComponent.http;
    // this.getRandomNameList = this.http.get(`${this.api}`);
    // setTimeout(() => this.cd.detectChanges(), 1000);
    // this.loadMore();
  }
  clear() {
    this.selected = undefined;
  }
  loadMore(): void {
    // 无api时，options就是枚举类，有api时就是懒加载。
    if (!this.api) {
      return;
    }
    this.isLoading = true;
    this.http.get(`${this.api}`).subscribe((e: any) => {
      this.isLoading = false;
      this.options = [...this.options, ...e.data.list];
    });
  }
  static extends(option) {
    const { html, css, className } = option;
    // web component 的索引不能递增，因为索引重置后会重复，而且cache后apply会有冲突。
    const index = String(Math.random()).substring(2),
      tagName = `${SelectComponent.tagNamePrefix}-${index}`;
    const { placeholder, options, formcontrol, api } = html[0].config;
    let items = options.options.map((item) => {
      let { label, value } = item;
      return {
        label: label,
        value: value || label,
        checked: (value || label) === options.value,
      };
    });
    return {
      html: `<${tagName} _data="_ngElementStrategy.componentRef.instance" _methods="_ngElementStrategy.componentRef.instance"></${tagName}>`,
      js: `class MySelect${index} extends ${className}{
            constructor(){
                super(undefined,injector.get('http'));
                this.options = ${JSON.stringify(items)};
                this.selected = '${options.value}';
                this.api = '${api.value}';
                this.placeholder = '${placeholder.value}';
                // this.loadMore();
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
            clear(){
              this.selected = undefined;
              this.check();
            }
            get value() {
              return {${formcontrol.value}:this.selected};
            }
            set value(target) {
              this.selected = target;
            }
        }
        MySelect${index}.ɵcmp.factory = () => { return new MySelect${index}()};
        (()=>{
          let customEl = createCustomElement(MySelect${index}, {  injector: injector});
          customElements.get('${tagName}') || customElements.define('${tagName}',customEl);
       })();
        `,
    };
  }
  ngOnInit(): void {
    // this.applyData();
  }
}
