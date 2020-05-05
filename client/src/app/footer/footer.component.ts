import { Component, OnInit } from '@angular/core';
import { environment as env } from '../../environments/environment';
@Component({
  selector: 'vca-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  isProd = env.production;
  appName = env.appName;
  envName = env.envName;
  version = env.version;
  year = new Date().getFullYear();
  constructor() {}

  ngOnInit(): void {}
}
