import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { addIcons } from 'ionicons';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonAvatar, IonImg, IonLabel, IonButton, IonIcon, IonModal, IonButtons, IonInput } from '@ionic/angular/standalone';
import { addCircle, arrowBack, chatbubblesOutline, cloudyNight, personAddOutline} from 'ionicons/icons';
import { UsersComponent } from 'src/app/components/users/users.component';
import { ChatRoomService } from 'src/app/services/chat-room/chat-room.service';
import { User } from 'src/app/interface/user';
import { NavigationExtras, Router } from '@angular/router';
import { ChatRoom } from 'src/app/interface/chat-room';
import { EmptyScreenComponent } from 'src/app/components/empty-screen/empty-screen.component';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
  standalone: true,
  imports: [IonButtons, IonModal, IonIcon, IonButton, IonLabel, IonImg, IonAvatar, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, UsersComponent, EmptyScreenComponent, IonInput]
})
export class ChatsPage implements OnInit {

  isNewChat = signal<boolean>(false)

  private router = inject(Router)
  private chatroom = inject(ChatRoomService)
  users = computed<User[] | null>(()=>this.chatroom.users())
  chatrooms = computed<ChatRoom[] | null>(()=> this.chatroom.chatrooms())
  private auth = inject(AuthService)
  currentUserId = computed(()=> this.auth.uid())
  currentUserRol = this.auth.rol;

  model = {
    icon:'chatbubbles-outline',
    title:'que solo estás (u_u) consigue amigos',
    color:'primary',
  }

  constructor() { 
    addIcons({addCircle,arrowBack,chatbubblesOutline, personAddOutline});
    this.auth.getRole();
    
  }
  //eslint-disable-next-line
  ngOnInit() {
  }

  setIsNewChat(value:boolean){
    //call users data
    if(this.users() || this.users()?.length! == 0){
      this.chatroom.getUsers();
      
    }
    this.isNewChat.set(value)
  }
  async startChat(data:any, modal: IonModal){
    try {
      if(data.members.length === 1){
        
        const room = await this.chatroom.createChatRoom(data.members, data.name); 
        //dismiss modal
        modal.dismiss();
        
        //navigate to chat
        this.navigateToChat(data?.name , room?.id);
        const navData: NavigationExtras ={
          queryParams: {
            name:data?.name
        }
      }
      this.router.navigate(['/', 'principal','chats', room?.id], navData)
    } else {
        const room =  await this.chatroom.createChatRoom(data.members, data.name, 'group');
        //dismiss modal
        modal.dismiss();
        //navigate to chat
        this.navigateToChat(data?.name , room?.id);
        const navData: NavigationExtras ={
          queryParams: {
            name:data?.name
    }
  }
    this.router.navigate(['/', 'principal','chats', room?.id], navData)
      }
    } catch (error) {
      console.log(error);
    }
  }

  getChat(chatroom:ChatRoom){
    this.navigateToChat(chatroom?.name!, chatroom?.roomId)
  }

  navigateToChat(name: string | null, id:string){
    const navData: NavigationExtras ={
      queryParams: {
        name
      }
    }
    this.router.navigate(['/', 'principal','chats', id], navData)
  }

  /* ngOnDestroy(){
    this.chatroom.unsubscribeUsersAndChatrooms();
  } */
  llamando(llamar:any){
    console.log(llamar)
  }
}