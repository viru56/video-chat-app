import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuardService, NoAuthGuardService } from './core/core.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
    data: { title: 'Home' },
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./settings/settings.module').then(m => m.SettingsModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    canActivate: [NoAuthGuardService]
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.module').then(m => m.RegisterModule),
    canActivate: [NoAuthGuardService]
  },
  {
    path: 'forgotPassword',
    loadChildren: () =>
      import('./forgot-password/forgot-password.module').then(
        m => m.ForgotPasswordModule
      ),
    canActivate: [NoAuthGuardService]
  },
  {
    path: 'accountActivation',
    loadChildren: () =>
      import('./account-activation/account-activation.module').then(
        m => m.AccountActivationModule
      ),
    canActivate: [NoAuthGuardService]
  },
  {
    path: 'resetPassword',
    loadChildren: () =>
      import('./reset-password/reset-password.module').then(
        m => m.ResetPasswordModule
      ),
    canActivate: [NoAuthGuardService]
  },
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    canActivate: [NoAuthGuardService]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  // useHash remove in production
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: 'enabled',
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
