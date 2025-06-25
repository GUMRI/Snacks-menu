

import { Component, computed, inject, Injector, linkedSignal, OnInit, resource, signal, Signal } from '@angular/core';
import { IonBackButton, IonList, IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonIcon, IonButton, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonSearchbar, IonSegment, IonSelect, IonSelectOption, IonSegmentButton, IonAvatar, IonFab, IonFabButton, IonBadge, IonChip } from '@ionic/angular/standalone';

import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { CommonService } from '../../common/services/common.service';
import { DatePipe } from '@angular/common';
import { TranslocoDatePipe } from '@jsverse/transloco-locale';
import { PopoverComponent } from '../../common/components/popover/popover.component';
import { rxResource } from '@angular/core/rxjs-interop';
import { COLLECTIONS_NAMES } from '../../core/local-first/schema/collectionSettings';
import { MangoQuery } from 'rxdb';
import { DatabaseService } from '../../core/local-first/services/db.service';
import { IUser } from '../../core/local-first/schema/models/user/user.scehma';
import { UpdateDocType } from '../../core/local-first/types/doc.models';






@Component({
  selector: 'app-users',
  imports: [
    IonContent,
    IonButtons,
    IonList,
    IonAvatar,
    IonItem,
    IonLabel,
    IonIcon,
    IonButton,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonSearchbar,
    IonSegment,
    IonSelect,
    IonSelectOption,
    IonSegmentButton,
    IonBackButton,
    IonFab, IonFabButton,
    TranslocoPipe,
    IonAccordion,
    IonAccordionGroup,
    IonBadge,
    IonChip,
    DatePipe,
    TranslocoDatePipe,
    PopoverComponent
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],


})
export class UsersComponent implements OnInit {
  title: COLLECTIONS_NAMES = 'users'
  common = inject(CommonService)
  public trans = inject(TranslocoService)
  dbs = inject(DatabaseService)
  public query = signal<MangoQuery<IUser>>({})

  public list = rxResource({
    request: () => this.query(),
    loader: ({ request }) => this.dbs.db.users.find(request).$,
    defaultValue: []
  });

  constructor() {

  }
  ngOnInit() {



  }

  toEntries(obj: any): any {
    return Object.entries(obj);
  }
  toRecord(entry: any): any {
    return { [entry[0]]: entry[1].before }
  }

  add() {
    this.common.createOrUpdateAlertForm<IUser>(this.title,
      { name: 'text', phone: 'tel' },
      { role: 'user', isActive: true })
  }
  restoreData(user: IUser, data: any) {
    // this.firestore.update(this.title, user, data).then(() => this.list$.reload())
  }
  update(user: UpdateDocType<IUser>) {
    this.common.createOrUpdateAlertForm<IUser>(this.title, { name: 'text' },
      undefined, user)
  }

  remove(user: IUser) {
    this.common.confirmDelete(this.title, user)
  }
  updateSearchValue(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const value = target.value as string;
    let updatedValue = value;
    if (value && value.length > 0) {
      updatedValue = value.trim().toLowerCase();
    }
    this.query.update(o => ({ ...o, selector: { ...o.selector, name: { $regex: updatedValue, $options: 'i' } } }));
  }
  updateFilterValue(event: Event, field: any) { // add ginric TYpe 
    const target = event.target as HTMLIonSelectElement;
    const value = target.value;
    let updatedValue = value;

    if (value && value.length > 0) {
      updatedValue = value.trim().toLowerCase();
    }
    if (field === 'role') {
      this.query.update(o => ({ ...o, selector: { ...o.selector, role: { $eq: updatedValue } } }));
    }
    if (field === 'isActive') {
      this.query.update(o => ({ ...o, selector: { ...o.selector, isActive: { $eq: updatedValue === 'true' } } }));
    }
   
  }



  setOrderField(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const value = target.value as string;
    
  }
  toggoleDirection() {
   
  }

  changeLang() {
    this.trans.setActiveLang(this.trans.getActiveLang() === 'en' ? 'ar' : 'en')
  }
}
