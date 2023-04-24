import { HttpClient } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [],
})
export class FormComponent implements OnInit {
  static tagNamePrefix: string = 'my-form';
  static httpCopy;
  @ViewChild('container') container;
  @Output() when200 = new EventEmitter();
  @Output() when500 = new EventEmitter();
  formgroup = 'name';
  api =
    'https://www.fastmock.site/mock/14c2723aefa052a75b2a6feeed0cf387/suger/records';
  constructor(private http: HttpClient) {
    FormComponent.httpCopy = http;
  }
  submit() {
    // 获取form的有效子节点
    let native = this.container.nativeElement,
      controlElements = native.querySelectorAll('[formcontrol]');
    let valids = [],
      params = [],
      values = [];
    [...controlElements].forEach((el) => {
      valids.push(el._ngElementStrategy.componentRef.instance.isValid());
      params.push(el.getAttribute('formcontrol'));
      let control = el._ngElementStrategy.componentRef.instance.value;
      if (control instanceof FormControl) {
        values.push(control.value);
      } else {
        values.push(control);
      }
    });
    this.http.get(this.api).subscribe(
      (res: any) => {
        const { code, data } = res;
        if (code === 200) {
          this['when200'].emit(data);
        } else if (code === 500) {
          this['when500'].emit(data);
        }
      },
      () => {
        this['when500'].emit('error');
      }
    );
  }
  ngOnInit(): void {}
  static extends(option): { html: string; js: string } {
    // web component 的索引不能递增，因为索引重置后会重复，而且cache后apply会有冲突。
    const index = String(Math.random()).substring(2),
      tagName = `${FormComponent.tagNamePrefix}-${index}`;
    const { html: config, css, className } = option,
      { formgroup, api } = config;
    return {
      html: `<${tagName} _data="_ngElementStrategy.componentRef.instance" _methods="_ngElementStrategy.componentRef.instance"></${tagName}>`,
      js: `class MyForm${index} extends ${className}{
               constructor(){
                   super(FormComponent.httpCopy);
                   this.formgroup = '${formgroup.value}';
                   this.api = '${api.value}';
               }
           }
           MyForm${index}.ɵcmp.factory = ()=>{return new ${className}};
           customElements.define('${tagName}',createCustomElement(MyForm${index}, {  injector: injector,}));
           `,
    };
  }
}
