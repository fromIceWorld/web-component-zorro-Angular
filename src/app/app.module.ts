import { HttpClientModule } from '@angular/common/http';
import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { ButtonComponent } from './button/button.component';
import { DialogComponent } from './dialog/dialog.component';
import { HookComponent } from './hook/hook.component';
import { IconComponent } from './icon/icon.component';
import { ImageComponent } from './image/image.component';
import { InputComponent } from './input/input.component';
import { PaginationComponent } from './pagination/pagination.component';
import { RadioComponent } from './radio/radio.component';
import { RequestComponent } from './request/request.component';
import { SelectComponent } from './select/select.component';
import { TableComponent } from './table/table.component';
import { TagComponent } from './tag/tag.component';
import { TextComponent } from './text/text.component';

// 引入全部的图标，不推荐 ❌
import * as AllIcons from '@ant-design/icons-angular/icons';
import { AppComponent } from './app.component';
import { TabsComponent } from './tabs/tabs.component';

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(
  (key) => antDesignIcons[key]
);
// 暴露出源组件class 创建web component的API
window['createCustomElement'] = createCustomElement;

@NgModule({
  declarations: [
    ButtonComponent,
    DialogComponent,
    InputComponent,
    RadioComponent,
    TextComponent,
    TableComponent,
    RequestComponent,
    IconComponent,
    SelectComponent,
    ImageComponent,
    HookComponent,
    PaginationComponent,
    TagComponent,
    TabsComponent,
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NzButtonModule,
    NzRadioModule,
    NzSelectModule,
    NzInputModule,
    NzIconModule.forRoot(icons),
    NzTagModule,
    NzSwitchModule,
    HttpClientModule,
    NzModalModule,
    ReactiveFormsModule,
    NzTableModule,
    BrowserAnimationsModule,
    NzPaginationModule,
    NzTabsModule,
  ],
  providers: [],
  bootstrap: [],
  schemas: [],
  entryComponents: [AppComponent],
})
export class AppModule {
  constructor(private injector: Injector) {
    //@ts-ignore
    window.injector = this.injector;
  }
  // }
  registerEl(tagName, cla) {
    // 解决 extends 的组件无依赖问题
    const oldIframe = document.querySelector('iframe');
    let iframe;
    if (!oldIframe) {
      iframe = document.createElement('iframe');
      iframe.style.display = 'none';
    } else {
      iframe = oldIframe;
    }
    let com = document.createElement(tagName);
    iframe.append(com);
    if (!oldIframe) {
      document.body.append(iframe);
    }
    if (customElements.get(tagName)) {
      console.warn('企图注册相同名称的标签:', tagName);
    } else {
      //定义组件
      customElements.define(tagName, cla);
    }
  }
  // TODO:依赖注入只会注入到源组件上，在extends的组件上无依赖注入能力。
  // 因此如果想要有依赖注入能力，需要手动将源组件的依赖在实例化子组件时注入到源组件super中。
  ngDoBootstrap() {
    // 按钮
    const appRoot = createCustomElement(AppComponent, {
      injector: this.injector,
    });
    // 将 AppComponent挂载到html中以初始化当前应用
    this.registerEl('my-angular', appRoot);

    // // 注册组件到全局
    // console.log(this.injector);
    // // 按钮
    // window['ButtonComponent'] = ButtonComponent;
    // // const buttonEle = createCustomElement(ButtonComponent, {
    // //   injector: this.injector,
    // // });
    // // this.registerEl('my-button', buttonEle);
    // // 文本
    // window['TextComponent'] = TextComponent;
    // // const textEle = createCustomElement(TextComponent, {
    // //   injector: this.injector,
    // // });
    // // this.registerEl('my-text', textEle);
    // // dialog
    // window['DialogComponent'] = DialogComponent;
    // // const dialogEl = createCustomElement(DialogComponent, {
    // //   injector: this.injector,
    // // });
    // // this.registerEl('my-dialog', dialogEl);
    // // radio
    // window['RadioComponent'] = RadioComponent;
    // // const radioEl = createCustomElement(RadioComponent, {
    // //   injector: this.injector,
    // // });
    // // this.registerEl('my-radio', radioEl);
    // // input
    // window['InputComponent'] = InputComponent;
    // // const inputEl = createCustomElement(InputComponent, {
    // //   injector: this.injector,
    // // });
    // // this.registerEl('my-input', inputEl);
    // // table
    // window['TableComponent'] = TableComponent;
    // // const tableEl = createCustomElement(TableComponent, {
    // //   injector: this.injector,
    // // });
    // // this.registerEl('my-table', tableEl);
    // // api
    // window['RequestComponent'] = RequestComponent;
    // // const APIEl = createCustomElement(RequestComponent, {
    // //   injector: this.injector,
    // // });
    // // this.registerEl('my-api', APIEl);
    // // icon
    // window['IconComponent'] = IconComponent;
    // // const IconEl = createCustomElement(IconComponent, {
    // //   injector: this.injector,
    // // });
    // // this.registerEl('my-icon', IconEl);
    // // select
    // window['SelectComponent'] = SelectComponent;
    // // const SelectEl = createCustomElement(SelectComponent, {
    // //   injector: this.injector,
    // // });
    // // this.registerEl('my-select', SelectEl);
    // // IMAGE
    // window['ImageComponent'] = ImageComponent;
    // // const ImageEl = createCustomElement(ImageComponent, {
    // //   injector: this.injector,
    // // });
    // // this.registerEl('my-image', ImageEl);
    // // hook
    // window['HookComponent'] = HookComponent;
    // // const HookEl = createCustomElement(HookComponent, {
    // //   injector: this.injector,
    // // });
    // // this.registerEl('my-hook', HookEl);
    // // Pagination
    // window['PaginationComponent'] = PaginationComponent;
    // // const PaginationEl = createCustomElement(PaginationComponent, {
    // //   injector: this.injector,
    // // });
    // // this.registerEl('my-pagination', PaginationEl);
    // // tags
    // window['TagComponent'] = TagComponent;
    // // const TagEl = createCustomElement(TagComponent, {
    // //   injector: this.injector,
    // // });
    // // this.registerEl('my-tag', TagEl);
  }
}
