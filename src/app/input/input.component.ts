import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

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
  value = new FormControl('');
  isFocus: boolean = false;
  Validators = Validators;
  placeholder: string = '请输入姓名';
  borderColorShdow() {
    let obj = {
      'border-color': '#d9d9d9',
      'box-shadow': 'none',
    };
    if (this.value.touched) {
      if (this.isFocus) {
        if (this.value.valid) {
          obj['border-color'] = '#40a9ff';
          obj['box-shadow'] = '0 0 0 2px rgb(24 144 255 / 20%)';
        } else {
          obj['border-color'] = '#d34848';
          obj['box-shadow'] = '0 0 0 2px rgb(211 72 72 / 20%)';
        }
      } else {
        if (!this.value.valid) {
          obj['border-color'] = '#d34848';
          obj['box-shadow'] = '0 0 0 2px rgb(211 72 72 / 20%)';
        }
      }
    }
    return obj;
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
    this.value.patchValue('');
    this.cd.detectChanges();
    console.log(this.value.valid);
  }
  constructor(private cd: ChangeDetectorRef) {}
  static extends(option) {
    const { html, css, className } = option;
    const index = InputComponent.index++,
      tagName = `${InputComponent.tagNamePrefix}-${index}`;
    const { placeholder, formcontrol, value, updateOn, regexp } = html;
    let config = {
      html: `<${tagName}
                    type="text"
                    placeholder="${placeholder.value}"
                    formcontrol="${formcontrol.value}"
               ></${tagName}>`,
      js: `class MyInput${index} extends ${className}{
            constructor(){
                super();
                this.value.reset('${value.value}',{
                  updateOn:'${updateOn.value}',
                });
                this.value.setValidators([this.Validators.pattern(${regexp.value}),this.Validators.required]);
                this.value.updateValueAndValidity();
                this.value.statusChanges.subscribe((res)=>{
                  if(res === 'VALID'){
                    this.validateTrue.emit();
                  }else{
                    this.validateFalse.emit();
                  }
                })
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
