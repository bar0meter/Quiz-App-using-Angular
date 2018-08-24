import { TestBed, inject } from '@angular/core/testing';

import { LoadQuizService } from './load-quiz.service';

describe('LoadQuizService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadQuizService]
    });
  });

  it('should be created', inject([LoadQuizService], (service: LoadQuizService) => {
    expect(service).toBeTruthy();
  }));
});
