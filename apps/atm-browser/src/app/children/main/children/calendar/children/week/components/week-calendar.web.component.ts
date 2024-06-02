import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    ViewChild
} from '@angular/core';
import { WeekCalendarService, WeekCalendarViewModel } from '@atm-project/common';
import { ListService } from '../../../../../modules/list/services/list-manager.service';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { ITask } from '@atm-project/interfaces';
import {
    WeekCalendarDayViewModel
} from '../../../../../../../../../../../common/src/lib/calendar/view-models/week-calendar-day.view-model';


@Component({
    selector: 'week-calendar-web-component',
    templateUrl: './week-calendar.web.component.html',
    styleUrl: './week-calendar.web.component.scss',
    providers: [
        WeekCalendarService,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeekCalendarWebComponent {
    public get containerHeight(): number {
        return this.calendarContainer?.nativeElement.offsetHeight;
    }

    protected week: BehaviorSubject<WeekCalendarViewModel>;
    protected taskAll$: Observable<ITask[]>;

    /**
     * Получение массива чисел от 0 до 23 для отображения в календаре
     */

    @ViewChild('dayContainer', { read: ElementRef })
    protected calendarContainer!: ElementRef;


    constructor(
        private _service: WeekCalendarService,
        private _contentManagerService: ListService
    ) {
        this.week = new BehaviorSubject(
            this._service.createWeekCalendarViewModel()
        );

        this.taskAll$ = _contentManagerService.getAllTask();

        this.taskAll$.pipe(map((el) => {
            this._service.setTasks(el);
            this._service.addOnCalendarTasks();
        })).subscribe();
    }

    /**
     * Получение недели
     */
    protected dayWeek(): WeekCalendarDayViewModel[] {
        return this.week.value.week;
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

    /**
     * Добавляем ко всем значениям во вью модели одну неделю и обновляем таски
     */
    protected chooseWeek(nextWeek: -1 | 1): void {
        for (const day of this.dayWeek()) {
            day.dayData = day.dayData.add(nextWeek, 'week');
        }

        this._service.addOnCalendarTasks();
    }
}
