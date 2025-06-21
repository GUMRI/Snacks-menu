import { Component, computed, inject, Injector, linkedSignal, OnInit, resource, Signal } from '@angular/core';
import { IonBackButton, IonList, IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonIcon, IonButton, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonSearchbar, IonSegment, IonSelect, IonSelectOption, IonSegmentButton, IonAvatar, IonFab, IonFabButton, IonBadge, IonChip } from '@ionic/angular/standalone';
import { QueryOptions } from '../../common/models/common.models';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { CommonService } from '../../common/services/common.service';
import { DatePipe } from '@angular/common';
import { TranslocoDatePipe } from '@jsverse/transloco-locale';
import { PopoverComponent } from '../../common/components/popover/popover.component';
import { IUser } from '../../common/models/user.model';
import { rxResource } from '@angular/core/rxjs-interop';
import { LocalFirstService } from '../../common/services/local-irst.service';
import { Observable } from 'rxjs';
import { FirestoreService } from '../../common/services/firebase.service';






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
  common = inject(CommonService)
  firestore = inject(FirestoreService)
  title: string = 'users'
  initQueryOptins: QueryOptions<IUser> = {
    search: { fields: ['name', 'phone'], value: '' },
    ordering: { field: 'name', direction: 'asc' },
    filters: {
      createdAt: 'all',
      lastUpdatedAt: 'all',
      createdBy: 'all',
      lastUpdatedBy: 'all',
      name: 'all',
      phone: 'all',
      isActive: "all"
    }
  }
  private readonly injector = inject(Injector)
  public trans = inject(TranslocoService)
  public queryOptions = linkedSignal<QueryOptions<IUser>>(() => this.initQueryOptins);

  public list$ = rxResource({
    loader: () => this.firestore.subjects.get(this.title)?.asObservable() as Observable<IUser[]>,
    defaultValue: [] as any[],
    injector: this.injector
  });

  public list: Signal<IUser[]> = computed(() => {
    const items = this.list$.value();

    return this.common.applyQueryOptions<IUser>(items, this.queryOptions());
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
   { role: 'user', isActive: true }).then(() => this.list$.reload())
  
  
  }
  restoreData(user: IUser, data: any) {
    this.firestore.update(this.title, user, data).then(() => this.list$.reload())
  }
  update(user: IUser) {
    this.common.createOrUpdateAlertForm<IUser>(this.title, { name: 'text' }, 
      undefined, user).then(() => this.list$.reload())
  }

  remove(user: IUser) {
    this.common.confirmDelete(this.title,  user)
    .then(() => this.list$.reload())
  }
  updateSearchValue(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const value = target.value as string;
    this.queryOptions.update(o => ({ ...o, search: { ...o.search!, value } }));
  }
  updateFilterValue(event: Event, field: any) { // add ginric TYpe 
    const target = event.target as HTMLIonSelectElement;
    const value = target.value;
    let updatedValue = value;

    this.queryOptions.update(o => ({ ...o, filters: { ...o.filters!, [field]: updatedValue } }));
  }



  setOrderField(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const value = target.value as string;
    this.queryOptions.update(o => ({ ...o, ordering: { ...o.ordering!, value } }));
  }
  toggoleDirection() {
    this.queryOptions.update(o => ({ ...o, ordering: { ...o.ordering!, direction: o.ordering!.direction === 'asc' ? 'desc' : 'asc' } }));
  }

  changeLang() {
    this.trans.setActiveLang(this.trans.getActiveLang() === 'en' ? 'ar' : 'en')
  }
}
