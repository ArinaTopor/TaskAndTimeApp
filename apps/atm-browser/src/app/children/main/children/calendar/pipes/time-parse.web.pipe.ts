import { Pipe, PipeTransform } from '@angular/core';
import dayjs from 'dayjs';

@Pipe({
    standalone: true,
    name: 'timeParse'
})
export class TimeParseWebPipe implements PipeTransform {
    /**
     * Парсим время в удобный для вывода формат
     */
    public transform(value: dayjs.Dayjs, exponent: string = ''): string {
        return value.format('HH:mm');
    }
}
