import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ModeToggleService } from './services/mode-toggle.service';
import { Mode } from './mode-toggle.model';
import { BehaviorSubject } from 'rxjs';
@Component({
    selector: 'mode-toggle',
    templateUrl: './mode-toggle.component.html',
    styleUrls: ['./mode-toggle.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModeToggleComponent implements OnInit {
    public readonly modeType: typeof Mode = Mode;
    protected modeChangedSubject: BehaviorSubject<Mode> =
        new BehaviorSubject<Mode>(Mode.light);
    protected modeLight: Mode = Mode.light;
    protected modeDark: Mode = Mode.dark;

    private get currentMode(): Mode {
        return this.modeChangedSubject.value;
    }

    constructor(private _modeToggleService: ModeToggleService) {}

    public ngOnInit(): void {
        this._modeToggleService.modeChanged$.subscribe((mode) => {
            this.modeChangedSubject.next(mode);
        });
    }
    /**
     * Function that toggles the mode to dark or light
     */
    public toggleMode(mode: Mode): void {
        this._modeToggleService.toggleMode(mode);
    }
}