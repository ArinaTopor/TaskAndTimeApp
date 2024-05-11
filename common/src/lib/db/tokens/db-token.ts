import { InjectionToken } from '@angular/core';
import { FirebaseDatabaseService } from '../firebase-db.service';

export const DATABASE_INFO_TOKEN: InjectionToken<FirebaseDatabaseService> =
    new InjectionToken<FirebaseDatabaseService>('DataBase.Service');
