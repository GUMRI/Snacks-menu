import { Component, Input, Output, EventEmitter, inject, OnInit, computed, Signal, effect, signal } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonButton, IonButtons, IonCheckbox, IonIcon, IonChip,
  ModalController
} from '@ionic/angular/standalone';
import { CommonService } from '../../../../common/services/common.service';
import { map, Observable } from 'rxjs';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { TranslocoPipe } from '@jsverse/transloco';
import { ImgComponent } from '../../../../common/components/img.component';
import { DatabaseService } from '../../../../core/local-first/services/db.service';
import { ProductService } from '../../../../core/services/product.service';
import { AddOnWithBaseDoc, IAddOn } from '../../../../core/local-first/schema/models/product/add-on.schema';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonButtons,
    IonCheckbox,
    IonIcon,
    IonChip,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    MatOptionModule,
    MatRippleModule,
    TranslocoPipe, ImgComponent

  ],
})
export class ProductFormComponent implements OnInit {

  @Output() fileSelected = new EventEmitter<File>();
  img = signal('1747345780727.png')
  modalCtrl = inject(ModalController);
  commonService = inject(CommonService);
  productService = inject(ProductService);

  productCategoryList = computed(() => this.productService.categories.value().map(c => c.name));
  productForm = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    category: new FormControl(this.productCategoryList()[0], Validators.required),
    imageUrl: new FormControl(placeholder),
    isAvailable: new FormControl(true),
    addOnSearch: new FormControl(''),
    file: new FormControl<File | null>(null),
    addOns: new FormControl<any>([])
  });
  addOnSearch = toSignal((this.productForm.get('addOnSearch')?.valueChanges) as Observable<string>, { initialValue: '' });
  addOnsList = this.productService.addOns


  selectedFile: File | null = null;
  imagePreviewUrl: string | ArrayBuffer | null = null;

  constructor() {





  }

  ngOnInit() {

  }

  async uploadImg(event: Event) {
    
    // this.productForm.get('imageUrl')?.setValue('' || '')
  }

  onAddAddOn(name: string) {
    const addOn = this.addOnsList.value().find(addOn => addOn.name === name);
    if (!addOn) return;
    const currentAddOns = this.productForm.get('addOns')?.value;
    if (!currentAddOns.find((a: any) => a.id === addOn.id)) {
      this.productForm.get('addOns')?.setValue([...currentAddOns, addOn]);
      this.productForm.get('addOnSearch')?.setValue('');
    }

  }

  onRemoveAddOn(addOn: AddOnWithBaseDoc) {
    const currentAddOns = this.productForm.get('addOns')?.value as AddOnWithBaseDoc[];
    this.productForm.get('addOns')?.setValue(currentAddOns.filter(a => a.id !== addOn.id));
  }

  onSubmit() {
    if (this.productForm.valid) {

    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.selectedFile = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreviewUrl = e.target?.result as string | ArrayBuffer;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
}

const placeholder = 'https://static.vecteezy.com/system/resources/previews/004/968/473/non_2x/upload-or-add-a-picture-jpg-file-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-etc-vector.jpg' 