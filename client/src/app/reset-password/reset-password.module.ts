import { NgModule } from '@angular/core';

import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { ResetPasswordComponent } from './reset-password.component';
import { SharedModule } from 'app/shared';

@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [SharedModule, ResetPasswordRoutingModule]
})
export class ResetPasswordModule {}
