import { ProductService } from './../../../core/services/product.service';
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
import { ImgComponent } from '../../../common/components/img.component';
import { COLLECTIONS_NAMES } from '../../../core/local-first/schema/collectionSettings';
import { IProduct, ProductWithBaseDoc } from '../../../core/local-first/schema/models/product/product.schema';
import { UpdateDocType } from '../../../core/local-first/types/doc.models';
import { MangoQuery } from 'rxdb';
import { DatabaseService } from '../../../core/local-first/services/db.service';

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
  title: COLLECTIONS_NAMES = 'products';
  productService = inject(ProductService);

  private readonly injector = inject(Injector);
  public trans = inject(TranslocoService);

  


  constructor() { }
  ngOnInit() { }

  add() {
    this.common.createOrUpdateAlertForm<any>(this.title, { name: 'text' }, { isActive: true });
  }
  update(item: UpdateDocType<IProduct>) {
    this.common.createOrUpdateAlertForm<any>(this.title, { name: 'text' }, undefined, item);
  }

  updateSearchValue(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const value = target.value as string;

  }
  updateFilterValue(event: Event, field: any) {
    const target = event.target as HTMLIonSelectElement;
    const value = target.value;
    let updatedValue = value;

  }

  setOrderField(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const value = target.value as string;

  }
  toggoleDirection() {
  }
}