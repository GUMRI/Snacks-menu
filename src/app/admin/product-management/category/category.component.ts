import { Component, inject, } from '@angular/core';
import { CategoryService } from '../../../core/category/category.service';
import { IonList, IonRadioGroup, IonRadio, IonItem, IonSearchbar, IonToolbar, IonButton, IonIcon, IonHeader, IonTitle, IonButtons, IonContent, IonItemSliding, IonItemOptions, IonItemOption } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { trashOutline, pencilOutline, addOutline } from 'ionicons/icons';

@Component({
  selector: 'app-category',
  standalone: true,
  templateUrl: './category.component.html',
  imports: [IonList, IonRadioGroup, IonRadio, IonItem, IonSearchbar, IonToolbar, IonButton, FormsModule, IonIcon, IonHeader, IonTitle, IonButtons, IonContent, IonItemSliding, IonItemOptions, IonItemOption],
})
export class CategoryComponent {
    public readonly categoryService = inject(CategoryService);
    
    constructor() {
        addIcons({ trashOutline, pencilOutline, addOutline });
    }

}