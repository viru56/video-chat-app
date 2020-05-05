import { NgModule } from '@angular/core';

import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { ForgotPasswordComponent } from './forgot-password.component';
import { SharedModule } from 'app/shared/shared.module';


@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [
    SharedModule,
    ForgotPasswordRoutingModule
  ]
})
export class ForgotPasswordModule { }
