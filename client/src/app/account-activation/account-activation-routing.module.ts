import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountActivationComponent } from './account-activation.component';

const routes: Routes = [
  {
    path: '',
    component: AccountActivationComponent,
    data: { title: 'account activation' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountActivationRoutingModule {}
