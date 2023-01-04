import { HttpClientModule } from '@angular/common/http';
import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { ButtonComponent } from './button/button.component';
import { ContainerComponent } from './container/container.component';
import { DialogComponent } from './dialog/dialog.component';
import { FormComponent } from './form/form.component';
import { InputComponent } from './input/input.component';
import { RadioComponent } from './radio/radio.component';
import { TextComponent } from './text/text.component';
import { registerComponent } from './view-nodes';
// 暴露出源组件class 创建web component的API
window['createCustomElement'] = createCustomElement;

window['ButtonComponent'] = ButtonComponent;

@NgModule({
  declarations: [
    ButtonComponent,
    DialogComponent,
    ContainerComponent,
    InputComponent,
    RadioComponent,
    TextComponent,
    FormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NzButtonModule,
    NzRadioModule,
    NzSelectModule,
    NzInputModule,
    NzIconModule,
    NzTagModule,
    NzSwitchModule,
    HttpClientModule,
    NzModalModule,
  ],
  providers: [],
  bootstrap: [],
  schemas: [],
  entryComponents: [
    ButtonComponent,
    DialogComponent,
    ContainerComponent,
    InputComponent,
    RadioComponent,
    TextComponent,
    FormComponent,
  ],
})
export class AppModule {
  constructor(private injector: Injector) {
    window['injector'] = this.injector; // 暴露出依赖
  }
  ngDoBootstrap() {
    // 注册组件到全局
    registerComponent();
    // 按钮
    const buttonEle = createCustomElement(ButtonComponent, {
      injector: this.injector,
    });
    customElements.define('my-button', buttonEle);
    // 文本
    window['TextComponent'] = TextComponent;
    const textEle = createCustomElement(TextComponent, {
      injector: this.injector,
    });
    customElements.define('my-text', textEle);
    // layout
    window['ContainerComponent'] = ContainerComponent;
    const containerEle = createCustomElement(ContainerComponent, {
      injector: this.injector,
    });
    customElements.define('my-container', containerEle);
    // dialog
    window['DialogComponent'] = DialogComponent;
    const dialogEl = createCustomElement(DialogComponent, {
      injector: this.injector,
    });
    customElements.define('my-dialog', dialogEl);
    // radio
    window['RadioComponent'] = RadioComponent;
    const radioEl = createCustomElement(RadioComponent, {
      injector: this.injector,
    });
    customElements.define('my-radio', radioEl);
    // input
    window['InputComponent'] = InputComponent;
    const inputEl = createCustomElement(InputComponent, {
      injector: this.injector,
    });
    customElements.define('my-input', inputEl);
    // form
    window['FormComponent'] = FormComponent;
    const formEl = createCustomElement(FormComponent, {
      injector: this.injector,
    });
    customElements.define('my-form', formEl);
  }
}
