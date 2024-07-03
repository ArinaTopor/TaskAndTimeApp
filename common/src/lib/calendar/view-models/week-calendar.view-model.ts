import { WeekCalendarDayViewModel } from './week-calendar-day.view-model';

export class WeekCalendarViewModel {
    public week: WeekCalendarDayViewModel[];

    constructor(week: WeekCalendarDayViewModel[]) {
        this.week = week;
    }

    // private addTasksToCalendar(weekCalendarInfo: IWeekCalendarInfo, Tasks: any) {
    //     //TODO добавлять таски из запроса в календарь по датам
    // }
}
