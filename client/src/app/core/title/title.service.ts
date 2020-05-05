import { Title } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { filter } from 'rxjs/operators';

import { environment as env } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  constructor(private title: Title) {}

  setTitle(snapshot: ActivatedRouteSnapshot) {
    let lastChild = snapshot;
    while (lastChild.children.length) {
      lastChild = lastChild.children[0];
    }
    const { title } = lastChild.data;
    this.title.setTitle(`${env.appShortName}-${title}`);
  }
}
