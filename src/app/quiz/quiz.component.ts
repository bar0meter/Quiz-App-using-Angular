import { Component, OnInit } from "@angular/core";
import { LoadQuizService } from "../load-quiz.service";
import { FormGroup, FormBuilder } from "@angular/forms";

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
  constructor(private ser: LoadQuizService, private fb: FormBuilder) {}

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
    for (let a of array) {
      a = this.formatText(a);
    }
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
    this.formatArray(options);
    // console.log(options);
    this.currentQues = {
      id: index + 1,
      type: quiz.type,
      question: this.formatText(quiz.question),
      options: options,
      correctAns: correct_option,
      difficulty: quiz.difficulty
    };
    // console.log(this.currentQues);
  }

  getAns(e) {
    // this.selectedAns = e.target.value;
    let selectedOption = this.quizForm.get("answers").value;
    this.selectedAns = this.currentQues["options"][selectedOption];
  }

  submitAns() {
    console.log("Thank you for submitting");
    let tempAns = {
      index: this.currentQues["id"],
      submittedAns: this.selectedAns,
      correctAns: this.currentQues["correctAns"]
    };
    this.submittedAns.push(tempAns);
    console.log(this.submittedAns);
    this.quizForm.get("answers").reset();
    this.index++;
    if (this.index === 10) {
      console.log("Quiz Ended");
    }
    this.displayQuestion(this.index);
  }
}
