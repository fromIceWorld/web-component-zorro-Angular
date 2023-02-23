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
  static index = 0;
  static tagNamePrefix: string = 'my-form';
  @ViewChild('container') container;
  @Output() when200 = new EventEmitter();
  @Output() when500 = new EventEmitter();
  formgroup = 'name';
  api =
    'https://www.fastmock.site/mock/14c2723aefa052a75b2a6feeed0cf387/suger/records';
  constructor(private http: HttpClient) {}
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
    console.log(valids, values);
    this.http.get(this.api).subscribe(
      (res: any) => {
        const { code, data } = res;
        if (code === 200) {
          console.log('200', this['when200']);
          this['when200'].emit(data);
        } else if (code === 500) {
          console.log('500', this['when500']);
          this['when500'].emit(data);
        }
      },
      () => {
        console.log('error', this['when500']);
        this['when500'].emit('error');
      }
    );
  }
  ngOnInit(): void {}
  static extends(option): { html: string; js: string } {
    const index = FormComponent.index++,
      tagName = `${FormComponent.tagNamePrefix}-${index}`;
    const { html: config, css, className } = option,
      { formgroup, api } = config;
    return {
      html: `<${tagName} pre="_ngElementStrategy.componentRef.instance"></${tagName}>`,
      js: `class MyForm${index} extends ${className}{
               constructor(){
                   super();
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
