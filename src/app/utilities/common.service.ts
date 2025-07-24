import { Injectable } from "@angular/core";
import { DateTimeService } from "src/app/services/dateTime/date-time.service"
import { DatePipe } from '@angular/common';


@Injectable()
export class CommonService {

    constructor(
        private dateTimeService: DateTimeService,
        private datePipe: DatePipe
    ) { }

    /**
     * @name getRemoveElmentFromArray
     * @description This method removes the particle value from the array
     * @param {any} dataArray - The data array
     * @param {any} element - The value you want to remove from the given array
     * @returns {array}
     */
    getRemoveElmentFromArray(dataArray: any, element: any) {
        const index = dataArray.indexOf(element);
        if (index > -1) {
            dataArray.splice(index, 1);
        }
        return dataArray;
    }

    /**
     * @name camelize
     * @description This method camelize the given string
     * @param {any} str - String
     * @returns 
     */
    camelize(str: any) {
        return str.replace(/_/g, ' ').replace(/(^\w|\s\w)(\S*)/g, (_: any, m1: string, m2: string) => m1.toUpperCase() + m2.toLowerCase());
    }

    /**
     * @name formatDate
     * @description This method formats a date using the DateTimeService
     * @param {string} date - The date string
     * @returns {string} - The formatted date string
     */
    formatDate(date: string) {
        if (date !== null && date !== undefined && date !== '') {
            const parsedDate = new Date(date);
            if (!isNaN(parsedDate.getTime())) {
                return this.dateTimeService.format(parsedDate);
            }
        }
        return '';
    }

    formatDatee(date: string | Date): string {
        if (!date) {
            return '';
        }
        return this.datePipe.transform(date, 'dd/MM/yyyy HH:mm') || '';
    }
    convertToCron(interval: string): string {
        switch (interval) {
            case '1':
                return '*/1 * * * *';
            case '2':
                return '*/2 * * * *';
            case '5':
                return '*/5 * * * *';
            case '10':
                return '*/10 * * * *';
            default:
                return '*/1 * * * *';
        }
    }

}