import { TestBed } from '@angular/core/testing';

import { SocialnetworksService } from './socialnetworks.service';

describe('SocialnetworksService', () => {
  let service: SocialnetworksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocialnetworksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
