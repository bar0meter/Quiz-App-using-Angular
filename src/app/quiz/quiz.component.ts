import { Component, OnInit } from "@angular/core";
import { LoadQuizService } from "../load-quiz.service";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { EvaluateQuizService } from "../evaluate-quiz.service";

@Component({
  selector: "app-quiz",
  templateUrl: "./quiz.component.html",
  styleUrls: ["./quiz.component.css"]
})
export class QuizComponent implements OnInit {
  prevDisabled: boolean = false;
  nextDisabled: boolean = false;
  quesCount: number;
  quizForm: FormGroup;
  quiz;
  quizTitle: string = "Computer Quiz";
  index: number = 0;
  currentQues: Object = {};
  loadQuestion: boolean = false;
  selectedIndex: number;
  selectedAns: string = "";
  submittedAns: Object[] = [];
  constructor(
    private ser: LoadQuizService,
    private fb: FormBuilder,
    private router: Router,
    private evaluateQuiz: EvaluateQuizService
  ) {}

  ngOnInit() {
    this.quizForm = this.fb.group({
      answers: []
    });
    this.ser.loadQuiz().subscribe(data => {
      data => data.json();
      this.quiz = data["results"];
      this.quesCount = this.quiz.length;
      console.log(this.quiz);
      this.quiz = this.ser.formatQuiz(this.quiz);
      console.log(this.quiz);
      this.loadQuestion = true;
      this.displayQuestion(this.index);
    });
  }

  displayQuestion(index: number) {
    this.selectedIndex = -1;
    this.prevDisabled = index === 0 ? true : false;
    this.nextDisabled = index === this.quesCount - 1 ? true : false;
    this.currentQues = this.quiz[index];

    if (this.submittedAns[index]) {
      this.selectedIndex = this.currentQues["options"].indexOf(
        this.submittedAns[index]["submittedAns"]
      );
    }
  }

  getAns(e) {
    let index = this.currentQues["id"];
    let selectedOption = this.quizForm.get("answers").value;
    let selectedAns = this.currentQues["options"][selectedOption];
    let tempAns = {
      index: index,
      question: this.currentQues["question"],
      submittedAns: selectedAns,
      correctAns: this.currentQues["correctAns"]
    };
    this.submittedAns[index - 1] = tempAns;
    this.selectedIndex = selectedOption;
  }

  submitQuiz() {
    console.log("Quiz Ended");
    console.log(this.submittedAns);
    this.evaluateQuiz.setSubmittedAns(this.submittedAns);
    this.router.navigateByUrl("/evaluate");
  }

  navigate(index) {
    this.displayQuestion(index - 1);
  }
}
