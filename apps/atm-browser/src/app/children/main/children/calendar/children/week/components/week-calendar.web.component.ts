import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    ViewChild
} from '@angular/core';
import { WeekCalendarService, WeekCalendarViewModel } from '@atm-project/common';


@Component({
    selector: 'week-calendar-web-component',
    templateUrl: './week-calendar.web.component.html',
    styleUrl: './week-calendar.web.component.scss',
    providers: [
        WeekCalendarService,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeekCalendarWebComponent implements AfterViewInit {
    protected week: WeekCalendarViewModel;
    //protected renderFlag: boolean = false;

    @ViewChild('dayContainer', { read: ElementRef })
    protected calendarContainer!: ElementRef;

    constructor(
        private _cd: ChangeDetectorRef,
        private _service: WeekCalendarService,
    ) {
        this.week = this._service.weekCalendarViewModel;
    }

    public ngAfterViewInit(): void {
        this._service.setTasks(this.calendarContainer.nativeElement.offsetHeight);
        //this.renderFlag = true смешной баг хз как пофиксить)
        this._cd.detectChanges();
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
        for (const day of this.week.week) {
            day.dayData = day.dayData.add(nextWeek, 'week');
        }

        this._service.setTasks(this.calendarContainer.nativeElement.offsetHeight);
    }
}
