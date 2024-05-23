import { Inject, Injectable } from '@angular/core';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { WeekCalendarDayViewModel } from '../view-models/week-calendar-day.view-model';
import { WeekCalendarViewModel } from '../view-models/week-calendar.view-model';
import { DATE_TOKEN } from '../../date/tokens/date.token';
import { ITask } from '../../db/interfaces/task.interface';


@Injectable()
export class WeekCalendarService {
    protected weekCalendar: dayjs.Dayjs[] = [];
    private _weekCalendarViewModel!: WeekCalendarViewModel;

    private _tasks!: ITask[];
    public currentDate: dayjs.Dayjs;

    constructor(@Inject(DATE_TOKEN) public date: dayjs.Dayjs) {
        this.currentDate = this.date;

        this.weekCalendar = this.getWeekDays();
    }


    /**
     * Создаем вью модель
     */
    public createWeekCalendarViewModel($tasks: ITask[]): WeekCalendarViewModel{
        this._weekCalendarViewModel = new WeekCalendarViewModel(
            this.initWeekCalendar()
        );


        this._tasks = $tasks;
        console.log(this._tasks);

        return this._weekCalendarViewModel;
    }

    /**
     * Устанавливаем таски после инициализации контейнера
     */
    public setTasks(height: number): void {
        for (const day of this.weekCalendarViewModel.week) {
            const tasks: ITask[] = [];
            day.height = height;
            for (const task of this.$tasks) {

                if (day.dayData.isSame(task.date, 'date')) {
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
}
