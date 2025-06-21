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
import { IIngredient } from '../../../common/models/product.model';


@Component({
  selector: 'app-ingredient',
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
  templateUrl: './ingredient.component.html',
})
export class IngredientComponent implements OnInit {
  common = inject(CommonService);
  title: string = 'ingredients';
  initQueryOptins: QueryOptions<IIngredient> = {
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

  public queryOptions = linkedSignal<QueryOptions<IIngredient>>(() => this.initQueryOptins);

  public ingredientsList$ = rxResource({
    loader: () => this.common.getListData<IIngredient>(this.title),
    defaultValue: [],
    injector: this.injector
  });

  public ingredientsList: Signal<IIngredient[]> = computed(() => {
    const items = this.ingredientsList$.value();
    return this.common.applyQueryOptions<IIngredient>(items, this.queryOptions());
  });

  constructor() { }
  ngOnInit() { }

  add() {
    this.common.createOrUpdateAlertForm<IIngredient>(this.title, { name: 'text', quantityLevel: 'text' });
  }
  update(item: Item<IIngredient>) {
    this.common.createOrUpdateAlertForm<IIngredient>(this.title, { name: 'text' }, undefined, item);
  }

  updateSearchValue(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const value = target.value as string;
    this.queryOptions.update(o => ({ ...o, search: { ...o.search!, value } }));
  }
  updateFilterValue(event: Event, field: keyof IIngredient) {
    const target = event.target as HTMLIonSelectElement;
    const value = target.value;
    let updatedValue = value;
    this.queryOptions.update(o => ({ ...o, filters: { ...o.filters!, [field]: updatedValue } }));
  }

  setOrderField(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const value = target.value as keyof IIngredient;
    this.queryOptions.update(o => ({ ...o, ordering: { ...o.ordering!, field: value } }));
  }
  toggoleDirection() {
    this.queryOptions.update(o => ({ ...o, ordering: { ...o.ordering!, direction: o.ordering!.direction === 'asc' ? 'desc' : 'asc' } }));
  }
}