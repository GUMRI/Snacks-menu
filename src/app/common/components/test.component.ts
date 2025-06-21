import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ImageSyncService } from '../services/image-sync.service';
import { ImageStorageService } from '../services/img.service';

@Component({
    selector: 'app-image-test',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
          <h2>Image Test Component</h2>

            <div>
                <input type="file" accept="image/*" (change)="onUpload($event)" />
                    <button (click)="clear()">Clear Preview</button>
                      </div>

                        <div class="preview">
                            <img *ngIf="previewUrl()" [src]="previewUrl()" alt="Preview" />
                              </div>

                                <div *ngIf="currentId()">
                                    <button (click)="deleteLocal()">Delete Local</button>
                                        <button (click)="softDelete()">Soft Delete (Cloud)</button>
                                            <button (click)="reloadPreview()">Reload Preview</button>
                                                <button (click)="showMetadata()">Show Metadata</button>
                                                  </div>

                                                    <h3>Logs</h3>
                                                      <textarea readonly rows="10" style="width:100%">{{ logs() }}</textarea>
                                                        `,
    styles: [`
                                                            .preview img {
                                                                width: 200px;
                                                                    height: 200px;
                                                                        object-fit: cover;
                                                                            border: 2px solid #ccc;
                                                                                margin: 10px 0;
                                                                                  }
                                                                                    `]
})
export class ImageTestComponent implements OnInit {
    imageStorage = inject(ImageStorageService);
    imageSync = inject(ImageSyncService);
    sanitizer = inject(DomSanitizer);

    currentId = signal<string | null>(null);
    previewUrl = signal<SafeUrl | null>(null);
    logs = signal<string>('');

    ngOnInit() {
        this.log('Ready for testing...');
    }

    async onUpload(event: Event) {
        const id = await this.imageStorage.uploadFromInput(event);
        this.currentId.set(id as string);
        this.log(`Uploaded image with ID: ${id}`);

        await this.reloadPreview();
    }

    async reloadPreview() {
        if (!this.currentId()) return;
        const url = await this.imageStorage.getPreviewURL(this.currentId() as string);
        this.previewUrl.set(this.sanitizer.bypassSecurityTrustUrl(url as string));
        this.log(`Preview reloaded for ID: ${this.currentId()}`);
    }

    clear() {
        this.previewUrl.set(null);
        this.currentId.set(null);
        this.log('Cleared preview and ID');
    }

    async deleteLocal() {
        if (!this.currentId()) return;
        await this.imageStorage.delete(this.currentId() as string);
        this.log(`Local image deleted for ID: ${this.currentId()}`);
    }

    async softDelete() {
        if (!this.currentId()) return;
        await this.imageSync.softDelete(this.currentId() as string);
        this.log(`Soft deleted image metadata in Firestore for ID: ${this.currentId()}`);
    }

    async showMetadata() {
        if (!this.currentId()) return;
        const meta = await this.imageSync.getMetadata(this.currentId() as string);
        this.log(`Metadata for ${this.currentId()}: ${JSON.stringify(meta)}`);
    }

    log(message: string) {
        const time = new Date().toISOString();
        this.logs.update(v => `${time}: ${message}\n` + v);
    }
}