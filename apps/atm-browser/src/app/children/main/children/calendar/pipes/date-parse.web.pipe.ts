import { Pipe, PipeTransform } from '@angular/core';
import dayjs from 'dayjs';

@Pipe({
    standalone: true,
    name: 'dateParse'
})
export class DateParseWebPipe implements PipeTransform {
    /**
     * Парсим доту в нужный для вывода формат
     */
    public transform(value: dayjs.Dayjs, exponent: string = 'DD.MM'): string {
        return value.format(exponent);
    }
}
