import { Inject, Injectable } from '@angular/core';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

import { DATE_TOKEN } from '../../date/tokens/date.token';
import { MonthCalendarViewModel } from '../view-models/month-calendar.view-model';
import { MonthCalendarDayViewModel } from '../view-models/month-calendar-day.view-model';
import { ITask } from '../../db/interfaces/task.interface';


@Injectable()
export class MonthCalendarService {

    private _days: dayjs.Dayjs[];
    private _taskList: ITask[] = [];
    public currentDate: dayjs.Dayjs;
    public month: MonthCalendarViewModel;

    constructor(@Inject(DATE_TOKEN) public date: dayjs.Dayjs) {
        this.currentDate = this.date.clone();



        this._days = this.getMonthDays();
        this.month = new MonthCalendarViewModel(this.initMonth());
    }

    /**
     * Пересоздание вью модели
     */
    public createNextMonth(nextMonth: -1 | 1): MonthCalendarViewModel{
        this.currentDate = this.currentDate.add(nextMonth,'month');
        this._days = this.getMonthDays();
        this.month = new MonthCalendarViewModel(this.initMonth());

        return this.month;
    }

    /**
     * Инициализируем вью модельку с тасками
     */
    private initMonth(): MonthCalendarDayViewModel[] {
        const res: MonthCalendarDayViewModel[] = [];

        for (const day of this._days){
            const tasks:ITask[] =[];
            for (const task of this._taskList){
                if (day.isSame(task.date, 'date')) {
                    tasks.push(task);
                }
            }

            res.push(new MonthCalendarDayViewModel(this.currentDate, day, tasks));
        }

        return res;
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
