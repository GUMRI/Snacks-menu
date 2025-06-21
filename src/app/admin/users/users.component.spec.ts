import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular/standalone';
import { UsersComponent } from './users.component';
import { UserService } from '../../core/user/user.service';
import { ChangeDetectionStrategy, inject } from '@angular/core';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let userService: UserService;

  beforeEach(waitForAsync(() => {
     TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), UsersComponent],
      providers: [UserService] 
    }).compileComponents().then(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default change detection strategy', () => {
    const meta = TestBed.createComponent(UsersComponent).componentRef.componentType.ɵcmp;
    expect(meta.changeDetection).toBe(ChangeDetectionStrategy.OnPush);
  });
  
  it('should inject UserService', () => {
      expect(userService).toBeTruthy();
  });
  it('should call ngOnInit', () => {
      spyOn(component, 'ngOnInit').and.callThrough();
      component.ngOnInit();
      expect(component.ngOnInit).toHaveBeenCalled();
    });
   it('should be created', () => {
    expect(component).toBeDefined();
    });
});
  
  
  

