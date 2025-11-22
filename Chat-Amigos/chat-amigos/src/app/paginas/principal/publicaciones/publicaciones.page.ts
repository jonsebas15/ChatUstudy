import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonAvatar, IonImg, IonLabel, IonButton, IonIcon, IonModal, IonButtons, IonInput,IonCardContent, IonCard, IonTextarea, IonText } from '@ionic/angular/standalone';
import { UserPublicacion } from 'src/app/interface/user-publicacion';
import { PublicacionService } from 'src/app/services/publicacion/publicacion.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.page.html',
  styleUrls: ['./publicaciones.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonItem, IonAvatar, IonImg, IonLabel, IonButton, IonIcon, IonModal, IonButtons, IonInput, IonCardContent, IonCard, IonTextarea, IonText]
})
export class PublicacionesPage{
  publicacionService = inject(PublicacionService);
  publicaciones = computed<UserPublicacion[] | null>(() => this.publicacionService.usersPublicaciones());
  auth = inject(AuthService);
  currentUserPhoto = computed(() => this.auth.imageUrl());
  newPublication = signal<string>('');


  constructor() { }


  ngOnInit() {
    this.publicacionService.getUsersPublicaciones();
    this.auth.getRole();
  }

  async postNewPublication(){
    //nuevo contenio
    if(!this.newPublication() || this.newPublication()?.trim() == ''){
      return;
    }

    try {
      await this.publicacionService.createPublicacion(this.newPublication()!, this.currentUserPhoto() || null);
      this.newPublication.set('');
    } catch (error) {
      console.error('Error creating publication:', error);
    }
  }
}
