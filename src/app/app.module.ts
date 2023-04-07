import {
  HttpClient,
  HttpClientModule,
  HttpHandler,
} from '@angular/common/http';
import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { ButtonComponent } from './button/button.component';
import { ContainerComponent } from './container/container.component';
import { DialogComponent } from './dialog/dialog.component';
import { FormComponent } from './form/form.component';
import { InputComponent } from './input/input.component';
import { RadioComponent } from './radio/radio.component';
import { RequestComponent } from './request/request.component';
import { TableComponent } from './table/table.component';
import { TestService } from './test.service';
import { TextComponent } from './text/text.component';
// 暴露出源组件class 创建web component的API
window['createCustomElement'] = createCustomElement;
window['HttpClient'] = HttpClient;
window['HttpHandler'] = HttpHandler;

@NgModule({
  declarations: [
    ButtonComponent,
    DialogComponent,
    ContainerComponent,
    InputComponent,
    RadioComponent,
    TextComponent,
    FormComponent,
    TableComponent,
    RequestComponent,
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
    ReactiveFormsModule,
    NzTableModule,
  ],
  providers: [HttpClient, TestService],
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
    TableComponent,
    RequestComponent,
  ],
})
export class AppModule {
  injector;
  constructor(
    private parentInjector: Injector,
    private http: HttpClient,
    private formBuilder: FormBuilder // private cd: ChangeDetectorRef
  ) {
    this.injector = Injector.create({
      providers: [
        { provide: TestService, deps: [] },
        { provide: 'http', useValue: this.http, deps: [] },
        // { provide: 'cd', useValue: this.cd, deps: [] },
        { provide: 'formBuilder', useValue: this.formBuilder, deps: [] },
      ],
      parent: this.parentInjector,
    });
    window['injector'] = this.injector; // 暴露出依赖
    console.log(this.http, this.injector.get(TestService));
  }
  registerEl(tagName, cla) {
    if (customElements.get(tagName)) {
      console.warn('企图注册相同名称的标签:', tagName);
    } else {
      customElements.define(tagName, cla);
    }
  }
  ngDoBootstrap() {
    // 注册组件到全局
    console.log(this.injector);
    // 按钮
    window['ButtonComponent'] = ButtonComponent;
    const buttonEle = createCustomElement(ButtonComponent, {
      injector: this.injector,
    });
    this.registerEl('my-button', buttonEle);
    // 文本
    window['TextComponent'] = TextComponent;
    const textEle = createCustomElement(TextComponent, {
      injector: this.injector,
    });
    this.registerEl('my-text', textEle);
    // layout
    window['ContainerComponent'] = ContainerComponent;
    const containerEle = createCustomElement(ContainerComponent, {
      injector: this.injector,
    });
    this.registerEl('my-container', containerEle);

    // dialog
    window['DialogComponent'] = DialogComponent;
    const dialogEl = createCustomElement(DialogComponent, {
      injector: this.injector,
    });
    this.registerEl('my-dialog', dialogEl);
    // radio
    window['RadioComponent'] = RadioComponent;
    const radioEl = createCustomElement(RadioComponent, {
      injector: this.injector,
    });
    this.registerEl('my-radio', radioEl);
    // input
    window['InputComponent'] = InputComponent;
    const inputEl = createCustomElement(InputComponent, {
      injector: this.injector,
    });
    this.registerEl('my-input', inputEl);
    // form
    window['FormComponent'] = FormComponent;
    const formEl = createCustomElement(FormComponent, {
      injector: this.injector,
    });
    this.registerEl('my-form', formEl);
    // form
    window['TableComponent'] = TableComponent;
    const tableEl = createCustomElement(TableComponent, {
      injector: this.injector,
    });
    this.registerEl('my-table', tableEl);
    // api
    window['test'] = 'test';
    window['APIComponent'] = RequestComponent;
    const APIEl = createCustomElement(RequestComponent, {
      injector: this.injector,
    });
    this.registerEl('my-api', APIEl);
  }
}
