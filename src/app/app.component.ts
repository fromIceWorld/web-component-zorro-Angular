import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  Injector,
  OnInit,
  ViewRef,
  ɵɵgetCurrentView,
} from '@angular/core';
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

@Component({
  selector: 'app-angular',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  injector;
  constructor(
    private cd: ChangeDetectorRef,
    private parentInjector: Injector,
    private http: HttpClient
  ) {
    this.injector = Injector.create({
      providers: [
        { provide: 'http', useValue: this.http, deps: [] },
        { provide: 'cd', useValue: this.cd, deps: [] },
        { provide: HttpClient, useValue: this.http, deps: [] },
      ],
      parent: this.parentInjector,
    });
    //@ts-ignore
    window.injector = this.injector;
    console.log(ɵɵgetCurrentView(), ViewRef);
  }
  ngOnInit(): void {
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
  }
}
