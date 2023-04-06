import { Component, OnInit } from '@angular/core';
import { config } from 'src/decorators/config';
import { CONTAINER_CONFIG } from './container-config';
@config(CONTAINER_CONFIG)
@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css'],
})
export class ContainerComponent implements OnInit {
  static index = 0;
  static tagNamePrefix: string = 'my-container';
  constructor() {}
  static extends(option) {
    const { html, css } = option;
    const index = ContainerComponent.index++,
      tagName = `${ContainerComponent.tagNamePrefix}-${index}`;
    const { style, width, height } = css;
    const flexDirection = style['flex-direction'];
    let styleStr = '';
    if (flexDirection) {
      styleStr = 'display:flex;';
      styleStr += `flex-direction:${flexDirection};`;
    }
    for (let [key, value] of Object.entries(css)) {
      if (key == 'style') {
        continue;
      }
      if (
        css['border'] &&
        css['border'].value &&
        ['border-width', 'border-style', 'border-color'].includes(key)
      ) {
        // @ts-ignore
        styleStr += `${key}:${value.value}${value.postfix || ''};`;
      }
      if (
        [
          'padding-top',
          'padding-right',
          'padding-bottom',
          'padding-left',
        ].includes(key)
      ) {
        // @ts-ignore
        styleStr += `${key}:${value.value}${value.postfix || ''};`;
      }
    }
    // 添加width,height
    if (width.value) {
      styleStr += `width:${width.value};`;
    }
    if (height.value) {
      styleStr += `height:${height.value};`;
    }
    return {
      html: `<div ${styleStr ? 'style="' + styleStr + '"' : ''}></div>`,
      js: ``,
    };
  }
  ngOnInit(): void {}
}
