import { StatusDirective } from './status.directive';
import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ConversationListComponent } from '../../chat/components/conversation-list/conversation-list.component';

@Component({
  selector: 'app-test',
  template: `<div [appStatus]="status"></div>`
})
class TestHostComponent {
  status = true;
}

describe('StatusDirective', () => {
  let textHostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ StatusDirective, TestHostComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    textHostComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(textHostComponent).toBeTruthy();
  });


  it('should apply online status', () => {
    const spanCircle = fixture.debugElement.query(By.css('div span'));
    expect(spanCircle).toBeTruthy();
  });

  it('should not apply online status', () => {
    textHostComponent.status = false;

    const spanCircle = fixture.debugElement.query(By.css('div span'));
    fixture.detectChanges();

    expect(spanCircle).toBeFalsy();
  });
});
