import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //testa se o botao contem o texto Do Something
  it('should render content text', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLButtonElement;
    expect(compiled.querySelector('.btn-alert')?.textContent).toContain(
      'Do Something'
    );
  });

  //testa se as funcoes corretas sao chamadas quando o botao é clicado
  it('should click Send button with fakeAsync', fakeAsync(() => {
    window.alert = jest.fn();
    let buttonElement = fixture.debugElement.query(By.css('.btn-alert'));
    jest.spyOn(window, 'alert');
    jest.spyOn(component, 'alertOnScreen');
    //Trigger click event after spyOn
    buttonElement.triggerEventHandler('click', null);

    tick();
    expect(component.alertOnScreen).toHaveBeenCalledTimes(1);
    expect(window.alert).toHaveBeenCalledTimes(1);
  }));
});
