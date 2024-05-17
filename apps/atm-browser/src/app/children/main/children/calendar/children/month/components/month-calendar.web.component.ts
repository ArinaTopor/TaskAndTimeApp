import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
} from '@angular/core';
import {
    MonthCalendarService, MonthCalendarViewModel
} from '@atm-project/common';



@Component({
    selector: 'month-calendar-web-component',
    templateUrl: './month-calendar.web.component.html',
    styleUrl: './month-calendar.web.component.scss',
    providers: [
        MonthCalendarService,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonthCalendarWebComponent {
    protected month: MonthCalendarViewModel;
    protected get currentMonth(): string{
        return this._service.currentDate.format('MM');
    }
    constructor(private _service: MonthCalendarService,
                private _cd: ChangeDetectorRef,
    ) {
        this.month = _service.month;
    }
    /**
     * Обновление вью модели месяца для переключения между месяцами
     */
    protected chooseMonth(nextMonth: -1 | 1): void {
        this.month = this._service.createNextMonth(nextMonth);
        this._cd.markForCheck();
    }
}
