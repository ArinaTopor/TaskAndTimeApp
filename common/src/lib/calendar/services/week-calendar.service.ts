import { Inject, Injectable } from '@angular/core';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { WeekCalendarDayViewModel } from '../view-models/week-calendar-day.view-model';
import { WeekCalendarViewModel } from '../view-models/week-calendar.view-model';
import { ITask } from '../interfaces/ITask.interface';
import { DATE_TOKEN } from '../../date/tokens/date.token';


@Injectable()
export class WeekCalendarService {
    protected weekCalendar: dayjs.Dayjs[] = [];
    public weekCalendarViewModel: WeekCalendarViewModel;

    private _taskList: ITask[];
    public currentDate: dayjs.Dayjs;

    constructor(@Inject(DATE_TOKEN) public date: dayjs.Dayjs) {
        this.currentDate = this.date;

        this.weekCalendar = this.getWeekDays();
        this._taskList = this.setMokTask();

        this.weekCalendarViewModel = new WeekCalendarViewModel(
            this.initWeekCalendar()
        );
    }

    /**
     * Устанавливаем таски после инициализации контейнера
     */
    public setTasks(height: number): void {
        for (const day of this.weekCalendarViewModel.week) {
            console.log(day);
            const tasks: ITask[] = [];
            day.height = height;
            for (const task of this._taskList) {

                if (day.dayData.format('YYYY:MM:DD') === task.date.format('YYYY:MM:DD')) {
                    tasks.push(task);
                } else {

                }
            }

            day.tasks = tasks;

            day.setTasksBlock();
        }
    }

    /**
     * Инициализируем календарь на неделю, созавая вью модели дней
     */
    private initWeekCalendar(): WeekCalendarDayViewModel[] {
        const res: WeekCalendarDayViewModel[] = [];

        for (const day of this.weekCalendar) {

            res.push(
                new WeekCalendarDayViewModel(this.currentDate, day, [])
            );
        }

        return res;
    }

    /**
     * Получаем дни недели
     */
    private getWeekDays(): dayjs.Dayjs[] {
        const res: dayjs.Dayjs[] = [];
        let start: dayjs.Dayjs = this.date.startOf('week');
        const end: dayjs.Dayjs = this.date.endOf('week');

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

        // console.log(testTask1.timeStart);
        // console.log(testTask1.timeEnd);

        return [testTask, testTask1, testTask2];
    }
}
