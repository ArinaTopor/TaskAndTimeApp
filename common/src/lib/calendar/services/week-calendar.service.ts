import {Inject, Injectable} from '@angular/core';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import {WeekCalendarDayViewModel} from '../view-models/week-calendar-day.view-model';
import {WeekCalendarViewModel} from '../view-models/week-calendar.view-model';
import {DATE_TOKEN} from '../../date/tokens/date.token';
import {ITask} from '../../db/interfaces/task.interface';
import {BehaviorSubject, switchMap} from 'rxjs';


@Injectable()
export class WeekCalendarService {
    protected weekCalendar: dayjs.Dayjs[] = [];
    private _weekCalendarViewModel!: WeekCalendarViewModel;

    private _tasks!: ITask[];
    public currentDate: dayjs.Dayjs;
    private taskIsGet: boolean = false

    constructor(@Inject(DATE_TOKEN) public date: dayjs.Dayjs) {
        this.currentDate = this.date;

        this.weekCalendar = this.getWeekDays();
    }


    /**
     * Создаем вью модель
     */
    public createWeekCalendarViewModel(): WeekCalendarViewModel {
        this._weekCalendarViewModel = new WeekCalendarViewModel(
            this.initWeekCalendar()
        );



        return this._weekCalendarViewModel;
    }

    public setTasks(tasks: ITask[]) {
        this.taskIsGet = true
        this._tasks = tasks
    }

    /**
     * Устанавливаем таски после инициализации контейнера
     */
    public addOnCalendarTasks(): void {
        if (!this.taskIsGet) {
            return
        }

        for (const day of this._weekCalendarViewModel.week) {
            const tasks: ITask[] = [];
            for (const task of this._tasks) {
                if (dayjs(day.dayData).isSame(dayjs(task.date), 'date')) {
                    tasks.push(task);
                }
            }

            day.tasks.next(tasks);
        }
    }

    /**
     * Инициализируем календарь на неделю, созавая вью модели дней
     */
    private initWeekCalendar(): WeekCalendarDayViewModel[] {
        const res: WeekCalendarDayViewModel[] = [];

        for (const day of this.weekCalendar) {
            //TODO вынести в класс
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


