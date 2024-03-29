import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { createCustomElementHsh } from 'src/common/hash';
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
export class DialogComponent {
  @Output('onVisible') onVisible = new EventEmitter();
  @Output('onHiden') onHiden = new EventEmitter();
  @Output('onVisibleChange') onVisibleChange = new EventEmitter();
  @ViewChild('model') model;
  @ViewChild('content') content;
  static tagNamePrefix: string = 'my-dialog';
  title: string = '对话框';
  width = 800;
  height = 800;
  display: boolean = false;
  constructor(private cd: ChangeDetectorRef) {}
  close(e) {
    this.hiden();
  }
  handleCancel() {}
  handleOk() {}
  private changeState(target: boolean) {
    this.display = target;
    if (target) {
      this.onVisible.emit();
    } else {
      this.onHiden.emit();
    }
    this.onVisibleChange.emit();
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
    this.onVisible.emit();
    this.onVisibleChange.emit();
  }
  public hiden() {
    this.changeState(false);
    this.onHiden.emit();
    this.onVisibleChange.emit();
  }
  static extends(option) {
    const { html, className } = option;
    // web component 的索引不能递增，因为索引重置后会重复，而且cache后apply会有冲突。
    const index = String(Math.random()).substring(2),
      tagName = `${DialogComponent.tagNamePrefix}-${index}`;
    const { title, width, height } = html[0].config;
    return {
      html: `<${tagName} _data="_ngElementStrategy.componentRef.instance" 
                         _methods="_ngElementStrategy.componentRef.instance"></${tagName}>`,
      js: `class MyDialogModel${index} extends ${className}{
             constructor(){
                super();
                this.title = '${title.value}';
                this.width = '${width.value}${width.postfix}';
                this.height = '${height.value}${height.postfix}';
             }
           }
           MyDialogModel${index}.ɵcmp = {
            ...MyDialogModel${index}.ɵcmp,
            factory:() => { return new MyDialogModel${index}()},
           };
           (()=>{
              let angularClass = ${createCustomElementHsh}(MyDialogModel${index}, {  injector: injector,});
              class customClass extends angularClass{
                constructor(){
                  super();
                }
                check(){
                  // extends的class 无法依赖注入cd,只能自己查找
                  let cd = this._ngElementStrategy;
                  cd.detectChanges();
                }
                get instance(){
                  return this._ngElementStrategy.componentRef.instance
                }
                visibleChange() {
                  if (this.instance.display) {
                    this.hiden();
                  } else {
                    this.visible();
                  }
                }
                visible() {
                  this.instance.changeState(true);   
                  this.check();
                }
                hiden() {
                  this.instance.changeState(false);
                  this.check();
                }
                get title() {
                  return this.instance.title;
                }
                set title(value) {
                  this.instance.title = value;
                  this.check();
                }
              }  
              customElements.get('${tagName}') || customElements.define('${tagName}',customClass);
          })();
                 `,
    };
  }
}
