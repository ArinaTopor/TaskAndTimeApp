import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICommonForm } from './interfaces/common-form.interface';
import { IElement } from '@atm-project/common';
import { universeElementModel } from '../../children/main/children/project/models/clean-section.model';

@Component({
    selector: 'common-modal',
    templateUrl: './common-modal.component.html',
    styleUrl: './common-modal.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [],
})
export class CommonModalComponent implements OnChanges {
    @Input() public header: string = '';
    @Input() public isOpen: boolean = false;
    @Input() public value: IElement = universeElementModel;
    @Input() public placeholder: string = 'Раздел';
    @Input() public isCreate: boolean = true;
    @Output() public dataChanged: EventEmitter<any> = new EventEmitter<any>();
    protected commonForm: FormGroup<ICommonForm> = new FormGroup({
        title: new FormControl(this.value.title, {
            nonNullable: true,
            validators: [Validators.required],
        }),
    });

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['value'] && !this.isCreate) {
            this.commonForm.controls['title'].setValue(this.value.title);
        }
    }
    /**
     * function for changed or add sections, filters, tags
     */
    protected onDataChanged(observer: any): any {
        const rawForm: { title: string } = this.commonForm.getRawValue();
        this.dataChanged.emit({ ...rawForm, id: this.value.id });
        this.commonForm.reset();
        observer.complete();
    }
}
