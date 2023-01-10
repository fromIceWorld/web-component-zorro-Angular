import { Component, OnInit } from '@angular/core';

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
    const { style } = css;
    const flexDirection = style['flex-direction'];
    return {
      html: `<div style="display:flex;${
        flexDirection
          ? flexDirection === 'row'
            ? 'flex-direction:row'
            : 'flex-direction:column'
          : ''
      }"></div>`,
      js: ``,
    };
  }
  ngOnInit(): void {}
}
