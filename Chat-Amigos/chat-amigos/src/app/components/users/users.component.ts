import { Component, input, OnInit, output, signal } from '@angular/core';
import { User } from 'src/app/interface/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GrupoComponent } from 'src/app/components/new/grupo/grupo.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, GrupoComponent]
})
export class UsersComponent  implements OnInit {
 users = input<User[] | null>([]);
 close = output<boolean>();
 user = output<User>();
 isNewChat = signal<boolean>(false)
 groupName = '';
 groupMembers = '';

 userRol = input<number | null>(0);
  constructor() {
   }
  //eslint-disable-next-line
  ngOnInit() {}

  closeModal(){
    this.close.emit(true)
  }
  startChat(user:User){
    this.user.emit(user)
  }
  newshow(value:boolean){
     this.isNewChat.set(value)
      }

}
