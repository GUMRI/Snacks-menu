import { Component, computed, inject, Injector, linkedSignal, OnInit, resource, signal, Signal } from '@angular/core';
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
import { COLLECTIONS_NAMES } from '../../../core/local-first/schema/collectionSettings';
import { MangoQuery } from 'rxdb';
import { IIngredient } from '../../../core/local-first/schema/models/product/ingredient.schema';
import { DatabaseService } from '../../../core/local-first/services/db.service';
import { UpdateDocType } from '../../../core/local-first/types/doc.models';


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
  title: COLLECTIONS_NAMES = 'ingredients';
  common = inject(CommonService);

  private readonly injector = inject(Injector);
  public trans = inject(TranslocoService);
dbs = inject(DatabaseService)
  public query = signal<MangoQuery<IIngredient>>({})
  public ingredientsList = rxResource({
    request: () => this.query(),
    loader: ({request}) => this.dbs.db.ingredients.find(request).$,
    defaultValue: [],
  });


  constructor() { }
  ngOnInit() { }

  add() {
    this.common.createOrUpdateAlertForm<IIngredient>(this.title, { name: 'text', quantityLevel: 'text' });
  }
  update(item: UpdateDocType<IIngredient>) {
    this.common.createOrUpdateAlertForm<IIngredient>(this.title, { name: 'text' }, undefined, item);
  }

  updateSearchValue(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const value = target.value as string;
    this.query.update(o => ({ ...o, selector: { ...o.selector, name: { $regex: value, $options: 'i' } } }));
  }
  updateFilterValue(event: Event, field: keyof IIngredient) {
    const target = event.target as HTMLIonSelectElement;
    const value = target.value;
    let updatedValue = value;
    if (field === 'quantityLevel') {
      updatedValue = value === 'all' ? undefined : value;
    }
    this.query.update(o => ({
      ...o,
      selector: { ...o.selector, [field]: updatedValue }
    }));
  }

  setOrderField(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const value = target.value as keyof IIngredient;
   
  }
  toggoleDirection() {
   
  }
}