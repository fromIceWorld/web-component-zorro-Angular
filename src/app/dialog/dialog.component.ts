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
  static index = 0;
  static tagNamePrefix: string = 'my-dialog-model';
  title: string = '对话框';
  display: boolean = false;
  classStr;
  left;
  top;
  constructor(
    private ser: TextService,
    private cd: ChangeDetectorRef,
    private ms: NzModalService
  ) {
    console.log(NzModalService, 'service', this.ser, this.ms);
  }
  close(e) {
    this.hiden();
  }
  ngDoCheck() {
    console.log('ngDoCheck');
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
    // this.model.viewContainerRef.remove();
    // let expendArea = document.querySelectorAll('.cdk-overlay-container'),
    //   html = document.querySelector('html'),
    //   classStr = html.getAttribute('class');
    // html.setAttribute('class', classStr.replace('cdk-global-scrollblock', ''));
    // html.style.setProperty('left', this.left);
    // html.style.setProperty('top', this.top);
    // expendArea.forEach((e) => (e.innerHTML = ''));
    this.model.modal.openModals[0]._finishDialogClose();
  }
  static extends(option) {
    const { html, css, className } = option;
    const index = DialogComponent.index++,
      tagName = `${DialogComponent.tagNamePrefix}-${index}`;
    const { title } = html;
    const { style, classes } = css,
      flexDirection = style['flex-direction'];
    return {
      html: `<${tagName} pre="_ngElementStrategy.componentRef.instance" style="display:flex;'flex-direction:${flexDirection}"></${tagName}>`,
      js: `class MyDialogModel${index} extends ${className}{
             constructor(){
                super();
                this.title = '${title.value}';
             }
           }
           MyDialogModel${index}.ɵcmp.factory = () => { return new MyDialogModel${index}()};
           customElements.define('${tagName}',createCustomElement(MyDialogModel${index},{injector}));
                 `,
    };
  }
  ngOnInit(): void {}
}
