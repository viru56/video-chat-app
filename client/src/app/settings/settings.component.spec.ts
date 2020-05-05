import { By } from '@angular/platform-browser';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MemoizedSelector } from '@ngrx/store';
import {
  FaIconLibrary,
  FontAwesomeModule
} from '@fortawesome/angular-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import { SharedModule } from '../shared/shared.module';

import { SettingsComponent } from './settings.component';
import {
  actionSettingsChangeAutoNightMode,
  actionSettingsChangeTheme,
} from '../core/settings/settings.actions';
import { selectSettings } from '../core/settings/settings.selectors';
import { SettingsState } from '../core/settings/settings.model';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  let store: MockStore;
  let dispatchSpy;
  let mockSelectSettings: MemoizedSelector<{}, SettingsState>;

  const getThemeSelectArrow = () =>
    fixture.debugElement.queryAll(By.css('.mat-select-trigger'))[1];
  const getSelectOptions = () =>
    fixture.debugElement.queryAll(By.css('mat-option'));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule,
        SharedModule,
        NoopAnimationsModule,
      ],
      providers: [provideMockStore()],
      declarations: [SettingsComponent]
    }).compileComponents();

    TestBed.inject(FaIconLibrary).addIcons(faBars);

    store = TestBed.inject(MockStore);
    mockSelectSettings = store.overrideSelector(
      selectSettings,
      {} as SettingsState
    );
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));


  it('should dispatch change theme action on theme selection', () => {
    dispatchSpy = spyOn(store, 'dispatch');
    getThemeSelectArrow().triggerEventHandler('click', {});

    fixture.detectChanges();

    getSelectOptions()[1].triggerEventHandler('click', {});

    fixture.detectChanges();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(
      actionSettingsChangeTheme({ theme: 'LIGHT-THEME' })
    );
  });

  it('should dispatch change auto night mode on night mode toggle', () => {
    dispatchSpy = spyOn(store, 'dispatch');
    const componentDebug = fixture.debugElement;
    const slider = componentDebug.queryAll(By.directive(MatSlideToggle))[1];

    slider.triggerEventHandler('change', { checked: false });
    fixture.detectChanges();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(
      actionSettingsChangeAutoNightMode({ autoNightMode: false })
    );
  });

});
