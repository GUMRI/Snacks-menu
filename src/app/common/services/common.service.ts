import { inject, Injectable, Inject, Type, InjectionToken, Injector, Self, linkedSignal, Signal } from '@angular/core';
import { AlertController, AlertInput, ModalController, ToastController } from '@ionic/angular/standalone';
import { translateObjectSignal, translateSignal, TranslocoService } from '@jsverse/transloco';

import { DatabaseService } from '../../core/local-first/services/db.service';
import { RxDocument } from 'rxdb';
import { COLLECTIONS_NAMES } from '../../core/local-first/schema/collectionSettings';
import { BaseDoc, UpdateDocType } from '../../core/local-first/types/doc.models';


type AlertFields<T> = {
  [K in keyof T]: AlertInput['type'] | 'text' | 'number' | 'date' | 'time' | 'checkbox' | 'radio' | 'select';
}

@Injectable({ providedIn: 'root' })
export class CommonService {
  common = translateObjectSignal('common')
  private readonly toast = inject(ToastController);
  private readonly alert = inject(AlertController);
  private readonly modal = inject(ModalController);
  private readonly transloco = inject(TranslocoService);
  private readonly injector = inject(Injector);

  private dbService = inject(DatabaseService)

  async createOrUpdateAlertForm<T>(collectionName: COLLECTIONS_NAMES, fields: AlertFields<Partial<T>>,
    defaultValue?: Partial<T>,
    updatedValue?: UpdateDocType<T>
  ) {
    const alert = await this.alert.create({
      header: this.transloco.translate(`${collectionName}.add`),
      mode: 'ios',
      inputs:
        Object.entries(fields).map(([key, value]) => ({
          name: key,
          value: updatedValue ? updatedValue[key as keyof T] : '',
          type: value as any,
          placeholder: this.transloco.translate(`${collectionName}.model.${key}`)
        })),
      buttons: [
        { text: this.common()['cancel'], role: 'cancel' },
        {
          text: this.transloco.translate('common.save'),
          handler: async (data) => {
            // check by fields if the data has number values and convert them 
            Object.keys(data).forEach(key => {
              if (fields[key as keyof typeof fields] === 'number') {
                data[key] = Number(data[key]);
              }
            });
            if (updatedValue) {

              await this.dbService.update<T>(collectionName, updatedValue.id, data);
              this.showToast(this.transloco.translate(`${collectionName}.updated`));
            } else {
              data = defaultValue ? { ...defaultValue, ...data } : data;
              await this.dbService.insert<T>(collectionName, data);
              this.showToast(this.transloco.translate(`${collectionName}.added`));
            }
          }
        }
      ]
    });
    await alert.present();
  }


  async confirmDelete(collectionName: COLLECTIONS_NAMES, doc: RxDocument<any, any>) {
    const alert = await this.alert.create({
      header: this.transloco.translate('common.delete'),
      message: this.transloco.translate(`${collectionName}.confirmDeleteMsg`),
      buttons: [
        { text: this.transloco.translate('common.cancel'), role: 'cancel' },
        {
          text: this.transloco.translate('common.delete'),
          handler: async () => {

            await this.dbService.delete(collectionName, doc.id);
            await this.showToast(this.transloco.translate(`${collectionName}.deleted`));

          }
        }
      ]
    });
    await alert.present();
  }

  async createModal<T>(collectionName: COLLECTIONS_NAMES, component: Type<any>) {
    const modal = await this.modal.create({
      component,
    });
    await modal.present();
    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm' && data) {
      await this.dbService.insert<T>(collectionName, data);;
      this.showToast(this.transloco.translate(`${collectionName}.added`));

    }
  }

  async updateModal<T>(collectionName: COLLECTIONS_NAMES, component: Type<any>, item: any) {
    const modal = await this.modal.create({
      component,
      componentProps: { item }
    });
    await modal.present();
    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm' && data) {
      await this.dbService.update<T>(collectionName, item.id, data);
      this.showToast(this.transloco.translate(`${collectionName}.updated`));

    }
  }

  async toastMsg(message: string, type: 'error' | 'success' | 'warning') {
    let color = '';
    let icon = '';
    switch (type) {
      case 'success':
        color = 'success';
        icon = 'checkmark-circle';
        break;
      case 'error':
        color = 'danger';
        icon = 'close-circle';
        break;
      case 'warning':
        color = 'warning';
        icon = 'warning';
        break;
    }

    const toast = await this.toast.create({
      message: this.transloco.translate(message),
      duration: 2000,
      position: 'bottom',
      color: color,
      icon: icon,
    });
    toast.present();
  }
  private showToast(message: string) {
    this.toast.create({
      message,
      duration: 2000,
      position: 'bottom'
    }).then(t => t.present());
  }



}