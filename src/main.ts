import { Injector, enableProdMode } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { ButtonComponent } from './app/button/button.component';
import { DialogComponent } from './app/dialog/dialog.component';
import { HookComponent } from './app/hook/hook.component';
import { IconComponent } from './app/icon/icon.component';
import { ImageComponent } from './app/image/image.component';
import { InputComponent } from './app/input/input.component';
import { PaginationComponent } from './app/pagination/pagination.component';
import { RadioComponent } from './app/radio/radio.component';
import { RequestComponent } from './app/request/request.component';
import { RouterComponent } from './app/router/router.component';
import { SelectComponent } from './app/select/select.component';
import { TableComponent } from './app/table/table.component';
import { TagComponent } from './app/tag/tag.component';
import { TextComponent } from './app/text/text.component';
import { createCustomElementHsh } from './common/hash';
import { environment } from './environments/environment';
//@ts-ignore
window.injector = Injector.create({
  name: 'ng-zorro应用依赖',
  parent: null,
  providers: [],
});
// 暴露出源组件class 创建web component的API
// TODO: createCustomElementHsh 使为了避免在未隔离的环境中运行不同的createCustomElement函数，因为版本导致的冲突
window[createCustomElementHsh] = createCustomElement;
if (environment.production) {
  enableProdMode();
}
//TODO: 不能在组件中的生命周期内 将组件注册到全局，因为应用中部分引导过程是异步的，会导致使用时找不到
// 注册组件到全局
// 按钮
window['ButtonComponent'] = ButtonComponent;
// const buttonEle = createCustomElement(ButtonComponent, {
//   injector: this.injector,
// });
// this.registerEl('my-button', buttonEle);
// 文本
window['TextComponent'] = TextComponent;
// const textEle = createCustomElement(TextComponent, {
//   injector: this.injector,
// });
// this.registerEl('my-text', textEle);
// dialog
window['DialogComponent'] = DialogComponent;
// const dialogEl = createCustomElement(DialogComponent, {
//   injector: this.injector,
// });
// this.registerEl('my-dialog', dialogEl);
// radio
window['RadioComponent'] = RadioComponent;
// const radioEl = createCustomElement(RadioComponent, {
//   injector: this.injector,
// });
// this.registerEl('my-radio', radioEl);
// input
window['InputComponent'] = InputComponent;
// const inputEl = createCustomElement(InputComponent, {
//   injector: this.injector,
// });
// this.registerEl('my-input', inputEl);
// table
window['TableComponent'] = TableComponent;
// const tableEl = createCustomElement(TableComponent, {
//   injector: this.injector,
// });
// this.registerEl('my-table', tableEl);
// api
window['RequestComponent'] = RequestComponent;
window['RouterComponent'] = RouterComponent;
// const APIEl = createCustomElement(RequestComponent, {
//   injector: this.injector,
// });
// this.registerEl('my-api', APIEl);
// icon
window['IconComponent'] = IconComponent;
// const IconEl = createCustomElement(IconComponent, {
//   injector: this.injector,
// });
// this.registerEl('my-icon', IconEl);
// select
window['SelectComponent'] = SelectComponent;
// const SelectEl = createCustomElement(SelectComponent, {
//   injector: this.injector,
// });
// this.registerEl('my-select', SelectEl);
// IMAGE
window['ImageComponent'] = ImageComponent;
// const ImageEl = createCustomElement(ImageComponent, {
//   injector: this.injector,
// });
// this.registerEl('my-image', ImageEl);
// hook
window['HookComponent'] = HookComponent;
// const HookEl = createCustomElement(HookComponent, {
//   injector: this.injector,
// });
// this.registerEl('my-hook', HookEl);
// Pagination
window['PaginationComponent'] = PaginationComponent;
// const PaginationEl = createCustomElement(PaginationComponent, {
//   injector: this.injector,
// });
// this.registerEl('my-pagination', PaginationEl);
// tags
window['TagComponent'] = TagComponent;
// const TagEl = createCustomElement(TagComponent, {
//   injector: this.injector,
// });
// this.registerEl('my-tag', TagEl);
console.log('开始加载Angular@10.2.5 + ng-zorro-antd@10.2.2应用。');
platformBrowserDynamic()
  .bootstrapModule(AppModule, {
    // ngZone: 'noop',
  })
  .then(() => {
    console.log('Angular@10.2.5 + ng-zorro-antd@10.2.2应用加载完成。');
  })
  .catch((err) => console.error(err));
