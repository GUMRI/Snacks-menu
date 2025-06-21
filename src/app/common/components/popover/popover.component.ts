import { Component, OnInit, effect, inject } from '@angular/core';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import {
  IonList,
  IonItem,
  IonLabel,
  IonSelect, IonSelectOption,
  IonAvatar,
  IonPopover,
  IonIcon,
  IonButton
} from '@ionic/angular/standalone';
import { AuthService } from '../../../core/auth/auth.service';


@Component({
  selector: 'app-popover',
  imports: [
    IonList,
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption,
    TranslocoPipe,
    IonAvatar,
    IonPopover,
    IonIcon,
    IonButton
],
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
  standalone: true,
})
export class PopoverComponent implements OnInit {
  authService = inject(AuthService);

  constructor() {

  }

  ngOnInit() {

  }




  translocoService = inject(TranslocoService);

  changeLang(lang: string) {
    this.translocoService.setActiveLang(lang);
  }

  logOut() {
    this.authService.logOut();
  }

  login() {
    this.authService.login()
  }

  register() {
    this.authService.signup()
  }


}