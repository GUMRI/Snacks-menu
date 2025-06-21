import { Component, HostListener, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { addIcons } from 'ionicons';
import * as icons from 'ionicons/icons';
import {  doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { ImageReplicationService } from './common/services/image-sync.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'myapp';
  firebase = inject(Firestore);
  // imgSync = inject(ImageReplicationService)
  constructor () {
    addIcons({ ...icons });
    // this.imgSync.startSync()
  }
  @HostListener('document:visibilitychange', ['$event'])
   visibilitychange() {
  const  uid = localStorage.getItem('uid')
    if (uid) {

      if (document.hidden){
        
       updateDoc(doc(this.firebase, 'users', uid), {
        isConnect: false
      });
      } else if (uid && !document.hidden){
        updateDoc(doc(this.firebase, 'users', uid), {
          isConnect: true
        });
     } else {
       
      }
    }
   }



}
