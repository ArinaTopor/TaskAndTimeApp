import dayjs from 'dayjs';
import { ITask } from '@atm-project/common';
import { CalendarDayViewModel } from './calendar-day.view-model';


export class MonthCalendarDayViewModel extends CalendarDayViewModel {
    public inCurrentMonth: boolean;

    constructor(
        currentDay: dayjs.Dayjs,
        dayData: dayjs.Dayjs,
        task: ITask[],
    ) {
        super(currentDay, dayData, task);
        this.inCurrentMonth = dayData.month() === currentDay.month();
    }
}
