import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TranslocoService} from '@ngneat/transloco';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication-service.service';
import {LoginForm} from '../model/login-form';
import {ToastController} from '@ionic/angular';

@Component({
    selector: 'app-user-create',
    templateUrl: './user-create.page.html',
    styleUrls: ['./user-create.page.scss'],
})
export class UserCreatePage implements OnInit {
    public loginForm: FormGroup;
    public userCreateSuccess;

    constructor(
        private formBuilder: FormBuilder,
        private authenticationService: AuthenticationService,
        private translocoService: TranslocoService,
        private toastCtrl: ToastController,
        private router: Router) {
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    async add() {
        const toast = await this.toastCtrl.create({
            message: this.translocoService.translate('Usuário e senha são obrigatórios!'),
            duration: 3000,
            position: 'bottom'
        });

        toast.present();
        return;
    }

    submit({value, valid}: { value: LoginForm; valid: boolean }) {
        if (!valid) {
            return this.add();
        }
        this.authenticationService.create(this.loginForm.value.username, this.loginForm.value.password)
            .subscribe(async (data) => {
                this.userCreateSuccess = data;
                if (this.userCreateSuccess.message !== undefined) {
                    const toast = await this.toastCtrl.create({
                        message: this.userCreateSuccess.message,
                        duration: 3000,
                        position: 'bottom'
                    });

                    toast.present();
                    this.loginForm.reset();
                    this.router.navigate(['/login']);
                    return;
                } else {
                    const toast = await this.toastCtrl.create({
                        message: this.userCreateSuccess.error,
                        duration: 3000,
                        position: 'bottom'
                    });

                    toast.present();
                    return;
                }
            });
    }
}
