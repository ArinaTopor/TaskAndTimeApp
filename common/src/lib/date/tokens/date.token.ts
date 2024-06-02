import { InjectionToken } from '@angular/core';
import dayjs from 'dayjs';
import ru from 'dayjs/locale/ru';

export const DATE_TOKEN: InjectionToken<dayjs.Dayjs> =
    new InjectionToken<dayjs.Dayjs>('DATE', {
        factory: () => dayjs().locale(ru ,{ weekStart: 1 })
    });
