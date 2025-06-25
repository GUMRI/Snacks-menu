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
import { IAddOn } from '../../../core/local-first/schema/models/product/add-on.schema';
import { UpdateDocType } from '../../../core/local-first/types/doc.models';
import { COLLECTIONS_NAMES } from '../../../core/local-first/schema/collectionSettings';
import { ProductService } from '../../../core/services/product.service';

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
  title: COLLECTIONS_NAMES = 'add_ons';

  private readonly injector = inject(Injector);
  public trans = inject(TranslocoService);

  ps = inject(ProductService)
  

  

  constructor() { }
  ngOnInit() { }

  add() {
    this.common.createOrUpdateAlertForm<IAddOn>(this.title, { name: 'text', price: 'number' });
  }
  update(item: UpdateDocType<IAddOn>) {
    this.common.createOrUpdateAlertForm<IAddOn>(this.title, { name: 'text', price: 'number' }, undefined, item);
  }

  updateSearchValue(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const value = target.value as string;
   this.ps.addOnsQuery.update(o => ({ ...o, selector: { ...o.selector, name: { $regex: value, $options: 'i' } } }));
  }
  updateFilterValue(event: Event, field: any) {
    const target = event.target as HTMLIonSelectElement;
    const value = target.value;
    let updatedValue = value;
    if (field === 'isActive') {
      updatedValue = value === 'true';
    } else if (field === 'isAvailable') {
      updatedValue = value === 'true';
    }
    this.ps.addOnsQuery.update(o => ({ ...o, selector: { ...o.selector, [field]: updatedValue } }));
  }

  setOrderField(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const value = target.value as string;
    // this.ps.addOnsQuery.update(o => ({ ...o, ordering: { ...o.ordering!, field: value } }));
  }
  toggoleDirection() {
    // this.queryOptions.update(o => ({ ...o, ordering: { ...o.ordering!, direction: o.ordering!.direction === 'asc' ? 'desc' : 'asc' } }));
  }
}
