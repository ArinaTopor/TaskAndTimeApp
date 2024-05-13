import dayjs from 'dayjs';


export interface IWeekCalendarInfo {
    currentDate: dayjs.Dayjs;
    weekCalendar: dayjs.Dayjs[];
}
