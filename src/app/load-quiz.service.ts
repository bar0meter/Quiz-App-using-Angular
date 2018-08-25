import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class LoadQuizService {
  private _url: string;
  constructor(private _http: HttpClient) {}

  loadQuiz() {
    return this._http.get(this._url);
  }

  setQuiz(topic: string, quesCount: string, difficulty: string) {
    if (topic === "") topic = "18";
    if (quesCount === "") quesCount = "10";
    if (difficulty === "")
      this._url = `https://opentdb.com/api.php?amount=${quesCount}&category=${topic}`;
    else
      this._url = `https://opentdb.com/api.php?amount=${quesCount}&category=${topic}&difficulty=${difficulty}`;
    console.log(this._url);
  }
}
