import { Component, OnInit } from "@angular/core";
import { EvaluateQuizService } from "../evaluate-quiz.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-evaluate",
  templateUrl: "./evaluate.component.html",
  styleUrls: ["./evaluate.component.css"]
})
export class EvaluateComponent implements OnInit {
  quizResult: Object;
  quizSubmitted: boolean = false;
  totalQues: number;
  submittedAns: Object[];
  constructor(private ser: EvaluateQuizService, private router: Router) {}

  ngOnInit() {
    if (this.ser.isQuizSubmitted()) {
      this.quizSubmitted = this.ser.isQuizSubmitted();
      this.quizResult = this.ser.getResult();
      this.submittedAns = this.ser.getSubmittedAns();
      this.totalQues =
        this.quizResult["correct"] + this.quizResult["incorrect"];
    } else {
      this.router.navigateByUrl("/quiz");
    }
  }
}
