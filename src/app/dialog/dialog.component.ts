import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
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
export class DialogComponent implements OnInit {
  @ViewChild('model') model;
  @ViewChild('content') content;
  static tagNamePrefix: string = 'my-dialog';
  title: string = '对话框';
  display: boolean = false;
  classStr;
  left;
  top;
  constructor(private cd: ChangeDetectorRef) {}
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
    const { title } = html;
    const { style, classes } = css,
      flexDirection = style['flex-direction'];
    return {
      html: `<${tagName} _data="_ngElementStrategy.componentRef.instance" 
                         _methods="_ngElementStrategy.componentRef.instance"
                         style="display:flex;'flex-direction:${flexDirection}"></${tagName}>`,
      js: `class MyDialogModel${index} extends ${className}{
             constructor(){
                super();
                this.title = '${title.value}';
                this.dep();
             }
             dep(){
              setTimeout(()=>{
                this.cd = this['__ngContext__'][13][0]._ngElementStrategy.componentRef.changeDetectorRef;
              });
            }
           }
           MyDialogModel${index}.ɵcmp.factory = () => { return new MyDialogModel${index}()};
           customElements.define('${tagName}',createCustomElement(MyDialogModel${index},{injector}));
                 `,
    };
  }
  ngOnInit(): void {}
}
