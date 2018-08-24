import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class LoadQuizService {
  private _url = "https://opentdb.com/api.php?amount=10&category=18";
  constructor(private _http: HttpClient) {}

  loadQuiz() {
    return this._http.get(this._url);
  }
}
