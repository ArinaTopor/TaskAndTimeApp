import { Directive, Input } from '@angular/core';
import dayjs from 'dayjs';
import { TuiTime } from '@taiga-ui/cdk';

@Directive({
    standalone: true,
    selector: '[formatTime]'
})
export class FormatTimeDirective {

    @Input('formatTime') protected time: TuiTime | undefined;
    constructor() {}

    /**
     * Форматировать данные из тайги в dayJS
     */
    protected formattedTime(): string {
        const hours: string | undefined = this.time?.hours.toString().padStart(2, '0');
        const minutes: string | undefined = this.time?.minutes.toString().padStart(2, '0');

        if (!hours || !minutes) {
            return '';
        }

        const fullTime: string = `${hours}:${minutes}`;
        const timeJs: dayjs.Dayjs = dayjs(fullTime, 'HH:mm');

        return timeJs.format('HH:mm');
    }
}
