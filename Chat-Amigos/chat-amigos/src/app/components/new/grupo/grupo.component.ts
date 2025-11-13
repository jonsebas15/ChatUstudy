import { Component, output, input, OnInit, effect} from '@angular/core';
import { } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { User } from 'src/app/interface/user'

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class GrupoComponent   {

  close = output<boolean>();
  groupName = '';
  groupMembers = '';
  users = input<User[] | null>([]);
  selectedUsers: (User & { selected: boolean })[] = [];

  
  showUserList = false;



  localUsers: (User & { selected: boolean })[] = []; 
  constructor() {
    // 👇 Este effect se ejecuta cada vez que cambia el valor del input `users`
    effect(() => {
      const userList = this.users(); // obtener valor actual de la señal
      if (userList && userList.length > 0) {
        this.localUsers = userList.map(u => ({ ...u, selected: false }));
        console.log('Usuarios cargados en localUsers:', this.localUsers);
      }
    });
  }

  closeModal(){
    this.close.emit(true)
  }
  
  onCreateGroup() {
    if (!this.groupName.trim()) {
      console.log('El nombre del grupo es obligatorio');
      return;
    }
  } 


  toggleUserList() {
    this.showUserList = !this.showUserList;
  }

  updateSelectedUsers() {
    this.selectedUsers = this.localUsers.filter(u => u.selected);
    console.log('Usuarios seleccionados:', this.selectedUsers);
  }


}
