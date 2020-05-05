import { NgModule } from '@angular/core';

import { AccountActivationRoutingModule } from './account-activation-routing.module';
import { AccountActivationComponent } from './account-activation.component';
import { SharedModule } from 'app/shared';

@NgModule({
  declarations: [AccountActivationComponent],
  imports: [SharedModule, AccountActivationRoutingModule]
})
export class AccountActivationModule {}
