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
 userRol = input<number | null>(0);
 close = output<boolean>();
 user = output<any>();
 isNewChat = signal<boolean>(false)
 groupName = '';
 groupMembers = '';

  constructor() {
   }
  //eslint-disable-next-line
  ngOnInit() {}

  closeModal(){
    this.close.emit(true)
  }
  startChat(user:any){
    const data = {members: [user.uid], name: user.name};
    this.user.emit(data);
  }
  newshow(value:boolean){
     this.isNewChat.set(value)
      }
  addUser(data:any){
    this.groupName = data.name;
    this.groupMembers = data.members;
    this.user.emit(data)
    this.closeModal();

  }

}
