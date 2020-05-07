import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketService, UserService } from '../shared';
import { Subscription } from 'rxjs';
import { Iuser } from 'app/shared/models/user.model';

@Component({
  selector: 'vca-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  usersSubscriber: Subscription;
  userJoinSubscriber: Subscription;
  userLeftSubscriber: Subscription;
  currentUser: Iuser;
  users: Iuser[];
  time = new Date();
  constructor(
    private socket: SocketService,
    private userService: UserService
  ) {}

  async ngOnInit() {
    this.users = [];
    this.socket.init();
    this.currentUser = await this.userService.getUser();
    this.socket.emit('join', this.currentUser.id);
    this.getAllUsers();
    this.userJoin();
    this.userLeft();
  }
  getAllUsers() {
    this.socket.emit('allUsers', this.currentUser.id);
    this.usersSubscriber = this.socket.listen('allUsers').subscribe(users => {
      this.users = users;
      console.log(this.users);
    });
  }
  userJoin() {
    this.userJoinSubscriber = this.socket.listen('join').subscribe(user => {
      const index = this.users.findIndex(u => u.id === user.id);
      if (index > -1) this.users[index] = user;
    });
  }
  userLeft() {
    this.userLeftSubscriber = this.socket.listen('left').subscribe(socketId => {
      const index = this.users.findIndex(u => u.socketId === socketId);
      if (index > -1) {
        this.users[index].isLoggedIn = false;
        this.users[index].loginStatus = 'offline';
      }
    });
  }
  ngOnDestroy(): void {
    this.usersSubscriber.unsubscribe();
    this.userJoinSubscriber.unsubscribe();
    this.userLeftSubscriber.unsubscribe();
  }
}
