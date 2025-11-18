import { computed, inject, Injectable, signal } from '@angular/core';
import { ApiService } from '../api/api.service';
import { DatabaseReference, off, onValue, query } from '@firebase/database';
import { AuthService } from '../auth/auth.service';
import { User } from 'src/app/interface/user';
import { UserPublicacion } from 'src/app/interface/user-publicacion';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  usersPublicaciones = signal<UserPublicacion[] | null>([])

  private usersPublicacionesRef:DatabaseReference | null = null

  private api= inject(ApiService)
  private auth = inject(AuthService)
  currentUserName = computed(()=> this.auth.name())
  currentUserPhoto = computed(()=> this.auth.imageUrl())


  constructor() {
    this.auth.getRole();
    this.getUsersPublicaciones();
   }

  async createPublicacion(contenido:string, imagenUrl:string | null){
    try {
      const publicacionesRef = this.api.getRef('publicaciones');

      const newPublicacion = this.api.pushData(publicacionesRef);
      const publicacionId = newPublicacion.key;

      const publicacionData: UserPublicacion = {
        id: publicacionId!,
        nombre: this.currentUserName()!,
        contenido,
        imagenUrl: this.currentUserPhoto() || null,
        likes: 0,
        comments: 0,
        comentarios: [],
        fecha: new Date().toISOString(),
      }
      await this.api.setRefData(newPublicacion, publicacionData);
    } catch (error) {
      throw error;
    }
  }
  getUsersPublicaciones(){
    this.usersPublicacionesRef = this.api.getRef('publicaciones');
    //lista de los usuarios
    const listerPublic = onValue(this.usersPublicacionesRef,(snapshot)=>{
      if(snapshot?.exists()){
        const publicaciones = snapshot.val();
        const publicacionesKeys = Object.keys(publicaciones);

        const publicacionesData = publicacionesKeys.map((key)=>{
          const publi = publicaciones[key];
          return publi as UserPublicacion;
        });
        
        Promise.all(publicacionesData).then((result)=>{
          const validPublicaciones = result.filter((publi)=> publi !== undefined);
          this.usersPublicaciones.set([...validPublicaciones].reverse() as UserPublicacion[]);
        });
      }else {
        this.usersPublicaciones.set([]);
      }
    })
  }
}
