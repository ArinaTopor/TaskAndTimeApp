import { InjectionToken } from '@angular/core';
import { INavbarDataFunction } from './data-function.web.interface.js';
import { INavbarDataList } from './data-list.web.interface.ts';

export interface IDataNav {
    dataList:INavbarDataList[],
    dataFunction:INavbarDataFunction[]
}

export const DATANAV:InjectionToken<IDataNav> = new InjectionToken<IDataNav>('Наполнение навбара');

