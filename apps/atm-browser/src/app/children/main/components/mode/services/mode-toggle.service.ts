import { Inject, Injectable } from '@angular/core';
import { Mode } from '../mode-toggle.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { ModeToggleStorageService } from './mode-storage.service';

@Injectable()
export class ModeToggleService {
    public modeChanged$: Observable<Mode>;

    public get currentMode(): Mode {
        return this._modeChangedSubject.value;
    }
    private _modeChangedSubject: BehaviorSubject<Mode> =
        new BehaviorSubject<Mode>(Mode.light);

    constructor(
        @Inject(DOCUMENT) public document: Document,
        private _modeToggleStorageService: ModeToggleStorageService
    ) {
        this.modeChanged$ = this._modeChangedSubject.asObservable();
        this.init();
    }
    /**
     * Function to update the current mode
     * @param Mode mode
     */
    public updateCurrentMode(mode: Mode): void {
        this._modeChangedSubject.next(mode);
        this._modeToggleStorageService.saveMode(this.currentMode);
    }
    /**
     * Function that toggled mode
     * @param mode Mode
     */
    public toggleMode(mode: Mode): void {
        const oppositeMode: Mode = this.getOppositeMode(mode);
        this.document.body.classList.remove(this.currentMode);
        this.document.body.classList.add(oppositeMode);
        this.updateCurrentMode(oppositeMode);
    }
    /**
     * returns the reverse of the currentMode or currentMode
     * @param mode
     */
    private getOppositeMode(mode: Mode): Mode {
        if (mode !== this.currentMode) {
            return mode !== Mode.light ? Mode.dark : Mode.light;
        } else {
            return this.currentMode;
        }
    }

    /**
     * Function for init app and set the current mode
     * from local storage or default mode = light
     */
    private init(): void {
        const initMode: Mode = this._modeToggleStorageService.getCurrentMode();
        this.updateCurrentMode(initMode);
        this.document.body.classList.add(this.currentMode);
    }
}
