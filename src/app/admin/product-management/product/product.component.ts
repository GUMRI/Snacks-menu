import { Component, computed, inject, Injector, linkedSignal, OnInit, resource, Signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { TranslocoService } from '@jsverse/transloco';
import { Observable } from 'rxjs';
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
import { ImgComponent } from '../../../common/components/img.component';

@Component({
  selector: 'app-product',
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
    ImgComponent,
    DatePipe,
    TranslocoPipe,
    IonAccordion,
    IonAccordionGroup, IonButtons
  ],
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit {
  common = inject(CommonService);
  title: string = 'products';
  initQueryOptins: QueryOptions<any> = {
    search: { fields: ['name'], value: '' },
    ordering: { field: 'createdAt', direction: 'asc' },
    filters: {
      createdAt: 'all',
      lastUpdatedAt: 'all',
      createdBy: 'all',
      lastUpdatedBy: 'all',
      name: 'all',
    }
  };
  private readonly injector = inject(Injector);
  public trans = inject(TranslocoService);

  public queryOptions = linkedSignal<QueryOptions<any>>(() => this.initQueryOptins);

  public productsList$ = rxResource({
    loader: () => this.common.getListData<any>(this.title),
    defaultValue: [],
    injector: this.injector
  });

  public productsList: Signal<any[]> = computed(() => {
    const items = this.productsList$.value();
    return this.common.applyQueryOptions<any>(items, this.queryOptions());
  });

  constructor() { }
  ngOnInit() { }

  add() {
    this.common.createOrUpdateAlertForm<any>(this.title, { name: 'text' }, { isActive: true });
  }
  update(item: Item<any>) {
    this.common.createOrUpdateAlertForm<any>(this.title, { name: 'text' }, undefined, item);
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