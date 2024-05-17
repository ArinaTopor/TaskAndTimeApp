import { Inject, Injectable } from '@angular/core';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

import { ITask } from '../interfaces/ITask.interface';
import { DATE_TOKEN } from '../../date/tokens/date.token';
import { MonthCalendarViewModel } from '../view-models/month-calendar.view-model';
import { MonthCalendarDayViewModel } from '../view-models/month-calendar-day.view-model';


@Injectable()
export class MonthCalendarService {

    private _days: dayjs.Dayjs[];
    private _taskList: ITask[];
    public currentDate: dayjs.Dayjs;
    public month: MonthCalendarViewModel;

    constructor(@Inject(DATE_TOKEN) public date: dayjs.Dayjs) {
        this.currentDate = this.date.clone();
        this._taskList = this.setMokTask();
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
                if (day.format('YYYY:MM:DD') === task.date.format('YYYY:MM:DD')) {
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

    /**
     * Метод для мока задач, нужно будет потом убрать
     */
    private setMokTask(): ITask[] {
        const testTask: ITask = {
            id: 'string1',
            name: 'testTask1',
            description: 'string',
            date: dayjs().set('day', 1),
            timeStart: dayjs().set('hour', 15).set('minute', 25).set('day', 1),
            timeEnd: dayjs().set('hour', 17).set('minute', 20).set('day', 1),
            tags: [],
            completed: false
        };

        const testTask1: ITask = {
            id: 'string2',
            name: 'testTask2',
            description: 'string',
            date: dayjs().set('day', 3),
            timeStart: dayjs().set('hour', 20).set('minute', 10).set('day', 3),
            timeEnd: dayjs().set('hour', 21).set('minute', 45).set('day', 3),
            tags: [],
            completed: false
        };

        const testTask2: ITask = {
            id: 'string3',
            name: 'testTask3',
            description: 'string',
            date: dayjs().set('day', 5),
            timeStart: dayjs().set('hour', 12).set('minute', 10).set('day', 4),
            timeEnd: dayjs().set('hour', 20).set('minute', 45).set('day', 4),
            tags: [],
            completed: false
        };

        return [testTask, testTask1, testTask2, testTask1,];
    }
}
