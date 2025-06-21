import { Component, computed, inject, Injector, linkedSignal, OnInit, Signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { TranslocoService } from '@jsverse/transloco';
import {
  IonList, IonItem, IonLabel,
  IonIcon, IonButton, IonSearchbar,
  IonSelect, IonSelectOption,
  IonFab, IonFabButton, IonContent, IonHeader, IonToolbar, IonTitle, IonAccordion, IonAccordionGroup,
  IonButtons
} from '@ionic/angular/standalone';
import { TranslocoPipe } from '@jsverse/transloco';
import { DatePipe } from '@angular/common';

import { CommonService } from '../../../common/services/common.service';
import { Item, QueryOptions } from '../../../common/models/common.models';
import { IAddOn } from '../../../common/models/product.model';

@Component({
  selector: 'app-add-on',
  standalone: true,
  imports: [
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonButton,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonSearchbar,
    IonSelect,
    IonSelectOption,
    IonFab, IonFabButton,
    DatePipe,
    TranslocoPipe,
    IonAccordion,
    IonAccordionGroup, IonButtons
  ],
  templateUrl: './add-on.component.html',
})
export class AddOnComponent implements OnInit {
  common = inject(CommonService);
  title: string = 'addOns';

  private readonly injector = inject(Injector);
  public trans = inject(TranslocoService);

  

  // public addOnsList$ = rxResource({
  //   // loader: () => this.common.getListData<any>(this.title),
  //   defaultValue: [],
  //   injector: this.injector
  // });

  // public addOnsList: Signal<IAddOn[]> = computed(() => {
  //   const items = this.addOnsList$.value();
  //   return this.common.applyQueryOptions<IAddOn>(items, this.queryOptions());
  // });

  constructor() { }
  ngOnInit() { }

  add() {
    this.common.createOrUpdateAlertForm<IAddOn>(this.title, { name: 'text', price: 'number' });
  }
  update(item: Item<IAddOn>) {
    this.common.createOrUpdateAlertForm<IAddOn>(this.title, { name: 'text', price: 'number' }, undefined, item);
  }

  updateSearchValue(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const value = target.value as string;
    this.queryOptions.update(o => ({ ...o, search: { ...o.search!, value } }));
  }
  updateFilterValue(event: Event, field: any) {
    const target = event.target as HTMLIonSelectElement;
    const value = target.value;
    let updatedValue = value;
    this.queryOptions.update(o => ({ ...o, filters: { ...o.filters!, [field]: updatedValue } }));
  }

  setOrderField(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const value = target.value as string;
    this.queryOptions.update(o => ({ ...o, ordering: { ...o.ordering!, field: value } }));
  }
  toggoleDirection() {
    this.queryOptions.update(o => ({ ...o, ordering: { ...o.ordering!, direction: o.ordering!.direction === 'asc' ? 'desc' : 'asc' } }));
  }
}
