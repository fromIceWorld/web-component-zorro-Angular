import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  static index = 0;
  static tagNamePrefix: string = 'my-form';
  formgroup = 'name';
  api =
    'https://www.fastmock.site/mock/14c2723aefa052a75b2a6feeed0cf387/suger/records';
  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {}
  static extends(option): { html: string; js: string } {
    const index = FormComponent.index++,
      tagName = `${FormComponent.tagNamePrefix}-${index}`;
    const { html: config, css, className } = option,
      { formgroup, api } = config;
    return {
      html: `<${tagName}></${tagName}>`,
      js: `class MyForm${index} extends ${className}{
               constructor(){
                   super();
                   this.formgroup = '${formgroup.value}';
                   this.api = '${api.value}';
               }
           }
           MyForm${index}.ɵcmp.factory = () => { return new MyForm${index}()};
           customElements.define('${tagName}',createCustomElement(MyForm${index}, {  injector: injector,}));
           `,
    };
  }
}
