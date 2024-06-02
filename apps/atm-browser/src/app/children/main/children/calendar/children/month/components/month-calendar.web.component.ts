import {
    ChangeDetectionStrategy,
    Component,
} from '@angular/core';
import {
    MonthCalendarService, MonthCalendarViewModel
} from '@atm-project/common';
import { ListService } from '../../../../../modules/list/services/list-manager.service';
import { ITask } from '@atm-project/interfaces';
import { BehaviorSubject, Observable, tap } from 'rxjs';


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
    protected month: BehaviorSubject<MonthCalendarViewModel>;
    protected taskAll$: Observable<ITask[]>;

    /**
     * Получение текузего месяца
     */
    protected get currentMonth(): string {
        return this._service.currentDate.format('MMMM');
    }

    constructor(private _service: MonthCalendarService,
                private _contentManagerService: ListService
    ) {
        this.month = new BehaviorSubject(
            this._service.initMonth([])
        );

        this.taskAll$ = _contentManagerService.getAllTask()
            .pipe(tap((el: ITask[]) => {
                this.month.next(this._service.initMonth(el));
            })
            );

        this.taskAll$.subscribe();
    }

    /**
     * Обновление вью модели месяца для переключения между месяцами
     */
    protected chooseMonth(nextMonth: -1 | 1): void {
        this.month.next(this._service.createNextMonth(nextMonth));
    }
}
