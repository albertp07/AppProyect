import { TestBed } from '@angular/core/testing';

import { QrScannerServiceService } from './qr-scanner-service.service';

describe('QrScannerServiceService', () => {
  let service: QrScannerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QrScannerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
