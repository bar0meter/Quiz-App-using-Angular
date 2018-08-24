import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class EvaluateQuizService {
  private quizSubmitted: boolean = false;
  private submittedAns: Object[] = [];
  private quizResult: Object = 0;
  constructor() {}

  setSubmittedAns(submittedAns: Object[]) {
    this.quizSubmitted = true;
    this.submittedAns = submittedAns;
    this.evaluateQuiz(submittedAns);
  }

  evaluateQuiz(submittedAns: Object[]) {
    let correct: number = 0,
      incorrect: number = 0;
    for (let q of submittedAns) {
      if (q["submittedAns"] === q["correctAns"]) correct++;
      else incorrect++;
    }
    this.quizResult = {
      correct: correct,
      incorrect: incorrect
    };
  }

  getResult() {
    if (this.quizSubmitted) return this.quizResult;
  }

  isQuizSubmitted() {
    return this.quizSubmitted;
  }
}
