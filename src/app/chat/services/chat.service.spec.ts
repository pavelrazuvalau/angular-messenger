import { TestBed } from '@angular/core/testing';

import { ChatService } from './chat.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ChatService', () => {
  let service: ChatService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should search users', () => {
    const mockResponse = { users: [ { a: 1 }, { b: 2 } ] };

    service.searchUsers('pavel').subscribe((res) => {
      expect(res).toEqual(mockResponse.users as any);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: 'user/search',
    });

    req.flush(mockResponse);

    httpController.verify();
  })
});
