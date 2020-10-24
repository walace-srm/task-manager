import {Component} from '@angular/core';
import {AlertController, ToastController, ActionSheetController} from '@ionic/angular';
import {TasksService} from '../services/tasks.service';
import {TranslocoService} from '@ngneat/transloco';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    public tasks: any = [];

    constructor(
        private alertCtrl: AlertController,
        private toastCtrl: ToastController,
        private actionsSheetCtrl: ActionSheetController,
        private tasksService: TasksService,
        private translocoService: TranslocoService) {

        this.fetchTasks();
    }

    async showAdd() {
        const alert = await this.alertCtrl.create({
            header: this.translocoService.translate('add task'),
            inputs: [
                {
                    name: 'newTask',
                    type: 'text',
                    placeholder: this.translocoService.translate('enter the task name')
                }
            ],
            buttons: [
                {
                    text: this.translocoService.translate('cancel'),
                    role: 'Cancel',
                    cssClass: 'secondary',
                    handler: () => {
                    }
                },
                {
                    text: this.translocoService.translate('confirm'),
                    handler: (form) => {
                        this.add(form.newTask);
                    }
                }
            ]
        });
        await alert.present();
    }

    async add(newTask: string) {
        if (newTask.trim().length < 1) {
            const toast = await this.toastCtrl.create({
                message: this.translocoService.translate('task not informed'),
                duration: 3000,
                position: 'bottom'
            });

            toast.present();
            return;
        }
        const task = {name: newTask, done: false};
        this.onSubmit(task);
    }

    changeStatus(task) {
        task.done = !task.done;
        this.tasksService.update(task._id).subscribe();
    }

    fetchTasks() {
        this.tasksService.getList().subscribe(data => {
            this.tasks = data;
        });
    }

    async deleteModal(task) {
        const alert = await this.alertCtrl.create({
            header: this.translocoService.translate('really want to delete the task'),
            buttons: [
                {
                    text: this.translocoService.translate('cancel'),
                    role: 'Cancel',
                    cssClass: 'secondary',
                    handler: () => {
                    }
                },
                {
                    text: this.translocoService.translate('confirm'),
                    handler: () => {
                        this.deleteTask(task);
                    }
                }
            ]
        });
        await alert.present();
    }

    async deleteTask(task) {
        await this.tasksService.delete(task._id).subscribe(() => {
            this.fetchTasks();
        });
    }

    onSubmit(newTask) {
        this.tasksService.save(newTask).subscribe((data) => {
            this.tasks.push(data);
        });
    }
}
