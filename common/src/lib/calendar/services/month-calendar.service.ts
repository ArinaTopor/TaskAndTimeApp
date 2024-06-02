import { Inject, Injectable } from '@angular/core';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

import { DATE_TOKEN } from '../../date/tokens/date.token';
import { MonthCalendarViewModel } from '../view-models/month-calendar.view-model';
import { MonthCalendarDayViewModel } from '../view-models/month-calendar-day.view-model';
import { ITask } from '../../db/interfaces/task.interface';


@Injectable()
export class MonthCalendarService {

    private _days!: dayjs.Dayjs[];
    private _tasks: ITask[] = [];
    public currentDate: dayjs.Dayjs;
    public month!: MonthCalendarViewModel;

    constructor(@Inject(DATE_TOKEN) public date: dayjs.Dayjs) {
        this.currentDate = this.date.clone();
    }

    /**
     * Пересоздание вью модели
     */
    public createNextMonth(nextMonth: -1 | 1): MonthCalendarViewModel{
        this.currentDate = this.currentDate.add(nextMonth,'month');

        return this.initMonth(this._tasks);
    }

    /**
     * Инициализируем вью модельку с тасками
     */
    public initMonth(tasks: ITask[]): MonthCalendarViewModel {
        this._tasks = tasks;
        this._days = this.getMonthDays();
        const res: MonthCalendarDayViewModel[] = [];

        for (const day of this._days){
            const tempTask: ITask[] = [];
            for (const task of this._tasks) {
                if (dayjs(day).isSame(dayjs(task.date), 'date')) {
                    tempTask.push(task);
                }
            }

            res.push(
                new MonthCalendarDayViewModel(
                    this.currentDate, day, tempTask
                ));
        }

        return new MonthCalendarViewModel(res);
    }

    /**
     * Получаем дни месяца
     */
    private getMonthDays(): dayjs.Dayjs[] {
        const res: dayjs.Dayjs[] = [];
        let start: dayjs.Dayjs = this.currentDate.startOf('month').startOf('week');
        const end: dayjs.Dayjs = this.currentDate.endOf('month').endOf('week');

        while (start.isBefore(end)) {
            res.push(start);
            start = start.add(1, 'day');
        }

        return res;
    }
}
