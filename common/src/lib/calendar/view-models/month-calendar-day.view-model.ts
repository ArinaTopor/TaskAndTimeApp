import dayjs from 'dayjs';
import { CalendarDayViewModel } from './calendar-day.view-model';
import { ITask } from '../../db/interfaces/task.interface';


export class MonthCalendarDayViewModel extends CalendarDayViewModel {
    public inCurrentMonth: boolean;

    constructor(
        currentDay: dayjs.Dayjs,
        dayData: dayjs.Dayjs,
        task: ITask[],
    ) {
        super(currentDay, dayData, task);
        this.inCurrentMonth = dayData.isSame(currentDay, 'month');
    }
}
