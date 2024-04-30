import { AbstractControl } from '@angular/forms';

export const checkValid = (control: AbstractControl): boolean => {
    return control.invalid && (control.dirty || control.touched);
};
