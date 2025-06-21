import { Component, inject, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IonTabBar, IonTabs, IonTabButton, IonIcon } from '@ionic/angular/standalone';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  imports: [IonTabBar,
    IonTabs, IonTabButton, IonIcon,
    RouterModule,
    TranslocoPipe],
  standalone: true,
})
export class AdminComponent {

}
