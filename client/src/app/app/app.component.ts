import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  selectEffectiveTheme,
  selectIsAuthenticated
} from '../core/core.module';

@Component({
  selector: 'vca-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;
  theme$: Observable<string>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
    this.theme$ = this.store.pipe(select(selectEffectiveTheme));
  }
}
