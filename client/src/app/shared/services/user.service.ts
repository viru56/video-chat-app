import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { Iuser } from '../models/user.model';
import { environment as env } from 'environments/environment';
import { authLogin } from '../../core/core.module';
import { Store } from '@ngrx/store';
import { authUser, authLogout } from 'app/core/auth/auth.actions';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private apiService: ApiService,
    private router: Router,
    private store: Store
  ) {}
  login(body: { email: string; password: string }): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiService
        .post(`${env.base_url}user/login`, body)
        .toPromise()
        .then(data => {
          this.store.dispatch(
            authLogin({
              isAuthenticated: true,
              token: data.token,
              user: data.user
            })
          );
          resolve(true);
          this.router.navigateByUrl('/chat');
        })
        .catch(reject);
    });
  }
  register(body: Iuser): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiService
        .post(`${env.base_url}user/register`, body)
        .toPromise()
        .then(resolve)
        .catch(reject);
    });
  }
  accountActivation(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiService
        .put(`${env.base_url}user/accountactivation`, {})
        .toPromise()
        .then(resolve)
        .catch(reject);
    });
  }
  sentforgotPasswordMail(body: { email: string }): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiService
        .post(`${env.base_url}user/sendforgotpasswordmail`, body)
        .toPromise()
        .then(resolve)
        .catch(reject);
    });
  }
  resetPassword(body: { password: string }): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiService
        .put(`${env.base_url}user/forgotpassword`, body)
        .toPromise()
        .then(resolve)
        .catch(reject);
    });
  }
  getUser(): Promise<Iuser> {
    return new Promise((resolve, reject) => {
      this.apiService
        .get(`${env.base_url}user`)
        .toPromise()
        .then(user => {
          this.store.dispatch(authUser(user));
          resolve(user);
        })
        .catch(err => {
          reject(err);
          this.store.dispatch(authLogout());
        });
    });
  }
}
