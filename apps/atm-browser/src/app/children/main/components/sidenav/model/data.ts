import { Injectable } from '@angular/core';
import { INavbarDataFunction } from '../interfaces/data-function.web.interface';
import { INavbarDataList } from '../interfaces/data-list.web.interface.ts';
import { IDataNav } from '../interfaces/data-navbar.web.interface';
import { navbarDataFunction } from './data-function';
import { navbarDataList } from './data-list';

@Injectable()
export class DataNav implements IDataNav {
    public dataList:INavbarDataList[] = navbarDataList;
    public dataFunction:INavbarDataFunction[] = navbarDataFunction;
}
