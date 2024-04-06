import { Inject, Injectable } from '@angular/core';
import { Mode } from '../children/main/components/mode/modeToggle.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { IModeStorage, MODE_STORAGE_SERVICES } from './modeStorage.service';

@Injectable()
export class ModeToggleService {
    public currentMode: Mode = Mode.light;
    private _modeChangedSubject: BehaviorSubject<Mode> =
        new BehaviorSubject<Mode>(this.currentMode);
    public modeChanged$: Observable<Mode>;
    constructor(
        @Inject(DOCUMENT) public document: Document,
        @Inject(MODE_STORAGE_SERVICES) public modeStorage: IModeStorage
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
        this.modeStorage.saveMode(this.currentMode);
    }
    /**
     * Function that toggles the mode to dark
     */
    public toggleDarkMode(): void {
        if (this.currentMode !== Mode.dark) {
            this.document.body.classList.remove(Mode.light);
            this.document.body.classList.add(Mode.dark);
            this.updateCurrentMode(Mode.dark);
        }
    }
    /**
     * Function that toggles the mode to light
     */
    public toggleLightMode(): void {
        if (this.currentMode !== Mode.light) {
            this.document.body.classList.remove(Mode.dark);
            this.document.body.classList.add(Mode.light);
            this.updateCurrentMode(Mode.light);
        }
    }

    /**
     * Function for init app and set the current mode
     * from local storage or default mode = light
     */
    private init(): void {
        const initMode: Mode | undefined = this.modeStorage.getCurrentMode();
        this.updateCurrentMode(initMode);
        this.document.body.classList.add(this.currentMode);
    }
}
