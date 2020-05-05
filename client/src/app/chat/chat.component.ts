import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import { SocketService } from '../shared';
import { Subscription } from 'rxjs';
@Component({
  selector: 'vca-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent implements OnInit, OnDestroy {
  socketSubscriber: Subscription;
  constructor(private socket: SocketService) {}

  ngOnInit(): void {
    this.socket.emit('test', { name: 'virender' });
    this.socketSubscriber = this.socket.listen('test').subscribe(data => {
      console.log(data);
    });
  }
  ngOnDestroy(): void {
    this.socketSubscriber.unsubscribe();
  }
}
