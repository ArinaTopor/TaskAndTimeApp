import dayjs from 'dayjs';
import { ITask } from '@atm-project/common';



export class CalendarDayViewModel {
    public currentDay: boolean;
    public dayData: dayjs.Dayjs;
    public tasks: ITask[];


    constructor(
        currentDay: dayjs.Dayjs,
        dayData: dayjs.Dayjs,
        task: ITask[]
    ) {
        this.currentDay = dayData.format('YYYY:MM:DD') === currentDay.format('YYYY:MM:DD');
        this.dayData = dayData;
        this.tasks = task;
    }
}
