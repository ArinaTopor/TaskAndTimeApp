import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICommonForm } from './common-form.interface';

@Component({
    selector: 'common-modal',
    templateUrl: './common-modal.component.html',
    styleUrl: './common-modal.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [],
})
export class CommonModalComponent {
    @Input() public header: string = '';
    @Input() public isOpen: boolean = false;
    public value?: string;
    //возможно стоит добавить 2 флага: на редактирование и на удаление, также стоит передавать сюда метод?
    //или подставлять необходимый метод зависимо от флага?
    protected commonForm: FormGroup<ICommonForm> = new FormGroup({
        title: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required],
        }),
    });
}
