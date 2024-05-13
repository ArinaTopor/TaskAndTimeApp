import { Injectable } from '@angular/core';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { WeekCalendarDayViewModel } from '../view-models/week-calendar-day.view-model';
import { WeekCalendarViewModel } from '../view-models/week-calendar.view-model';
import { ITask } from '../interfaces/ITask.interface';



@Injectable()
export class CalendarService {
    protected date: dayjs.Dayjs;
    protected weekCalendar: dayjs.Dayjs[] = [];
    protected weekCalendarViewModel: WeekCalendarViewModel;

    private _taskList: ITask[];
    public currentDate: dayjs.Dayjs;

    constructor() {
        this.date = dayjs().locale('eu', { weekStart: 1 });
        this.currentDate = this.date;

        this.weekCalendar = this.getWeekDay();
        this._taskList = this.setTask();

        this.weekCalendarViewModel = new WeekCalendarViewModel(
            this.initWeekCalendar()
        );
    }

    /**
     * Инициализируем календарь на неделю, созавая вью модели дней
     */
    private initWeekCalendar(): WeekCalendarDayViewModel[] {
        const res:WeekCalendarDayViewModel[] = [];

        for (const day of this.weekCalendar) {
            const tasks: ITask[] = [];
            for (const task of this._taskList) {
                if (day.day() === task.date.day()) {
                    console.log(task);
                    tasks.push(task);
                }
            }

            res.push(
                new WeekCalendarDayViewModel(this.currentDate, day, tasks)
            );
        }

        return res;
    }

    /**
     * Получаем дни недели
     */
    private getWeekDay(): dayjs.Dayjs[] {
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
    private setTask(): ITask[] {
        const testTask: ITask = {
            id: 'string',
            name: 'testTask',
            description: 'string',
            date: dayjs(),
            timeStart: dayjs().set('hour', 15).set('minute',25),
            timeEnd: dayjs().set('hour', 17).set('minute',20),
            tags: [],
            completed: false
        };

        const testTask1: ITask = {
            id: 'string',
            name: 'testTask',
            description: 'string',
            date: dayjs().set('day',3),
            timeStart: dayjs().set('hour', 20).set('minute',10).set('day',3),
            timeEnd: dayjs().set('hour', 21).set('minute',45).set('day',3),
            tags: [],
            completed: false
        };

        const testTask2: ITask = {
            id: 'string',
            name: 'testTask',
            description: 'string',
            date: dayjs().set('day',5),
            timeStart: dayjs().set('hour', 12).set('minute',10).set('day',4),
            timeEnd: dayjs().set('hour', 20).set('minute',45).set('day',4),
            tags: [],
            completed: false
        };

        console.log(testTask1.timeStart);
        console.log(testTask1.timeEnd);

        return [testTask, testTask1, testTask2];
    }
}
