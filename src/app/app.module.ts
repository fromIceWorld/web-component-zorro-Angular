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
import { RouterComponent } from './router/router.component';

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(
  (key) => antDesignIcons[key]
);

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
    RouterComponent,
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
  constructor(private injector: Injector) {}
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
    //@ts-ignore
    window.injector = this.injector;
    // 按钮
    const appRoot = createCustomElement(AppComponent, {
      injector: this.injector,
    });
    // 将 AppComponent挂载到html中以初始化当前应用
    this.registerEl('my-angular-ng-zorro', appRoot);
  }
}
