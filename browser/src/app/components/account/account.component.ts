import { Component, OnInit } from '@angular/core';
import { TextControlComponent } from '../../modules/components/text-control.component';

@Component({
    standalone: true,
    selector: 'app-acc',
    template: 'Account',
    imports: [
        TextControlComponent
    ]
})

export class AccComponent implements OnInit {
    constructor() {
    }

    ngOnInit() {
    }
}