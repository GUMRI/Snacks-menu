import { Component, inject } from '@angular/core';
import {
  IonIcon, IonContent, IonFab,
  IonFabButton, IonFabList, IonHeader,
  IonSegment, IonSegmentButton, IonTitle, IonToolbar, SegmentCustomEvent,
  IonLabel,
  IonSegmentView, IonSegmentContent
} from '@ionic/angular/standalone';

import { CommonService } from '../../common/services/common.service';
import { ProductComponent } from './product/product.component';
import { AddOnComponent } from './add-on/add-on.component';
import { IngredientComponent } from './ingredient/ingredient.component';
import { ProductFormComponent } from './product/product-form/product-form.component';
import { ImgComponent } from '../../common/components/img.component';
import { IAddOn } from '../../core/local-first/schema/models/product/add-on.schema';
import { IIngredient } from '../../core/local-first/schema/models/product/ingredient.schema';

@Component({
  selector: 'app-product-management',
  imports: [IonHeader, IonToolbar,
    IonFab, IonFabList, IonFabButton,
    IonTitle, IonContent, IonSegment, IonSegmentButton, ProductComponent,
    IonLabel, AddOnComponent, IonSegmentContent, IonSegmentView, IngredientComponent,
    ImgComponent,
    IonIcon],
    templateUrl: './product-management.component.html',
  //templateUrl: './product-management.component.html',
})

export class ProductManagementComponent {
  common = inject(CommonService);
  id =''
  selectedSegment: string = 'products';
  segmentChanged(ev: Event) {
    this.selectedSegment = (ev as SegmentCustomEvent).detail.value as string;
  }

  addProduct() {
    this.common.createModal('products', ProductFormComponent);

  }
  addAddOn() {
    this.common.createOrUpdateAlertForm<IAddOn>('add_ons', { name: 'text', price: 'number' })
  }
  addIngredient() {
    this.common.createOrUpdateAlertForm<IIngredient>('ingredients', { name: 'text' })
  }


  addCategory() { }
}