import { Inject, Injectable } from '@angular/core';
import { Mode } from '../mode-toggle.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { ModeToggleStorageService } from './mode-storage.service';

@Injectable()
export class ModeToggleService {
    public currentMode: Mode = Mode.light;
    public modeChanged$: Observable<Mode>;
    private _modeChangedSubject: BehaviorSubject<Mode> =
        new BehaviorSubject<Mode>(this.currentMode);

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
        this.currentMode = mode;
        this._modeChangedSubject.next(this.currentMode);
        this._modeToggleStorageService.saveMode(this.currentMode);
    }
    /**
     * Function that toggled mode
     * @param mode Mode
     */
    public toggleMode(mode: Mode): void {
        if (mode === Mode.light) {
            this.document.body.classList.remove(Mode.dark);
            this.document.body.classList.add(Mode.light);
            this.updateCurrentMode(Mode.light);
        } else {
            this.document.body.classList.remove(Mode.light);
            this.document.body.classList.add(Mode.dark);
            this.updateCurrentMode(Mode.dark);
        }
    }

    /**
     * Function for init app and set the current mode
     * from local storage or default mode = light
     */
    private init(): void {
        const initMode: Mode | undefined =
            this._modeToggleStorageService.getCurrentMode();
        this.updateCurrentMode(initMode);
        this.document.body.classList.add(this.currentMode);
    }
}