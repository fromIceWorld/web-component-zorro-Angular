import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { config } from 'src/decorators/config';
import { INPUT_CONFIG } from './input-config';
@config(INPUT_CONFIG)
@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent {
  static tagNamePrefix: string = 'my-input';
  @Output('validateTrue') validateTrue = new EventEmitter();
  @Output('validateFalse') validateFalse = new EventEmitter();
  control = new FormControl('');
  isFocus: boolean = false;
  Validators = Validators;
  placeholder: string = '请输入姓名';
  isValid() {
    return this.control.valid;
  }
  onFocus() {
    this.isFocus = true;
  }
  onBlur() {
    this.isFocus = false;
  }
  clear() {
    this.control.patchValue('');
  }
  constructor(private cd: ChangeDetectorRef) {}
  borderColorShdow() {
    let obj = {
      'border-color': '#d9d9d9',
      'box-shadow': 'none',
      width: '240px',
    };
    if (this.control.touched) {
      if (this.isFocus) {
        if (this.control.valid) {
          obj['border-color'] = '#40a9ff';
          obj['box-shadow'] = '0 0 0 2px rgb(24 144 255 / 20%)';
        } else {
          obj['border-color'] = '#d34848';
          obj['box-shadow'] = '0 0 0 2px rgb(211 72 72 / 20%)';
        }
      } else {
        if (!this.control.valid) {
          obj['border-color'] = '#d34848';
          obj['box-shadow'] = '0 0 0 2px rgb(211 72 72 / 20%)';
        }
      }
    }
    return obj;
  }
  static extends(option) {
    const { html, className } = option;
    // web component 的索引不能递增，因为索引重置后会重复，而且cache后apply会有冲突。
    const index = String(Math.random()).substring(2),
      tagName = `${InputComponent.tagNamePrefix}-${index}`;
    const { placeholder, value } = html[0].config,
      { formcontrol, regexp, updateOn } = html[1].config;
    let config = {
      html: `<${tagName} _data="_ngElementStrategy.componentRef.instance" _methods="_ngElementStrategy.componentRef.instance"
                    type="text" 
               ></${tagName}>`,
      js: `class MyInput${index} extends ${className}{
            constructor(){
                super();
                this.placeholder="${placeholder.value}"
                this.control.reset('${value.value}',{
                  updateOn:'${updateOn.value}'
                });
                ${
                  updateOn.value
                    ? 'this.control.setValidators([this.Validators.pattern(' +
                      regexp.value +
                      '),this.Validators.required]);'
                    : ''
                }
                this.control.updateValueAndValidity();
                this.control.statusChanges.subscribe((res)=>{
                  if(res === 'VALID'){
                    this.validateTrue.emit();
                  }else{
                    this.validateFalse.emit();
                  }
                });
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
             validate(){
               this.control.updateValueAndValidity();
             }
             clear(){
               this.value = '';
               this.check();
             }
             get value() {
               return {${formcontrol.value}:this.control.value};
             }
             set value(target) {
               this.control.setValue(target);
               this.check();
             }
             get validateValue() {
               return {
                ${formcontrol.value}:this.control.value,
                _valid:this.isValid()
              };
             }
        };
        MyInput${index}.ɵcmp.factory = () => { return new MyInput${index}()};
        (()=>{
            let customEl = createCustomElement(MyInput${index}, {  injector: injector,});
            customElements.get('${tagName}') || customElements.define('${tagName}',customEl);
        })();`,
    };
    return config;
  }
}
