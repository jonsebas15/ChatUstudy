import { Component, OnInit, output } from '@angular/core';
import { } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class GrupoComponent  implements OnInit {

  close = output<boolean>();
  groupName = '';
  groupMembers = '';

  showUserList = false;
  selectedUsers: any[] = [];


  users = [
    { id: 1, name: 'Johan', selected: false },
    { id: 2, name: 'María', selected: false },
    { id: 3, name: 'Carlos', selected: false },
  ];

  constructor() {}

  ngOnInit() {}

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
    this.selectedUsers = this.users.filter(u => u.selected);
    console.log('Usuarios seleccionados:', this.selectedUsers);
  }


}
