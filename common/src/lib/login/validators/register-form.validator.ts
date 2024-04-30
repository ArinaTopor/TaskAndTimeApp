import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const conformPassword: ValidatorFn = (
    control: AbstractControl
): ValidationErrors | null => {
    return control.value.password === control.value.repeatPassword
        ? null
        : { PasswordsNotMatch: true };
};
