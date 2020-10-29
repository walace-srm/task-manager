import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../services/authentication-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginForm} from '../model/login-form';
import {TranslocoService} from '@ngneat/transloco';
import {ToastController} from '@ionic/angular';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    public loginForm: FormGroup;

    constructor(
        private authenticationService: AuthenticationService,
        private formBuilder: FormBuilder,
        private toastCtrl: ToastController,
        private translocoService: TranslocoService,
        private router: Router,
        private route: ActivatedRoute) {
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
        this.authenticationService.login(this.loginForm.value.username, this.loginForm.value.password)
            .subscribe(async (data) => {
                const a = data.token;
                if (a !== undefined) {
                    this.loginForm.reset();
                    this.router.navigate(['/home']);
                } else {
                    const toast = await this.toastCtrl.create({
                        message: data.error,
                        duration: 3000,
                        position: 'bottom'
                    });

                    toast.present();
                    return;
                }
            });
    }

}
