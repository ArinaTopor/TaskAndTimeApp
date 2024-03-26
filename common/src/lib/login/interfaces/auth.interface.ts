import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';

export interface IStorage {
    setDataByKey(key: string): Observable<void>;
    getDataByKey<T>(key: string): Observable<T>;
}

export const STORAGE: InjectionToken<IStorage> = new InjectionToken<IStorage>('Сервис для хранения данных в сторадже');