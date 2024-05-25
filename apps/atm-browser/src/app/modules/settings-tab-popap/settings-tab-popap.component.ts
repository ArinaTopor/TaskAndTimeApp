import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';
import { IElement, IProject } from '@atm-project/common';
import { CommonModalComponent } from 'apps/atm-browser/src/app/modules/common-modal/common-modal.component';
import { universeElementModel } from '../../children/main/children/project/models/clean-section.model';
import { NewProjectComponent } from '../../children/main/components/new-project/new-project.component';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

@Component({
    selector: 'settings-tab-popap',
    templateUrl: './settings-tab-popap.component.html',
    styleUrl: './settings-tab-popap.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        CommonModalComponent,
        DeleteModalComponent,
        NewProjectComponent,
    ],
})
export class SettingsTabComponent {
    protected open: boolean = false;
    protected openDeleteNotification: boolean = false;
    protected openCommonModal: boolean = false;
    @Input() public value: IElement = universeElementModel;
    @Input() public project?: IProject;
    @Input() public isProject: boolean = false;
    @Output() public changeData: EventEmitter<any> = new EventEmitter<any>();
    @Output() public deleteData: EventEmitter<void> = new EventEmitter<void>();

    /**
     * open modal
     */
    public openCommon(): void {
        this.openCommonModal = true;
    }
    /**
     * open delete modal
     */
    public openDelete(): void {
        this.openDeleteNotification = true;
    }
    /**
     * for cancel modal-delete
     */
    public handleCancel(): void {
        this.openDeleteNotification = false;
    }
    /**
     * function for delete
     */
    public handleConfirm(): void {
        this.deleteData.emit();
        this.openDeleteNotification = false;
    }
    /**
     * changeDataSection
     */
    public handleChangeData(value: IElement): void {
        this.changeData.emit(value);
    }
}
