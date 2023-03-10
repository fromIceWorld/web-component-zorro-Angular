import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
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
export class InputComponent implements OnInit {
  static index = 0;
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
    this.cd.detectChanges();
  }
  onBlur() {
    this.isFocus = false;
    this.cd.detectChanges();
  }
  clear() {
    this.control.patchValue('');
    this.cd.detectChanges();
  }
  constructor(private cd: ChangeDetectorRef) {}
  borderColorShdow() {
    let obj = {
      'border-color': '#d9d9d9',
      'box-shadow': 'none',
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
    const { html, css, className } = option;
    const index = InputComponent.index++,
      tagName = `${InputComponent.tagNamePrefix}-${index}`;
    const { placeholder, formcontrol, value, updateOn, regexp } = html;
    let config = {
      html: `<${tagName} pre="_ngElementStrategy.componentRef.instance"
                    type="text" 
               ></${tagName}>`,
      js: `class MyInput${index} extends ${className}{
            constructor(){
                super();
                this.placeholder="${placeholder.value}"
                this.control.reset('${value.value}',{
                  updateOn:'${updateOn.value}',
                });
                this.control.setValidators([this.Validators.pattern(${regexp.value}),this.Validators.required]);
                this.control.updateValueAndValidity();
                this.control.statusChanges.subscribe((res)=>{
                  if(res === 'VALID'){
                    this.validateTrue.emit();
                  }else{
                    this.validateFalse.emit();
                  }
                })
             }
             get value() {
               return {${formcontrol.value}:this.control.value};
             }
             set value(target) {
               this.control.setValue(target);
             }
        };
        MyInput${index}.ɵcmp.factory = () => { return new MyInput${index}()};
        customElements.define('${tagName}',createCustomElement(MyInput${index}, {  injector: injector,}));
        `,
    };
    return config;
  }
  ngOnInit(): void {}
}
