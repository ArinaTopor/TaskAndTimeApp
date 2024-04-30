import { InjectionToken } from '@angular/core';
import { FirebaseAuthService } from '../services/firebase-auth.service';

export const USER_INFO_TOKEN: InjectionToken<FirebaseAuthService> =
    new InjectionToken<FirebaseAuthService>('Auth.Service');
