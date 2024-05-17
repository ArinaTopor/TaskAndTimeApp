import { MonthCalendarDayViewModel } from './month-calendar-day.view-model';

export class MonthCalendarViewModel {
    public month: MonthCalendarDayViewModel[];
    public monthInWeeks: MonthCalendarDayViewModel[][];

    constructor(month: MonthCalendarDayViewModel[]) {
        this.month = month;
        this.monthInWeeks = this.splitMonthIntoWeeks();
    }

    /**
     * Разбиваем месяц на недели для более удобной работы при выводе каледаря
     */
    private splitMonthIntoWeeks(): MonthCalendarDayViewModel[][] {
        const res: MonthCalendarDayViewModel[][] = [];
        let week: MonthCalendarDayViewModel[] = [];

        for (let i: number = 1; i <= this.month.length; i++) {
            week.push(this.month[i-1]);
            if (i % 7 === 0) {
                res.push(week);
                week = [];
            }
        }

        console.log(res);

        return res;
    }
}
