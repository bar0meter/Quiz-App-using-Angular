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
  quizForm: FormGroup;
  quiz;
  quizTitle: string = "Computer Quiz";
  index: number = 0;
  currentQues: Object = {};
  loadQuestion: boolean = false;
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
      console.log(this.quiz);
      this.loadQuestion = true;
      this.displayQuestion(this.index);
    });
  }

  formatText(text: string) {
    let element = document.createElement("textarea");
    element.innerHTML = text;
    let decode = element.value;
    return decode;
  }

  formatArray(array) {
    let temp = [];
    for (var i = 0; i < array.length; i++) {
      temp[i] = this.formatText(array[i]);
    }
    return temp;
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  displayQuestion(index: number) {
    let quiz = this.quiz[index];
    let correct_option = quiz.correct_answer;
    let incorrect_options = quiz.incorrect_answers;
    let options = [...incorrect_options, correct_option];
    this.shuffleArray(options);
    this.currentQues = {
      id: index + 1,
      type: quiz.type === "boolean" ? "True/False" : quiz.type,
      question: this.formatText(quiz.question),
      options: this.formatArray(options),
      correctAns: correct_option,
      difficulty: quiz.difficulty
    };
  }

  getAns(e) {
    let selectedOption = this.quizForm.get("answers").value;
    this.selectedAns = this.currentQues["options"][selectedOption];
  }

  submitAns() {
    let tempAns = {
      index: this.currentQues["id"],
      question: this.currentQues["question"],
      submittedAns: this.selectedAns,
      correctAns: this.currentQues["correctAns"]
    };
    this.submittedAns.push(tempAns);
    this.quizForm.get("answers").reset();
    this.index++;
    if (this.index === this.quiz.length) {
      console.log("Quiz Ended");
      console.log(this.submittedAns);
      this.evaluateQuiz.setSubmittedAns(this.submittedAns);
      this.router.navigateByUrl("/evaluate");
    } else {
      this.displayQuestion(this.index);
    }
  }
}
