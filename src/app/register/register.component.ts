import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { AlertService, UserService } from '../_services';

@Component({templateUrl: 'register.component.html'})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    country: any = ['India', 'South Africa', 'Australia', 'USA']
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', [Validators.required, Validators.minLength(6)]],
            lastName: ['', [Validators.required, Validators.minLength(6)]],
            phoneNumber: ['',[ Validators.required,  NumberOnlyValidator.phoneNumber]],
            country: ['', [Validators.required]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Your account has been created', true);
                    this.loading = this.submitted = false;
                    this.registerForm.reset();
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}



interface ValidationResult {
    [key: string]: boolean;
}

class NumberOnlyValidator {

    public static phoneNumber(control: FormControl): ValidationResult {
        const hasNumber = /^[0-9]*$/.test(control.value);
        const valid = hasNumber;
        if (!valid) {
            // return what´s not valid
            return { numberOnly: true };
        }
        return null;
    }
}