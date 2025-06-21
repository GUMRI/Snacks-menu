import { Injectable, inject, signal, computed, resource } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslocoService } from '@jsverse/transloco';
import { CommonService } from '../../common/services/common.service';
import { IUser } from '../../common/models/user.model';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private alertController = inject(AlertController);
  private translocoService = inject(TranslocoService);
  private commonService = inject(CommonService);
  private userService = inject(UserService);
  currentId = signal<string | null>(localStorage.getItem('uid'));


  currentUser = resource(
    {
      request: () => this.currentId(),
      loader: ({ request }) => this.userService.getUser(request as string),
      defaultValue: null,
    })



  async logOut() {


    await this.userService.updatUser(this.currentUser.value() as IUser, { isConnect: false, isActive: false })
    await this.currentUser.set(null);
    await this.currentId.set(null);
    await localStorage.removeItem('uid');
    await this.commonService.toastMsg(this.translocoService.translate('auth.logoutSuccess'), 'success');

  }




  async login(): Promise<void> {
    const alert = await this.alertController.create({
      header: this.translocoService.translate('auth.loginTitle'),
      inputs: [
        {
          name: 'phone',
          type: 'tel',
          placeholder: this.translocoService.translate('auth.phonePlaceholder')
        }
      ],
      buttons: [
        {
          text: this.translocoService.translate('auth.cancelButton'),
          role: 'cancel'
        },
        {
          text: this.translocoService.translate('auth.loginButton'),
          handler: async (data) => {
            const phone = data.phone;
            try {

              if (phone) {
                const user = await this.userService.getUserBy('phone', phone)
                if (user) {
                  await this.userService.updatUser(user, { isConnect: true });
                  this.currentId.set(user.id);
                  localStorage.setItem('uid', user.id);
                

                  this.currentUser.set(user)
                } else {
                  this.commonService.toastMsg(this.translocoService.translate('auth.userNotFound'), 'error');
                }
              }
            } catch (error) {
              console.log('auth.loginError', error);

            }
          }
        }
      ]
    });
    await alert.present();
  }

  async signup(): Promise<void> {
    const alert = await this.alertController.create({
      header: this.translocoService.translate('auth.signupTitle'),
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: this.translocoService.translate('auth.namePlaceholder')
        },
        {
          name: 'phone',
          type: 'tel',
          placeholder: this.translocoService.translate('auth.phonePlaceholder')
        }
      ],
      buttons: [
        {
          text: this.translocoService.translate('auth.cancelButton'),
          role: 'cancel'
        },
        {
          text: this.translocoService.translate('auth.signupButton'),
          handler: async (data) => {
            const { name, phone } = data;
            if (name && phone) {

              const newUser = await this.userService.cretaeUser(name, phone);

              const newUserId = (newUser as any).id;
              if (newUserId) {
                this.currentId.set(newUserId);
                localStorage.setItem('uid', newUserId);
                this.currentUser.set(newUser)
              }
            }
          }
        }
      ]
    });
    await alert.present();
  }


}