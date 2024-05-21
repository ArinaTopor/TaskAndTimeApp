import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';
import { IElement } from '@atm-project/common';
import { CommonModalComponent } from 'apps/atm-browser/src/app/modules/common-modal/common-modal.component';
import { ModalForDeleteComponent } from 'apps/atm-browser/src/app/modules/modal-for-delete/modal-for-delete.component';
import { universeElementModel } from '../../children/main/children/project/models/cleanSection.model';

@Component({
    selector: 'settings-tab-popap',
    templateUrl: './settings-tab-popap.component.html',
    styleUrl: './settings-tab-popap.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [CommonModalComponent, ModalForDeleteComponent],
})
export class SettingsTabComponent {
    protected readonly items: string[] = ['Редактировать', 'Удалить'];
    protected open: boolean = false;
    protected openDeleteNotification: boolean = false;
    protected openCommonModal: boolean = false;
    public isCreate: boolean = false;
    @Input() public value: IElement = universeElementModel;
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
        console.log(this.openDeleteNotification);
        // this.openDeleteNotification = false;
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
