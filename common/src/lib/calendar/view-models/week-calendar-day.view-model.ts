import dayjs from 'dayjs';
import { CalendarDayViewModel } from './calendar-day.view-model';
import { ITask } from '@atm-project/interfaces';



export class WeekCalendarDayViewModel extends CalendarDayViewModel {
    constructor(
        currentDay: dayjs.Dayjs,
        dayData: dayjs.Dayjs,
        tasks: ITask[]
    ) {
        super(currentDay, dayData, tasks);
    }
}
