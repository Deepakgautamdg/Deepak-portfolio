import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface LoaderState {
  show: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loaderSubject = new Subject<LoaderState>();

  loaderState = this.loaderSubject.asObservable();

  constructor() {}

  /**
   * @description To show loader.
   */
  show() {
    this.loaderSubject.next(<LoaderState>{ show: true });
  }

  /**
   * @description To hide Loader.
   */
   hide() {
    this.loaderSubject.next(<LoaderState>{ show: false });
  }
}
