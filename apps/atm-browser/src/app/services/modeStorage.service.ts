import { Injectable, InjectionToken } from '@angular/core';
import { Mode } from '../children/main/components/mode/modeToggle.model';

export interface IModeStorage {
    saveMode(mode: Mode): void;
    getCurrentMode(): Mode;
}

export const MODE_STORAGE_SERVICES: InjectionToken<IModeStorage> =
    new InjectionToken<IModeStorage>('modeStorage');

@Injectable()
export class ModeToggleStorageService implements IModeStorage {
    public localStorageKey: string = 'mode';
    /**
     * Function for save mode in local storage
     * @param mode Mode
     */
    public saveMode(mode: Mode): void {
        localStorage.setItem(this.localStorageKey, mode);
    }

    /**
     * Function that return mode
     */
    public getCurrentMode(): Mode {
        return (
            (localStorage.getItem(this.localStorageKey) as Mode) || undefined
        );
    }
}
