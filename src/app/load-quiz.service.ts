import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class LoadQuizService {
  private quesCount: number;
  private _url: string;
  private quiz = [];
  constructor(private _http: HttpClient) {}

  loadQuiz() {
    return this._http.get(this._url);
  }

  setQuiz(topic: string, quesCount: string, difficulty: string) {
    if (topic === "") topic = "18";

    if (quesCount === "") {
      quesCount = "10";
      this.quesCount = 10;
    } else {
      this.quesCount = parseInt(quesCount);
    }

    if (difficulty === "")
      this._url = `https://opentdb.com/api.php?amount=${quesCount}&category=${topic}`;
    else
      this._url = `https://opentdb.com/api.php?amount=${quesCount}&category=${topic}&difficulty=${difficulty}`;
    console.log(this._url);
  }

  getQuesCount() {
    return this.quesCount;
  }

  formatQuiz(quiz) {
    for (let ques of quiz) {
      let index = quiz.indexOf(ques);
      let correct_option = ques.correct_answer;
      let incorrect_options = ques.incorrect_answers;
      let options = [...incorrect_options, correct_option];
      this.shuffleArray(options);
      var currentQues = {
        id: index + 1,
        type: ques.type === "boolean" ? "True/False" : ques.type,
        question: this.formatText(ques.question),
        options: this.formatArray(options),
        correctAns: this.formatText(correct_option),
        difficulty: ques.difficulty
      };
      this.quiz[index] = currentQues;
    }
    return this.quiz;
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
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
}
