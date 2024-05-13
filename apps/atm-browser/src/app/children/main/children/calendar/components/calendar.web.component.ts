import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CalendarService } from '@atm-project/common';
import dayjs from 'dayjs';


@Component({
    selector: 'calendar-web-component',
    templateUrl: './calendar.web.component.html',
    styleUrl: './calendar.web.component.scss',
    providers: [CalendarService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarWebComponent {
    protected blockIndex: number[] = [0,1,2,3];

    constructor(private _service: CalendarService) {

        // console.log(this.week)
        // console.log(this.week.Week[0].Tasks[0].timeStart.hour())
    }

    /**
     * Получение строки из числа для вывода дня недели
     */
    protected getDay(day: dayjs.Dayjs): string {

        switch (day.day()) {
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

    /**
     * Получение массива чисел от 0 до 23 для отображения в календаре
     */
    protected getTime(): number[] {
        const res: number[] = [];
        for (let i: number = 0; i < 24; i++) {
            res.push(i);
        }

        return res;
    }
}
