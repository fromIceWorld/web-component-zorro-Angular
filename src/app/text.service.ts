import { Injectable } from '@angular/core';

@Injectable()
export class TextService {
  constructor() {}
  log() {
    console.log('service');
  }
}
