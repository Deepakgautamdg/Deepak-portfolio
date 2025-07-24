
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as moment from 'moment';
import 'moment-timezone';

@Injectable({
  providedIn: 'root'
})
export class DateTimeService {

  constructor() { }
  
  private timeFormatSubject = new BehaviorSubject<string>('');   // Subject to manage the dynamic time format
  private timeZoneSubject = new BehaviorSubject<string>('');  // Subject to manage the dynamic time zone

  timeFormat$ = this.timeFormatSubject.asObservable();  // Observable to subscribe to changes in time format
  timeZone$ = this.timeZoneSubject.asObservable();  // Observable to subscribe to changes in time zone


  /**
  * @name setDynamicTimeFormat
  * @description Method to set the dynamic time format
  */
  setDynamicTimeFormat(timeformat: string): void {
    this.timeFormatSubject.next(timeformat);
  }

  /**
  * @name setTimeZone
  * @description Method to set the dynamic time zone
  */
  setTimeZone(timeZone: string): void {
    this.timeZoneSubject.next(timeZone);
  }
  
  /**
  * @name format
  * @description Method to format a given date based on the dynamic time format
  */
  format(date: any) {
    const self = this;
    // Check if the date is null or undefined
    if (!date) {
      return '';
    }
    let formattedDateTime: string = '';
    self.timeFormat$.subscribe((timeFormat) => {
      self.timeZone$.subscribe((timeZone) => { // Subscribe to changes in time zone
        formattedDateTime = moment(date).tz(timeZone).format(timeFormat);
      });
    });
    return formattedDateTime || '';
  }

}

