import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ModeToggleService } from '../../../../services/modeToggle.service';
import { Mode } from './modeToggle.model';
import { CommonModule } from '@angular/common';
@Component({
    standalone: true,
    selector: 'mode-toggle',
    templateUrl: './modeToggle.component.html',
    styleUrls: ['./modeToggle.component.scss'],
    imports: [CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModeToggleComponent implements OnInit {
    protected mode: Mode = this._modeToggleService.currentMode;
    constructor(private _modeToggleService: ModeToggleService) {}

    public ngOnInit(): void {
        this.mode = this._modeToggleService.currentMode;
        this._modeToggleService.modeChanged$.subscribe((mode) => {
            this.mode = mode;
        });
    }
    /**
     * Function that toggles the mode to dark
     */
    public toggleDark(): void {
        this._modeToggleService.toggleDarkMode();
    }
    /**
     * Function that toggles the mode to light
     */
    public toggleLight(): void {
        this._modeToggleService.toggleLightMode();
    }
}
