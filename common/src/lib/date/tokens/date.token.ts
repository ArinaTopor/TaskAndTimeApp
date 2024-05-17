import { InjectionToken } from '@angular/core';
import dayjs from 'dayjs';

export const DATE_TOKEN: InjectionToken<dayjs.Dayjs> =
    new InjectionToken<dayjs.Dayjs>('DATE', {
        factory: () => dayjs().locale('ru',{ weekStart: 1 })
    });
