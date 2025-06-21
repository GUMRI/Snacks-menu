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
import { IAddOn, IProduct } from '../../common/models/product.model';
import { ProductFormComponent } from './product/product-form/product-form.component';
import { ImgComponent } from '../../common/components/img.component';

@Component({
  selector: 'app-product-management',
  imports: [IonHeader, IonToolbar,
    IonFab, IonFabList, IonFabButton,
    IonTitle, IonContent, IonSegment, IonSegmentButton, ProductComponent,
    IonLabel, AddOnComponent, IonSegmentContent, IonSegmentView, IngredientComponent,
    ImgComponent,
    IonIcon],
    template: `
    // center content
      <ion-content styly="display: flex; justify-content: center; align-items: center">
        <app-img [upload]="true" ></app-img>
      <app-img  [imgId]="'475c07ec-08eb-4f2f-9c3d-e73b85fd4242'"/>
      <app-img  [imgId]="'7bfbf249-c98e-4b5c-8a2e-0fc4ec1770ea'"/>
      </ion-content>
    `,
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
    this.common.createOrUpdateAlertForm<IAddOn>('addOns', { name: 'text', price: 'number' })
  }
  addIngredient() {
    this.common.createOrUpdateAlertForm<IAddOn>('ingredients', { name: 'text' })
  }


  addCategory() { }
}