import { Injectable } from '@angular/core';
import AOS from 'aos';
@Injectable()
export class AOSService {
  public initialize() {
    AOS.init();
  }

  public refresh() {
    AOS.refresh();
  }

  public getAosDelay(index: number): string {
    return `${index * 150}`; // 300ms delay for each item
  }
}
