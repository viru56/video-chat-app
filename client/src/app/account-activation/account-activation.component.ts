import { Component, OnInit, NgZone } from '@angular/core';
import { UserService } from 'app/shared';
import { Router } from '@angular/router';

@Component({
  selector: 'vca-account-activation',
  templateUrl: './account-activation.component.html',
  styleUrls: ['./account-activation.component.scss']
})
export class AccountActivationComponent implements OnInit {
  submitting: boolean;
  message: string;
  error: string;
  time: number;
  timeInterval: any;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.message = 'Please wait...';
    this.activateAccount();
  }
  async activateAccount() {
    try {
      this.submitting = true;
      const data = await this.userService.accountActivation();
      this.message = data.message;
      this.time = 6;
      this.setTime();
      this.submitting = false;
    } catch (error) {
      console.log(error);
      this.message = '';
      this.error = error.error.message;
    }
  }
  setTime(): void {
    this.timeInterval = setInterval(() => {
      if (this.time <= 0) {
        window.clearInterval(this.timeInterval);
        this.router.navigateByUrl('/login');
      } else {
        this.time--;
      }
    }, 1000);
  }
}
