import { Pipe, PipeTransform } from '@angular/core';
import dayjs from 'dayjs';

@Pipe({
    standalone: true,
    name: 'dayParse'
})
export class DayParseWebPipe implements PipeTransform {
    /**
     * Парсим день недели в удобный для вывода формат
     */
    public transform(value: dayjs.Dayjs, exponent: string = ''): string {
        switch (value.day()) {
            case 1:
                return 'ПН';
            case 2:
                return 'ВТ';
            case 3:
                return 'СР';
            case 4:
                return 'ЧТ';
            case 5:
                return 'ПТ';
            case 6:
                return 'СБ';
            case 0:
                return 'ВС';
            default:
                return '';
        }
    }
}
