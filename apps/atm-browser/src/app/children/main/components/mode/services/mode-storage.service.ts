import { Injectable } from '@angular/core';
import { Mode } from '../mode-toggle.model';

@Injectable()
export class ModeToggleStorageService {
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
