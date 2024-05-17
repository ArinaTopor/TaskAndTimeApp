import { Pipe, PipeTransform } from '@angular/core';
import dayjs from 'dayjs';

@Pipe({
    standalone: true,
    name: 'dateParse'
})
export class DateParseWebPipe implements PipeTransform {
    /**
     * Парсим доту в удобный для вывода формат
     */
    public transform(value: dayjs.Dayjs, exponent: string = ''): string {
        return value.format('DD.MM');
    }
}
