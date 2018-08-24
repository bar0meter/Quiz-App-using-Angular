import { TestBed, inject } from '@angular/core/testing';

import { EvaluateQuizService } from './evaluate-quiz.service';

describe('EvaluateQuizService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EvaluateQuizService]
    });
  });

  it('should be created', inject([EvaluateQuizService], (service: EvaluateQuizService) => {
    expect(service).toBeTruthy();
  }));
});
