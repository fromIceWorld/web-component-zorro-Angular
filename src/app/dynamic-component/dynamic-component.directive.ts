import {
  AfterContentInit,
  Directive,
  ElementRef,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appDynamicComponent]',
})
export class DynamicComponentDirective implements AfterContentInit {
  @Input('tagNames') tagNames = [];
  @Input('input') config = null;
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}
  ngAfterContentInit(): void {
    // 批量创建组件slot
    (this.tagNames || []).forEach((tagName) => {
      const dom = this.renderer.createElement(tagName);
      this.elementRef.nativeElement.appendChild(dom);
      // 当出入的配置项是空时，不讲数据注入slot中，否则同类的组件注入同类的数据，会一样
      if (this.config == null || this.config == undefined) {
        return;
      }
      dom.setAttribute('input', JSON.stringify(this.config));
    });

    // let dom = document.createElement(this.tagName);
    // console.log(
    //   '指令',
    //   dom,
    //   this,
    //   this.tagName,
    //   this.renderer,
    //   this.elementRef
    // );
  }
}
