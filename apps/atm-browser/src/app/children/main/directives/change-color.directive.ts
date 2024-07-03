import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
@Directive({
    selector: '[changeColorElement]',
})
export class ChangeColorElementDirective implements AfterViewInit {
    @Input('changeColorElement') public color?: string;

    constructor(public el: ElementRef) {}
    public ngAfterViewInit(): void {
        this.changeColor(this.el);
    }
    /**
     * function for change color
     */
    private changeColor(el: ElementRef): void {
        if (this.color) {
            el.nativeElement.style.background = this.color;
        }
    }
}
