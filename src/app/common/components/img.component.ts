import { Component, inject, input, Input, model, OnInit, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ImageStorageService } from '../services/img.service';

@Component({
  selector: 'app-img',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div>
       <div class="upload-container" onclick="document.getElementById('fileInput').click()">
        <img   [src]="previewUrl()"  alt="Upload">
      <input *ngIf="upload" type="file" id="fileInput" accept="image/*" (change)="onFileSelected($event)" style="display: none;">
    </div>
    </div>
  `,
  styles: [`

.upload-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 2px dashed #ccc;
  border-radius: 12px;
  transition: 0.3s;
}

.upload-container:hover img {
  opacity: 0.8;
}

.upload-container input[type="file"] {
  display: none;
}
  `]
})
export class ImgComponent implements OnInit {
  image = inject(ImageStorageService)
  sanitizer = inject(DomSanitizer)
  imgId = model<string>('')
  upload = input<boolean>(false)
  returnId = output<string | null>()
  previewUrl = signal<SafeUrl | null>(null);
  
  constructor() { }

  async ngOnInit() {
    if (this.upload()) this.imgId.set('475c07ec-08eb-4f2f-9c3d-e73b85fd4242')
    if (this.imgId()) {
      const localUrl = await this.image.getPreviewURL(this.imgId());
      console.log(localUrl);

      if (localUrl) {
        const url = this.sanitizer.bypassSecurityTrustUrl(localUrl);
        this.previewUrl.set(url)
      }
    }
  }

  async onFileSelected(event: Event) {
     
      const id =  await this.image.uploadFromInput(event);
      console.log(id);
      const objectUrl = await this.image.getPreviewURL(id as string)
      this.previewUrl.set(this.sanitizer.bypassSecurityTrustUrl(objectUrl as string));
  
    this.returnId.emit(id);
  }

  async uploadImage() {

  }

  clear() {
    this.previewUrl.set(placeholder);
  }
}


const placeholder = 'https://static.vecteezy.com/system/resources/previews/004/968/473/non_2x/upload-or-add-a-picture-jpg-file-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-etc-vector.jpg' 
