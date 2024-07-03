import dayjs from 'dayjs';
import { ITask } from '../../db/interfaces/task.interface';



export class CalendarDayViewModel {
    public currentDay: boolean;
    public dayData: dayjs.Dayjs;
    public tasks: ITask[];


    constructor(
        currentDay: dayjs.Dayjs,
        dayData: dayjs.Dayjs,
        task: ITask[]
    ) {
        this.currentDay = dayData.isSame(currentDay, 'date');
        this.dayData = dayData;
        this.tasks = task;
    }
}
