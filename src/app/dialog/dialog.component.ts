import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { customWebComponent, transformValue } from 'src/common';
import { config } from 'src/decorators/config';
import { TextService } from '../text.service';
import { DIALOG_CONFIG } from './dialog-config';

@config(DIALOG_CONFIG)
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  providers: [TextService, NzModalService],
  viewProviders: [TextService],
})
export class DialogComponent extends customWebComponent implements OnInit {
  @ViewChild('model') model;
  @ViewChild('content') content;
  static tagNamePrefix: string = 'my-dialog';
  title: string = '对话框';
  display: boolean = false;
  classStr;
  left;
  top;
  constructor() {
    super();
  }
  close(e) {
    this.hiden();
  }
  private changeState(target: boolean) {
    this.display = !!target;
    this.cd.detectChanges();
  }
  public visibleChange() {
    if (this.display) {
      this.hiden();
    } else {
      this.visible();
    }
  }
  public visible() {
    this.changeState(true);
    let html = document.querySelector('html');
    this.classStr = html.getAttribute('class');
    this.left = html.style.left;
    this.top = html.style.top;
    console.log(this.content);
    // this.model.modal.open();
  }
  public hiden() {
    this.changeState(false);
  }
  static extends(option) {
    const { html, css, className } = option;
    // web component 的索引不能递增，因为索引重置后会重复，而且cache后apply会有冲突。
    const index = String(Math.random()).substring(2),
      tagName = `${DialogComponent.tagNamePrefix}-${index}`;
    let config = {};
    Object.keys(html).map((key) => {
      config[key] = transformValue(html[key]);
    });
    return {
      html: `<${tagName} _data="_ngElementStrategy.componentRef.instance" 
                         _methods="_ngElementStrategy.componentRef.instance"></${tagName}>`,
      js: `class MyDialogModel${index} extends ${className}{
             constructor(){
                super();
             }
           }
           MyDialogModel${index}.ɵcmp.factory = () => { return new MyDialogModel${index}()};
           (()=>{
              let customEl = createCustomElement(MyDialogModel${index}, {  injector: injector,});
              // 添加用户自定义数据
              Object.defineProperty(customEl.prototype,'option',{
                get(){
                  return ${JSON.stringify(config)}
                },
                configurable: false,
                enumerable: false
              })
              customElements.define('${tagName}',customEl);
          })();
                 `,
    };
  }
  ngOnInit(): void {
    this.applyData();
  }
}
