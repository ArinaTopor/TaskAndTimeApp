import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ModeToggleService } from './services/mode-toggle.service';
import { Mode } from './mode-toggle.model';
@Component({
    selector: 'mode-toggle',
    templateUrl: './mode-toggle.component.html',
    styleUrls: ['./mode-toggle.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModeToggleComponent implements OnInit {
    public readonly modeType: typeof Mode = Mode;
    protected mode: Mode = this._modeToggleService.currentMode;

    constructor(private _modeToggleService: ModeToggleService) {}

    public ngOnInit(): void {
        this._modeToggleService.modeChanged$.subscribe((mode) => {
            this.mode = mode;
        });
    }
    /**
     * Function that toggles the mode to dark or light
     */
    public toggleMode(mode: Mode): void {
        this._modeToggleService.toggleMode(mode);
    }
}
