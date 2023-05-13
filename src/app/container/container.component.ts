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
  static tagNamePrefix: string = 'my-container';
  constructor() {}
  static extends(option) {
    const { html, css } = option;
    // web component 的索引不能递增，因为索引重置后会重复，而且cache后apply会有冲突。
    const index = String(Math.random()).substring(2),
      tagName = `${ContainerComponent.tagNamePrefix}-${index}`;
    const { style, width, height } = css;
    const displayVal = style['display'];
    let styleStr = '';
    if (displayVal) {
      styleStr = `display:${displayVal};`;
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
    // if (width.value) {
    //   styleStr += `width:${width.value};`;
    // }
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
